import { Component, inject } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-candidates-table',
  imports: [RouterLink],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.scss',
})
export class CandidatesTableComponent {
votingService = inject(VotingService);

candidates = this.votingService.candidatesList;
loading = this.votingService.candidatesLoading;

error = this.votingService.candidateHasError;
errorMessage = this.votingService.errorMessage;
}
