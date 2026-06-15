import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SocioService } from '../../services/socio.service';

@Component({
  selector: 'app-socio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']
})
export class SocioComponent implements OnInit {
  socios: Array<any> = [];
  socioActual: any = { activo: true };
  
  accion: number = 0; 
  verSoloActivos: boolean = false;

  // 2. Inyectamos 'cdr' en el constructor tal cual tu ejemplo de F1
  constructor(
    private socioService: SocioService, 
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.listarSocios();
  }

  listarSocios(): void {
    if (this.verSoloActivos) {
      this.socioService.getSociosActivos().subscribe({
        next: (res: any) => {
          this.socios = res;
          this.cdr.markForCheck(); // 3. Forzamos a Angular a actualizar la tabla
        },
        error: (err) => {
          console.error('Error al conectar con la API:', err.message);
        }
      });
    } else {
      this.socioService.getSocios().subscribe({
        next: (res: any) => {
          this.socios = res;
          this.cdr.markForCheck(); // 3. Forzamos a Angular a actualizar la tabla
        },
        error: (err) => {
          console.error('Error al conectar con la API:', err.message);
        }
      });
    }
  }

  toggleFiltroActivos(): void {
    this.verSoloActivos = !this.verSoloActivos;
    this.listarSocios();
  }

  guardarSocio(formSocio: any): void {
    if (formSocio.invalid) {
      alert('Complete los campos obligatorios.');
      return;
    }

    if (this.accion === 0) {
      this.socioService.createSocio(this.socioActual).subscribe({
        next: (res: any) => {
          if (res.status === 'Socio guardado') { 
            alert('Socio registrado con éxito');
            this.listarSocios();
            this.limpiarFormulario(formSocio);
          }
        },
        error: (err) => console.error(err)
      });
    } else if (this.accion === 1) {
      this.socioService.editSocio(this.socioActual).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            alert(res.msg); 
            this.listarSocios(); // Al llamar a listarSocios(), se ejecutará el cdr.markForCheck()
            this.limpiarFormulario(formSocio);
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  seleccionarSocio(socio: any): void {
    this.accion = 1; 
    this.socioActual = { ...socio }; 
    this.cdr.markForCheck(); // Opcional: asegura que el formulario muestre los datos inmediatamente
  }

  eliminarSocio(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Eliminar definitivamente este socio?')) {
      this.socioService.deleteSocio(id).subscribe({
        next: (res: any) => {
          if (res.status === '1') {
            alert(res.msg);
            this.listarSocios();
            this.limpiarFormulario();
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  limpiarFormulario(formSocio?: any): void {
    this.accion = 0; 
    this.socioActual = { activo: true };
    if (formSocio) {
      formSocio.resetForm(this.socioActual);
    }
    this.cdr.markForCheck();
  }
}