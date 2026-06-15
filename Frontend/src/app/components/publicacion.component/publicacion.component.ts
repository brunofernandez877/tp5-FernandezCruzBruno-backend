import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpPubService } from '../../services/emp-pub.service';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  empleados: Array<any> = [];
  publicaciones: Array<any> = [];
  
  pubActual: any = { vigente: true };
  accion: number = 0; // 0=Alta, 1=Modificación
  
  // Variables de Búsqueda
  filtroTitulo: string = '';
  filtroVigente: boolean = true;

  constructor(private apiService: EmpPubService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarPublicaciones();
  }

  cargarEmpleados(): void {
    this.apiService.getEmpleados().subscribe({
      next: (res: any) => { this.empleados = res; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });
  }

  cargarPublicaciones(): void {
    this.apiService.getPublicaciones().subscribe({
      next: (res: any) => { this.publicaciones = res; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });
  }

  // Lector de Base64 para la imagen
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pubActual.imagenAsociada = e.target.result; // Se guarda en Base64
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  guardarPublicacion(formPub: any): void {
    if (formPub.invalid) { alert('Complete los campos'); return; }

    if (this.accion === 0) {
      this.apiService.createPublicacion(this.pubActual).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            alert('Publicación creada');
            this.cargarPublicaciones();
            this.limpiar(formPub);
          }
        }
      });
    } else {
      this.apiService.editPublicacion(this.pubActual).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            alert('Publicación modificada');
            this.cargarPublicaciones();
            this.limpiar(formPub);
          }
        }
      });
    }
  }

  buscarCombinado(): void {
    this.apiService.buscarPublicaciones(this.filtroTitulo, this.filtroVigente).subscribe({
      next: (res: any) => {
        this.publicaciones = res;
        this.cdr.markForCheck();
      }
    });
  }

  seleccionar(pub: any): void {
    this.accion = 1;
    // Buscamos el objeto Empleado original para setearlo en el select
    const empleadoObj = this.empleados.find(e => e.id === pub.Empleado?.id);
    this.pubActual = { ...pub, empleado: empleadoObj };
    this.cdr.markForCheck();
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar publicación?')) {
      this.apiService.deletePublicacion(id).subscribe({
        next: (res: any) => { this.cargarPublicaciones(); }
      });
    }
  }

  limpiar(formPub?: any): void {
    this.accion = 0;
    this.pubActual = { vigente: true };
    if (formPub) formPub.resetForm(this.pubActual);
    this.cargarPublicaciones();
    this.cdr.markForCheck();
  }
}