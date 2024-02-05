import { CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUploadModule } from "primeng/fileupload";
import { ImageModule } from "primeng/image";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { KeyFilterModule } from "primeng/keyfilter";
import { PaginatorModule } from "primeng/paginator";
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { ItemUniPro } from "../../interfaces/ItemUniPro";
import { Iproduct } from "../../interfaces/Producto";
import { Unidad } from "../../interfaces/Unidad";
import { ConsultaUnidadComponent } from "../consulta-unidad/consulta-unidad.component";
import { DepartamentoComponent } from "../departamento/departamento.component";
import { DialogoComponent } from "../dialogo/dialogo.component";
import { GrupoComponent } from "../grupo/grupo.component";
import { SubgrupoComponent } from "../subgrupo/subgrupo.component";
import { TipoComponent } from "../tipo/tipo.component";
import { UnidadComponent } from "../unidad/unidad.component";


@Component({
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    TableModule,
    DividerModule,
    InputMaskModule,
    InputGroupModule,
    InputGroupAddonModule,
    ImageModule,
    FileUploadModule,
    FormsModule,
    TagModule,
    RatingModule,
    CurrencyPipe,
    KeyFilterModule,
    NgOptimizedImage,
    HttpClientModule

  ],
  providers: [
    MessageService,
    DialogService,
  ],
  selector: 'app-product',
  standalone: true,

  styleUrls: ['./product.component.css'],
  templateUrl: './product.component.html' // Corregido a 'styleUrls' y convertido en un array
})
export class ProductComponent implements OnInit {

  formProduct!: FormGroup;
  unids!: Unidad[];
  products!: Iproduct[];
  costo1!: number;
  costo2!: number;
  costo3!: number;
  itemunid: ItemUniPro[] = [];
  precio1: number = 0.00;
  precio2: number = 0.00;
  precio3: number = 0.00;
  desuni: string = '';
  imageUrl: string = 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg';
  coduni: number | undefined;
  contenido!: number;
  mostrarCostos: boolean = false;
  mostrarDetalleUnid: boolean = true;
  mostrarPrecios: boolean = true;
  estado:  boolean =  true;


  isCodInvalid: boolean = false;
  isDesInvalid: boolean = false;
  isPre1Invalid: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private miDialogService: DialogService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.formProduct = this.fb.group({
      codpro: ['', Validators.required],
      description: ['', Validators.required],
      tipo: [null, Validators.required],
      departamento: [null, Validators.required],
      grupo: [null, Validators.required],
      subGrupo: [null, Validators.required],
      unidved: [null, Validators.required],
      unidCompra: [null, Validators.required],
      costo1: [0, Validators.required],
      costo2: ['', Validators.required],
      costo3: ['', Validators.required],
      coduni: ['', Validators.required],
      desuni: ['', Validators.required],
      contenido: [1, Validators.required],
      precio1: [0.00, Validators.required],
      precio2: [0.00], // Puedes omitir Validators.required si es opcional
      precio3: [0.00], // Puedes omitir Validators.required si es opcional
      estado: [true, Validators.required],
      imgurl: [''], // Este control es para el manejo de la URL de la imagen
      conexit: [true],
    });

  }

  mostrarDialogoAviso(mensaje: string, header: string, incon: string , color: string ): void {
    this.dialog.open(DialogoComponent, {
      data: {
        message: mensaje,
        header: header,
        icon:  incon,
        color: color,
      },
    });
  }


