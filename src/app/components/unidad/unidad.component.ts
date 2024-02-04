import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { UnidadService } from '../../services/unidad.service';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    HttpClientModule,
    ButtonModule
  ],
  providers: [
    UnidadService
  ],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css'
})
export class UnidadComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private unidadService: UnidadService,
  ) {
    this.form = this.fb.group({
      text: ['', Validators.required],
      coduni: [null], // Añade un campo oculto para almacenar el coduni
    });
  }

  ngOnInit(): void {
    // Puedes realizar lógica de inicialización aquí si es necesario
  }

  guardar(): void {
    if (this.form.valid) {
      const coduni = this.form.value.coduni;
      const descripcion = this.form.value.text;

      if (coduni) {
        // Si hay un coduni, significa que estamos actualizando
        this.unidadService.actualizarUnidad({
          coduni: coduni, desuni: descripcion,
          contenido: 0
        }).subscribe(
          (result) => {
            console.log('Unidad actualizada con éxito:', result);
            // Puedes realizar más acciones después de actualizar si es necesario
          },
          (error) => {
            console.error('Error al actualizar la unidad:', error);
          }
        );
      } else {
        // Si no hay un coduni, significa que estamos creando una nueva unidad
        this.unidadService.crearUnidad({ desuni: descripcion }).subscribe(
          (result) => {
            console.log('Unidad creada con éxito:', result);
            // Puedes realizar más acciones después de guardar si es necesario
          },
          (error) => {
            console.error('Error al crear la unidad:', error);
          }
        );
      }
    }
  }
  cancelar() {
    if (this.form.valid) {
      const coduni = this.form.value.coduni;

      if (coduni) {
        this.unidadService.desactivarUnidad(coduni).subscribe(
          (result) => {
            console.log('Unidad Cancelada o Actualizada con éxito:', result);
            // Puedes realizar más acciones después de cancelar si es necesario
          },
          (error) => {
            console.error('Error al Cancelar la unidad:', error);
          }
        );
      } else {
        console.log('El codigo es null', coduni);
      }
    } else {
      console.log('El formulario no es válido');
    }
  }

  buscar(){
    console.log('buscando');
  }

}
