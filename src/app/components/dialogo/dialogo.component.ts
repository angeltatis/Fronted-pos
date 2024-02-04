import {Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.css'
})
export class DialogoComponent implements OnInit {

  // Dentro de tu componente de diálogo
  header!: string;
  message!: string;
  icon!: string;
  color!: string;

  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: any) {
    this.icon = data.icon;
    this.color = data.color;
  }

  ngOnInit(): void {
    this.message = this.data.message;
    this.header = this.data.header;
  }
  closeDialog() {
    this.ref.close();
  }

}
