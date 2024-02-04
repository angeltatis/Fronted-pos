import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-subgrupo',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './subgrupo.component.html',
  styleUrl: './subgrupo.component.css'
})
export class SubgrupoComponent implements  OnInit{
  formGroup!: FormGroup;


  ngOnInit() {
    this.formGroup = new FormGroup({
      coddep: new FormControl<string | null>(null),
      desdep: new FormControl<string | null>(null)
    });
  }
}
