import {Component} from '@angular/core';
import{Iproduct} from "../../interfaces/Producto";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent  {
  products!: Iproduct[];
}


