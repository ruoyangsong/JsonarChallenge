import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Customer} from '../customers/customers.component';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

interface Order {
  orderNumber: string;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  status: string;
  comments: string;
  products: Product[];
}

interface Product {
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  productDescription: string;
  quantityInStock: string;
  buyPrice: string;
  MSRP: string;
}

@Component({
  selector: 'app-prodcuts',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  orderList$$: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  orderList$: Observable<Order[]>;
  @Input() customer: Customer;
  constructor(private http: HttpClient) {
    this.orderList$ = this.orderList$$.asObservable();
  }
  ngOnInit(): void {
    this.fetchOrders(this.customer.customerNumber).pipe(
      tap((response: Order[]) => this.orderList$$.next(response))
    ).subscribe();
  }

  fetchOrders(customerNumber: string) {
    const url = `http://localhost:3000/orders?customerNumber=${customerNumber}`;
    return this.http.get(url);
  }
  showDetail(product: Product) {
    console.log(product);
  }
}
