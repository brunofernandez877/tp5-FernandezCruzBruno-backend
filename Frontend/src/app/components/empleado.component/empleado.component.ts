import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpPubService } from '../../services/emp-pub.service';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados: Array<any> = [];
  empleadoActual: any = {};
  // Variables para la Búsqueda Individual
  idBusqueda: number | null = null;
  empleadoSeleccionado: any = null;
  cargandoModal: boolean = false;
  errorBusqueda: boolean = false; // Para saber si el ID no existe


  constructor(
    private apiService: EmpPubService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(): void {
    this.apiService.getEmpleados().subscribe({
      next: (res: any) => {
        this.empleados = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al obtener empleados:', err)
    });
  }

  guardarEmpleado(formEmpleado: any): void {
    if (formEmpleado.invalid) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    this.apiService.createEmpleado(this.empleadoActual).subscribe({
      next: (res: any) => {
        if (res.status === '1') {
          alert('Empleado registrado exitosamente');
          this.listarEmpleados();
          this.empleadoActual = {}; // Limpiamos el objeto
          formEmpleado.resetForm(); // Limpiamos el formulario visual
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Hubo un error al registrar el empleado.');
      }
    });
  }
  buscarEmpleadoPorId(): void {
    if (!this.idBusqueda) return; // Si está vacío no hace nada

    this.empleadoSeleccionado = null;
    this.errorBusqueda = false;
    this.cargandoModal = true;
    this.cdr.markForCheck();

    this.apiService.getEmpleadoporId(this.idBusqueda).subscribe({
      next: (res: any) => {
        this.empleadoSeleccionado = res;
        this.cargandoModal = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al obtener el empleado:', err);
        this.errorBusqueda = true; // Marcamos que hubo error (ej. 404 No encontrado)
        this.cargandoModal = false;
        this.cdr.markForCheck();
      }
    });
  }
}