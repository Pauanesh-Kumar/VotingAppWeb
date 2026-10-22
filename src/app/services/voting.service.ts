// src/app/services/voting.service.ts (renamed/refactored from original – now only handles voting)
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { VoterService } from './voter.service';
import { CandidateService } from './candidate.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  private error = signal<string | null>(null);
  readonly errorMessage = this.error.asReadonly();

  private http = inject(HttpClient);
  private voterService = inject(VoterService);
  private candidateService = inject(CandidateService);

  // Expose lists from dedicated services (no duplication)
  readonly votersList = this.voterService.votersList;
  readonly candidatesList = this.candidateService.candidatesList;
  readonly votersLoading = this.voterService.isLoading;
  readonly candidatesLoading = this.candidateService.isLoading;
  readonly voterHasError = this.voterService.hasError;
  readonly candidateHasError = this.candidateService.hasError;
  
  castVote(voterId: number, candidateId: number) {
    this.error.set(null);

    return this.http.post(`${environment.apiAddress}/votes`, { voterId, candidateId }).pipe(
      tap(() => {
        // Refresh both lists via their dedicated services (DRY)
        this.voterService.refresh();
        this.candidateService.refresh();
      }),
      catchError(err => {
        this.error.set('Vote failed: ' + (err?.error?.message || err?.message || 'Unknown error'));
        return of(null);
      })
    );
  }
}