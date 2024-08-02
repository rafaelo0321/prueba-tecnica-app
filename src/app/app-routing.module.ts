import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryClientComponent } from './components/query-client/query-client.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  { path: '', component: QueryClientComponent },
  { path: 'client', component: ClientComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
