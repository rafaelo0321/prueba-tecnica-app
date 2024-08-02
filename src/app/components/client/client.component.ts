import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})

export class ClientComponent {
  client: any;
  error: string | null = null;

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.dataService.client$.subscribe(
      data => this.client = data
    );
  }
  volver(){
      this.client = null;
      this.error = null;
      this.router.navigate(['/']);

  }

}
