import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-client',
  templateUrl: './query-client.component.html',
  styleUrls: ['./query-client.component.css']
})
export class QueryClientComponent {
  documentoForm: FormGroup;
  client: any;
  error: string | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.documentoForm = this.fb.group({
      typoDocument: ['', Validators.required],
      numberDocument: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]]
    });
  }

  searchDocument() {
    if (this.documentoForm.valid) {
        const typoDocument= this.documentoForm.get('typoDocument')?.value;
        const numberDocument= this.documentoForm.get('numberDocument')?.value;


      this.dataService.searchClient(typoDocument, numberDocument).subscribe(
        (response: any) => {
          this.dataService.setClientData(response);
          console.log(response);
          this.router.navigate(['/client']);
        },
        (error) => {
          console.error('Error al buscar el documento:', error);
          this.error = error.error.message || 'Error desconocido al buscar el documento.';
          alert(error.error.message)

        }
      );
  }
}
volver() {
  this.client = null;
  this.error = null;
  this.router.navigate(['/']);
}
}
