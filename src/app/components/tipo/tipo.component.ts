import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-tipo',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css'
})
export class TipoComponent implements  OnInit{
  formGroup!: FormGroup;


  ngOnInit() {
    this.formGroup = new FormGroup({
      codtip: new FormControl<string | null>(null),
      destip: new FormControl<string | null>(null)
    });
}

}
