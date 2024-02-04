import {Component, OnInit, Optional} from '@angular/core';
import { UnidadService } from "../../services/unidad.service";
import { TableModule } from "primeng/table";
import { Unidad } from "../../interfaces/Unidad";
import {AsyncPipe, NgClass, TitleCasePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {combineLatest, Observable, of} from "rxjs";
import {DynamicDialogRef} from "primeng/dynamicdialog";


@Component({
  selector: 'app-consulta-unidad',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TitleCasePipe,
    NgClass,

    // HttpClientModule se elimina de aquí
  ],
  providers: [UnidadService], // Asegúrate de agregar tu servicio aquí
  templateUrl: './consulta-unidad.component.html',
  styleUrls: ['./consulta-unidad.component.css'] // Corregido a 'styleUrls'
})
export class ConsultaUnidadComponent implements OnInit {

  searchForm!: FormGroup;
  todasLasUnidades: Unidad[] = []; // Almacena todas las unidades
  unidadesFiltradas: Unidad[] = []; // Almacena las unidades filtradas para mostrar en la tabla
  selectedUnidad?: Unidad; // La unidad seleccionada, puede ser undefined inicialmente
  public ref!: DynamicDialogRef
  constructor(private unidadService: UnidadService,
              private formBuilder: FormBuilder,
              @Optional() public ref1: DynamicDialogRef) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      unidadSearch: [''],
      soloActivos: [true]
    });

    this.unidadService.obtenerUnidades().subscribe(data => {
      this.todasLasUnidades = data;
      this.filtrarUnidades();
    });

    combineLatest([
      this.searchForm.get('unidadSearch')!.valueChanges.pipe(startWith('')),
      this.searchForm.get('soloActivos')!.valueChanges.pipe(startWith(true))
    ])
      .pipe(
        debounceTime(300),
        map(([searchTerm, soloActivos]) => this.aplicarFiltros(searchTerm, soloActivos))
      )
      .subscribe(unidades => this.unidadesFiltradas = unidades);
  }

  aplicarFiltros(searchTerm: string, soloActivos: boolean): Unidad[] {
    return this.todasLasUnidades.filter(unidad =>
      unidad.desuni.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!soloActivos || unidad.estado)
    );
  }

  filtrarUnidades(): void {
    const searchTerm = this.searchForm.value.unidadSearch.toLowerCase();
    const soloActivos = this.searchForm.value.soloActivos;
    this.unidadesFiltradas = this.aplicarFiltros(searchTerm, soloActivos);
  }

  onRowSelect(event: any): void {
    this.selectedUnidad = event.data;
    if (this.ref1) {
      this.ref1.close(this.selectedUnidad);
    }

  }
}
