import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Product} from '../products/products.component';

@Component({
  selector: 'prodcut-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}) { }
  ngOnInit(): void {

  }
}
