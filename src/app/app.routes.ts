import { Routes } from '@angular/router';
import { CandidatesNewComponent } from './candidates-new.component/candidates-new.component';
import { MainVotingComponent } from './main-voting.component/main-voting.component';

export const routes: Routes = [
  { path: '', component: MainVotingComponent }, // Main page with tables + form
  { path: 'candidates', component: CandidatesNewComponent }, // Full CRUD page replaces main content
  { path: '**', redirectTo: '' }
];
