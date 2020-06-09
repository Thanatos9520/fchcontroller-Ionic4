import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Warehouse } from '../models/warehouse';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  base_path = 'https://market-api-rest.herokuapp.com/warehouses'
 // base_path = 'http://localhost:3000/products'

  constructor(private http: HttpClient ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  //Handle API Error 
  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      //A client-side or network error ocurred
      console.error('An error occurred:', error.error.message);
    }else {
      //The backend returned an unsuccessful response code
      //The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${error.status}` +
        `Body was: ${error.error}`);
    }
    // Return an observable with user-facing error message
    return throwError(
      'Something bad happened; please try again later');
  };

  // Create a new item
  createItem(item): Observable<Warehouse> {
    return this.http
      .post<Warehouse>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //get single products data by ID
   getItem(idwarehouse): Observable<Warehouse> {
    return this.http
    .get<Warehouse>(this.base_path + '/' + idwarehouse)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //get products data
  public getList(): Observable<Warehouse[]> {
    return this.http
    .get<Warehouse[]>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  } 

  //update Item by id
  updateItem(idwarehouse: number|string, item: Warehouse): Observable<Warehouse> {
    return this.http 
    .put<Warehouse>(this.base_path + '/' + idwarehouse, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Delete item by id
  deleteItem(idwarehouse) {
    return this.http
    .delete<Warehouse>(this.base_path + '/' + idwarehouse, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

}
