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
export class VoterService implements OnDestroy {

  private vendors = signal<Voter[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  // Public readonly/computed signals
  readonly votersList = this.vendors.asReadonly();
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
    this.loadVoters();
  }
  private loadVoters() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Voter[]>(`${environment.apiAddress}/voters`).pipe(
      tap(data => {
        this.vendors.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to load voters');
        this.loading.set(false);
        return of([]);
      })
    ).subscribe();
  }
  // CREATE Voter - POST /api/voters { name }
  createVoter(name: string) {
    this.error.set(null);
    return this.http.post<{ id: number }>(`${environment.apiAddress}/voters`, { name }).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to create voter');
        return of(null);
      })
    );
  }

  // UPDATE Voter - PUT /api/voters/{id} { id, name }
  updateVoter(id: number, name: string) {
    this.error.set(null);
    return this.http.put(`${environment.apiAddress}/voters/${id}`, { id, name }).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to update voter');
        return of(null);
      })
    );
  }

  // DELETE Voter - DELETE /api/voters/{id}
  deleteVoter(id: number) {
    this.error.set(null);
    return this.http.delete(`${environment.apiAddress}/voters/${id}`).pipe(
      tap(() => this.refresh()),
      catchError(err => {
        this.error.set(err?.error?.message || err?.message || 'Failed to delete voter');
        return of(null);
      })
    );
  }
  ngOnDestroy(): void {
    this.pollSubscription$?.unsubscribe();
  }

}