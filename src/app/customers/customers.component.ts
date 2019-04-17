import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatTableDataSource} from '@angular/material';

interface Customer {
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
  customerList: Customer[] = [];
  customerNumber$$: BehaviorSubject<number> = new BehaviorSubject(0);
  customerNumber$: Observable<number>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {
    this.searchValue$ = this.searchValue$$.asObservable();
    this.progressBarLoading$ = this.progressBarLoading$$.asObservable();
    this.customerList$ = this.customerLists$$.asObservable();
    this.customerNumber$ = this.customerNumber$$.asObservable();
  }

  ngOnInit(): void {
    this.searchValue$.pipe(
      tap(() => this.progressBarLoading$$.next(true)),
      switchMap((searchValue) => this.fetchCustomers(searchValue)),
      tap((result: any) => {
        this.customerLists$$.next(result);
        this.customerList = result;
        this.customerNumber$$.next(result.length);
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
}
const TESTLIST: Customer[] = [{customerNumber: '1', customerName: 'test'}, {customerNumber: '2', customerName: 'sadas'}];