validarEntradaUnid(): void{


  // Aquí se verifica si los campos han sido tocados y si son inválidos.
  this.isCodInvalid = !this.coduni;
  this.isDesInvalid = !this.desuni;
  this.isPre1Invalid = this.formProduct.get('precio1')?.value <= 0;

  if (this.isCodInvalid || this.isDesInvalid || this.isPre1Invalid) {
    this.mostrarDialogoAviso('Por favor, completa todos los campos requeridos correctamente.', 'Alerta', 'pi pi-info-circle', 'text-blue-500');
  } else {
    console.log("Formulario válido");
    this.agregarUndi();
  }
}
  ngOnInit() {


  }

  //agregar undidad para productos
  agregarUndi(): void {
    const cod = this.formProduct.get('coduni')?.value;
    const des = this.formProduct.get('desuni')?.value;

    // Buscar si ya existe el item con el mismo código de unidad
    const itemExistenteIndex = this.itemunid.findIndex(item => item.coduni === cod);

    if (itemExistenteIndex !== -1) {
      // Si ya existe, mostrar mensaje de alerta y no agregar el nuevo ítem
      this.messageService.add({
        severity: 'warn',
        summary: 'Unidad duplicada',
        detail: 'Ya existe un ítem con el código de unidad: ' + cod
      });
    } else {
      // Si no existe, crear un nuevo ítem y agregarlo al arreglo
      const nuevoItem: ItemUniPro = {
        coduni: cod,
        desuni: des,
        contenido: this.formProduct.get('contenido')?.value,
        precio1: this.formProduct.get('precio1')?.value,
        precio2: this.formProduct.get('precio2')?.value,
        precio3: this.formProduct.get('precio3')?.value,
        estado: this.formProduct.get('estado')?.value,
      };
      this.itemunid.push(nuevoItem);
      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Unidad agregada',
        detail: 'Se ha agregado la unidad con éxito'
      });
      // Limpiar el formulario después de la inserción
      this.limpiarUnid();
    }
  }

  limpiarUnid(): void  {
    this.formProduct.get('coduni')?.setValue('');
    this.formProduct.get('desuni')?.setValue('');
    this.formProduct.get('precio1')?.setValue(0);
    this.formProduct.get('precio2')?.setValue(0);
    this.formProduct.get('precio3')?.setValue(0);
    this.formProduct.get('contenido')?.setValue(0);

    this.desuni = '';
    this.coduni = 0;

  }
  cambiarEstado(item: ItemUniPro): void {
    console.log('Estado cambiado:', item.estado);
    // Aquí puedes realizar acciones adicionales, como enviar los cambios al servidor.
  }
  //formatear inputnumber
  vacioInputNumber(fieldName: string): void {
    let value = this.formProduct.get(fieldName)?.value;
    if (value === null || value === '' || value === undefined) {
      this.formProduct.patchValue({ [fieldName]: 0 }); // Establece 0 en lugar de '0.00'
    }
  }
//subir archivos
  onUpload(event: any): void {
    if (event.files && event.files[0]) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = reader.result as string;
        // Actualiza el valor del control 'imgurl' en el FormGroup si es necesario
        this.formProduct.patchValue({ imgurl: this.imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  // Mostrar mensaje de éxito
  showSuccessMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });

    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }
  showTipo() {
    this.ref = this.dialogService.open(TipoComponent, {
      header: 'Mantenimiento Tipo Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });

  }

  showDepartamento() {
    this.ref = this.dialogService.open(DepartamentoComponent, {
      header: 'Mantenimiento Departamento Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  showUiodad() {
    this.ref = this.dialogService.open(UnidadComponent, {
      header: 'Mantenimiento Unidad Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }


  showConsultaUnidad() {
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
        this.rellenarCamposFormulario(unidad);
      }
    });
  }

  rellenarCamposFormulario(unidad: Unidad) {
    this.coduni =  unidad.coduni;
    this.desuni = unidad.desuni;

    this.formProduct.patchValue({
      coduni: unidad.coduni,
      desuni: unidad.desuni,
      // ... otros campos si son necesarios ...
    });

    this.formProduct.get('coduni')?.disable();
    this.formProduct.get('desuni')?.disable();
    this.formProduct.get('coduni')?.updateValueAndValidity();
    this.formProduct.get('desuni')?.updateValueAndValidity();

    // Si necesitas emitir eventos después de deshabilitar, puedes hacerlo aquí
  }
  showGrupo() {
    this.ref = this.dialogService.open(GrupoComponent, {
      header: 'Mantenimiento Grupo Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }
  showSubGrupo() {
    this.ref = this.dialogService.open(SubgrupoComponent, {
      header: 'Mantenimiento Sub-Grupo Producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  // Validar el formulario antes de agregar un producto (opcional)
  validateFormBeforeAdding() {
    const { codpro, description } = this.formProduct.value;
    if (!codpro || !description) {
      this.showErrorMessage('Form fields are required');
      return false;
    }
    return true;
  }

  // Mostrar mensaje de error
  showErrorMessage(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });

    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }

  ocultarDetalle(): void{
    this.mostrarDetalleUnid = !this.mostrarDetalleUnid;
  }
  ocultarPrecios(): void {
    this.mostrarPrecios = !this.mostrarPrecios;
  }
  ocultarCostos(): void {
    this.mostrarCostos = !this.mostrarCostos;
  }
  soloNumeros(event: any): void {
    const texto = event.target.textContent;
    event.target.textContent = texto.replace(/\D/g, ''); // Elimina no numéricos
  }

  soloNumeros2(event: any) {
    const patron = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode != 8 && !patron.test(inputChar)) {
      // 8 es el código de tecla para retroceso (backspace)
      event.preventDefault();
    }
  }



}
