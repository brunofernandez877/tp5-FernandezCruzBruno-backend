import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { F1Service } from '../../services/f1.service';

@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.css']
})
export class F1Component implements OnInit {

  // Variables del formulario e interfaz
  anioInput: number = 2020; // Puesto en 2020 según tu ejemplo
  races: Array<any> = [];
  
  // Variables para el modal de posiciones
  sessionActualName: string = '';
  pilotosPosiciones: Array<any> = [];
  cargandoModal: boolean = false;

  // Variables para la clasificación de constructores (Punto 3)
  primerConstructor: any = null;
  ultimoConstructor: any = null;
  mostrarConstructores: boolean = false;

  constructor(private f1Service: F1Service, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  // PUNTO 1: Consultar Carreras
  consultarCarreras() {
    if (!this.anioInput) return;

    this.f1Service.getRaces(this.anioInput).subscribe(
      (data: any) => {
        // Según tu estructura, las carreras vienen en 'results'
        if (data && data.results) {
          this.races = data.results;
        }
        this.cdr.markForCheck();
      },
      (error) => {
        console.error("Error al cargar carreras:", error);
        alert("Hubo un error al conectar con el servicio de carreras.");
      }
    );
  }

  // PUNTO 2: Ver posiciones de una Sesión en el Modal
  verPosiciones(sessionId: number, sessionName: string) {
    this.sessionActualName = sessionName;
    this.pilotosPosiciones = [];
    this.cargandoModal = true;
    this.cdr.markForCheck();

    this.f1Service.getSessionDetails(sessionId).subscribe(
      (data: any) => {
        // Según tu estructura, los pilotos vienen en results.drivers 
        if (data && data.results && data.results.drivers) {
          this.pilotosPosiciones = data.results.drivers;
        }
        this.cargandoModal = false;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error("Error al cargar la sesión:", error);
        this.cargandoModal = false;
        this.cdr.markForCheck();
      }
    );
  }

  // PUNTO 3: Clasificación de Constructores (Solo primero y último)
  consultarConstructores() {
    if (!this.anioInput) return;

    this.f1Service.getConstructorStandings(this.anioInput).subscribe(
      (data: any) => {
        // Según tu estructura, las posiciones vienen en 'results'
        if (data && data.results && data.results.length > 0) {
          // El primero está en el índice 0
          this.primerConstructor = data.results[0];
          // El último está en la longitud menos 1
          this.ultimoConstructor = data.results[data.results.length - 1];
          this.mostrarConstructores = true;
        } else {
          alert("No se encontraron clasificaciones para este año.");
          this.mostrarConstructores = false;
        }
        this.cdr.markForCheck();
      },
      (error) => {
        console.error("Error al cargar constructores:", error);
        alert("Error al obtener la clasificación de constructores.");
      }
    );
  }
}