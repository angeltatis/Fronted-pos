import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent implements  OnInit{
  formGroup!: FormGroup;


  ngOnInit() {
    this.formGroup = new FormGroup({
      coddep: new FormControl<string | null>(null),
      desdep: new FormControl<string | null>(null)
    });
  }
}
