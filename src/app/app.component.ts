import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from './models/client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Welcome to this technical test';
  http = inject(HttpClient);
  clients : Client[] = [];

  ngOnInit(){
    this.http.get<Client[]>("http://localhost:8090/api/v1/client/showAll", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .subscribe((d)=>{
      this.clients = d;
      console.log(d);
    })

  }
  getClient(){

  }
}
