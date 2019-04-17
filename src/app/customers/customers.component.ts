import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ProductsComponent} from '../products/products.component';

export interface Customer {
  customerName: string;
  customerNumber: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  pageIndex = 1;
  searchValue$$: BehaviorSubject<string> = new BehaviorSubject('');
  searchValue$: Observable<string>;
  progressBarLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  progressBarLoading$: Observable<boolean>;
  customerLists$$: BehaviorSubject<Customer[]> = new BehaviorSubject([]);
  customerList$: Observable<Customer[]>;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.searchValue$ = this.searchValue$$.asObservable();
    this.progressBarLoading$ = this.progressBarLoading$$.asObservable();
    this.customerList$ = this.customerLists$$.asObservable();
  }

  ngOnInit(): void {
    this.searchValue$.pipe(
      tap(() => this.progressBarLoading$$.next(true)),
      switchMap((searchValue) => this.fetchCustomers(searchValue)),
      tap((result: any) => {
        this.customerLists$$.next(result);
      })
    ).subscribe();
  }

  onSearchChange(searchValue: string) {
    this.searchValue$$.next(searchValue);
  }

  fetchCustomers(customerName?: string) {
    let url = 'http://localhost:3000/customers';
    if (customerName) {
      url += `?customerName=${customerName}`;
    }
    return this.http.get(url);
  }

  toggleProductsDetail(customer: Customer) {
    this.dialog.open(ProductsComponent, {
      data: {
        customer: customer
      }
    });
  }
}
