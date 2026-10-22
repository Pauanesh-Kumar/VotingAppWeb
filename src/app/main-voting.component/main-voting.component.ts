import { Component } from '@angular/core';
import { VotersTableComponent } from '../voters-table.component/voters-table.component';
import { CandidatesTableComponent } from '../candidates-table.component/candidates-table.component';
import { VoteFormComponent } from '../vote-form.component/vote-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VotersTableComponent,
    CandidatesTableComponent,
    VoteFormComponent
  ],
  templateUrl: './main-voting.component.html'
})
export class MainVotingComponent {
  title = 'Voting app';
}