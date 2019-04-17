import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Customer} from '../customers/customers.component';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ProductDetailComponent} from '../product-detail/product-detail.component';

export interface Order {
  orderNumber: string;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  status: string;
  comments: string;
  products: Product[];
}

export interface Product {
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
  hasOrder$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasOrder$: Observable<boolean>;
  @Input() customer: Customer;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.orderList$ = this.orderList$$.asObservable();
    this.hasOrder$ = this.hasOrder$$.asObservable();
  }
  ngOnInit(): void {
    this.fetchOrders(this.customer.customerNumber).pipe(
      tap((response: Order[]) => {
        this.hasOrder$$.next(response.length > 0);
        this.orderList$$.next(response);
      })
    ).subscribe();
  }

  fetchOrders(customerNumber: string) {
    const url = `http://localhost:3000/orders?customerNumber=${customerNumber}`;
    return this.http.get(url);
  }
  showDetail(product: Product) {
    this.dialog.open(ProductDetailComponent, {data: {product: product}});
  }
}
