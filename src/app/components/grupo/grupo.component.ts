import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-grupo',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent implements  OnInit{
  formGroup!: FormGroup;


  ngOnInit() {
    this.formGroup = new FormGroup({
      codgrup: new FormControl<string | null>(null),
      desgrup: new FormControl<string | null>(null)
    });
  }
}
