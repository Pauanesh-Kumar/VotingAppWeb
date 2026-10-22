import { Component, inject } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-form',
  standalone: true,
  imports: [
    CommonModule,   // For @for, @if control flow and basic directives
    FormsModule     // Required for [(ngModel)] two-way binding
  ],
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss'] // Optional: add custom styles if needed
})
export class VoteFormComponent {
  // Inject the shared VotingService (signal-based state)
  private votingService = inject(VotingService);

  // Public readonly signals from the service
  voters = this.votingService.votersList;
  candidates = this.votingService.candidatesList;

  // Local state for dropdown selections
  selectedVoter: number | null = null;
  selectedCandidate: number | null = null;

  /**
   * Handles vote submission
   * Calls the service to cast the vote and resets form on success
   */
  submit(): void {
    if (this.selectedVoter === null || this.selectedCandidate === null) {
      return; // Button is disabled anyway, but safety check
    }

    this.votingService.castVote(this.selectedVoter, this.selectedCandidate);

    // Optional: Provide user feedback (service refreshes data automatically via polling)
    alert('Vote submitted successfully!');

    // Reset dropdowns after submission
    this.selectedVoter = null;
    this.selectedCandidate = null;
  }
}