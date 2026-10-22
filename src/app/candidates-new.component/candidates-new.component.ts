// src/app/components/candidate-management.component.ts (or rename to candidate-new.component.ts)
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../models/candidate.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidate-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates-new.component.html', // or candidate-new.component.html
  styleUrls: ['./candidates-new.component.scss']
})
export class CandidatesNewComponent {
  private candidateService = inject(CandidateService);

  candidates = this.candidateService.candidatesList;
  loading = this.candidateService.isLoading;
  error = this.candidateService.errorMessage;

  // Form state
  formName = '';
  editingId: number | null = null;
  isSubmitting = false;

  // Add new candidate
  submitForm() {
    if (!this.formName.trim() || this.isSubmitting) return;

    this.isSubmitting = true;

    if (this.editingId === null) {
      // Create
      this.candidateService.createCandidate(this.formName.trim()).subscribe({
        next: () => this.resetForm(),
        error: () => this.isSubmitting = false
      });
    } else {
      // Update
      this.candidateService.updateCandidate(this.editingId, this.formName.trim()).subscribe({
        next: () => this.resetForm(),
        error: () => this.isSubmitting = false
      });
    }
  }

  // Populate form for edit
  editCandidate(candidate: Candidate) {
    this.formName = candidate.name;
    this.editingId = candidate.id;
  }

  // Delete candidate
  deleteCandidate(id: number) {
    if (!confirm('Are you sure you want to delete this candidate?')) return;

    this.candidateService.deleteCandidate(id).subscribe();
  }

  // Cancel edit
  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.formName = '';
    this.editingId = null;
    this.isSubmitting = false;
  }
}