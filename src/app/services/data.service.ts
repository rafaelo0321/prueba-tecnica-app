import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8090/api/v1/client/show/for';
  private clientSource = new BehaviorSubject<any>(null);
  client$ = this.clientSource.asObservable();

  constructor(private http: HttpClient) {}

  searchClient(typoDocument: string, numberDocument: string): Observable<any> {

    const url = `${this.apiUrl}/${typoDocument}/${numberDocument}`;
    return this.http.get(url);
  }
  setClientData(data: any) {
    this.clientSource.next(data);
  }
}

