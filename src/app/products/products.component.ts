import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Customer} from '../customers/customers.component';

@Component({
  selector: 'app-prodcuts',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {customer: Customer}) { }
  ngOnInit(): void {
    console.log(this.data);
  }
}
