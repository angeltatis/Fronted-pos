import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from 'primeng/toast';
import { Unidad } from '../../interfaces/Unidad';
import { UnidadService } from '../../services/unidad.service';
import { ConsultaUnidadComponent } from '../consulta-unidad/consulta-unidad.component';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    HttpClientModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    UnidadService,
    MessageService

  ],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css'
})
export class UnidadComponent implements OnInit {
  form!: FormGroup;
  unidades!:  Unidad [];
  coduni?: number;
  ref: DynamicDialogRef | undefined;

  constructor(
    private fb: FormBuilder,
    private unidadService: UnidadService,
    private dialogService: DialogService,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      desuni: ['', Validators.required],
      // Añade un campo oculto para almacenar el coduni
    });
  }

  ngOnInit(): void {
    // Puedes realizar lógica de inicialización aquí si es necesario
  }

  limpiar(): void {
    this.form.get('desuni')?.setValue('');
    this.form.get('coduni')?.setValue(null);
  }
  guardar(): void {
    if (this.form.valid) {
      const descripcion = this.form.value.desuni;

      if (this.coduni) {
        // Si hay un coduni, significa que estamos actualizando
        this.unidadService.actualizarUnidad({
          coduni: this.coduni, desuni: descripcion,
        }).subscribe(
          (result) => {
            console.log('Unidad actualizada con éxito:' + this.coduni, result);
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
            // Actualiza el valor de coduni con el valor devuelto por la creación
            this.coduni = result.coduni;
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
    if (this.coduni) {
      this.unidadService.desactivarUnidad(this.coduni).subscribe(
        (result) => {
          console.log('Unidad Cancelada o Actualizada con éxito:', result);
          // Puedes realizar más acciones después de cancelar si es necesario
        },
        (error) => {
          console.error('Error al Cancelar la unidad:', error);
        }
      );
    } else {
      console.log('El codigo es null', this.coduni);
    }
  }

  llenarCampo(unidad: Unidad) {
    this.form.get('desuni')?.setValue(unidad.desuni);
    this.coduni = unidad.coduni;
  }
  buscar() {
    this.ref = this.dialogService.open(ConsultaUnidadComponent, {
      header: 'Consulta Unidad',
      width: '50%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,

    });
    // Suscríbete al cierre del diálogo para obtener los datos seleccionados
    this.ref.onClose.subscribe((unidad: Unidad) => {
      if (unidad) { // Verifica si hay datos
        this.llenarCampo(unidad);
      }
    });
  }
}
