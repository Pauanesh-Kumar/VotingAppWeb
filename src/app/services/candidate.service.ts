import { inject, Injectable, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Voter } from '../models/voter.model';
import { Candidate } from '../models/candidate.model';
import { catchError, tap } from 'rxjs/operators';
import { of, Subscription, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CandidateService implements OnDestroy {

  private candidates = signal<Candidate[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  // Public readonly/computed signals
  readonly candidatesList = this.candidates.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly errorMessage = this.error.asReadonly();
  readonly hasError = computed(() => this.error() !== null);
   
  private http = inject(HttpClient);
  private pollSubscription$: Subscription;

  constructor() {
    this.refresh();

    this.pollSubscription$ = interval(3000).pipe(takeUntilDestroyed()).subscribe(()=> this.refresh());
  }
  refresh(){
    this.loadCandidates();
  }
  private loadCandidates() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Candidate[]>(`${environment.apiAddress}/candidates`).pipe(
      tap(data => {
        this.candidates.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to load candidates');
        this.loading.set(false);
        return of([]);
      })
    ).subscribe();
  }
  // CREATE Candidate - POST /api/candidates { name }
  createCandidate(name: string) {
    this.error.set(null);
    return this.http.post<{ id: number }>(`${environment.apiAddress}/candidates`, { name }).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to create candidate');
        return of(null);
      })
    );
  }

  // UPDATE Candidate - PUT /api/candidates/{id} { id, name }
  updateCandidate(id: number, name: string) {
    this.error.set(null);
    return this.http.put(`${environment.apiAddress}/candidates/${id}`, { id, name }).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to update candidate');
        return of(null);
      })
    );
  }

  // DELETE Candidate - DELETE /api/candidates/{id}
  deleteCandidate(id: number) {
    this.error.set(null);
    return this.http.delete(`${environment.apiAddress}/candidates/${id}`).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to delete candidate');
        return of(null);
      })
    );
  }
  ngOnDestroy(): void {
    this.pollSubscription$?.unsubscribe();
  }

}