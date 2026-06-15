import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-transaccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  transacciones: Array<any> = [];
  transaccionActual: any = {};
  
  // Variables para los filtros
  filtroEmail: string = '';
  filtroOrigen: string = '';
  filtroDestino: string = '';

  constructor(
    private transaccionService: TransaccionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listarTodas();
  }

  listarTodas(): void {
    this.transaccionService.getTransacciones().subscribe({
      next: (res: any) => {
        this.transacciones = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err.message)
    });
  }

  filtrarPorEmail(): void {
    if (!this.filtroEmail) {
      this.listarTodas();
      return;
    }
    this.transaccionService.getTransaccionesByEmail(this.filtroEmail).subscribe({
      next: (res: any) => {
        this.transacciones = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err.message)
    });
  }

  filtrarPorIdiomas(): void {
    if (!this.filtroOrigen || !this.filtroDestino) {
      alert('Debe ingresar ambos idiomas para buscar.');
      return;
    }
    this.transaccionService.getTransaccionesByIdiomas(this.filtroOrigen, this.filtroDestino).subscribe({
      next: (res: any) => {
        this.transacciones = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err.message)
    });
  }

  guardarTransaccion(formTransaccion: any): void {
    if (formTransaccion.invalid) {
      alert('Complete los campos obligatorios.');
      return;
    }

    this.transaccionService.createTransaccion(this.transaccionActual).subscribe({
      next: (res: any) => {
        if (res.status === '1') {
          alert('Log registrado con éxito');
          this.listarTodas();
          this.transaccionActual = {};
          formTransaccion.resetForm();
          this.cdr.markForCheck();
        }
      },
      error: (err) => console.error('Error al guardar:', err.message)
    });
  }

  limpiarFiltros(): void {
    this.filtroEmail = '';
    this.filtroOrigen = '';
    this.filtroDestino = '';
    this.listarTodas();
  }
}