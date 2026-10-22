import { Component,inject } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voters-table',
  imports: [CommonModule],
  templateUrl: './voters-table.component.html',
  styleUrl: './voters-table.component.scss',
})
export class VotersTableComponent {
votingService = inject(VotingService);

voters = this.votingService.votersList;
loading = this.votingService.votersLoading;

error = this.votingService.voterHasError;
errorMessage = this.votingService.errorMessage;
}
