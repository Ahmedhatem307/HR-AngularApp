import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsService } from '../../../services/requests.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resignations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resignations.html',
  styleUrl: './resignations.css',
})
export class Resignations implements OnInit {
  resignationForm: FormGroup;
  attachmentBase64: string | null = null;
  attachmentFile: File | null = null;
  name: string = 'Ahmed';
  isSubmitting: boolean = false;
  hasPendingResignation: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resignationService: RequestsService,
    private location: Location
  ) {
    this.resignationForm = this.fb.group({
      requestedById: [1],
      reason: ['', Validators.required],
      proposedLastWorkingDay: ['', Validators.required],
      attachment: [''],
      firstApproveId: [null, Validators.required],
      secondApproveId: [''],
    });
  }

  ngOnInit() {
    this.checkPendingResignation();
  }

  checkPendingResignation() {
    // Check if employee has a pending resignation request
    this.resignationService.GetRequestsByEmployeeID(1).subscribe({
      next: (res) => {
        const pendingResignation = res.result?.find(
          (r: any) => r.type === 'Resignation' && r.status === 0
        );
        this.hasPendingResignation = !!pendingResignation;
      },
      error: (err) => console.error(err),
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.attachmentFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.attachmentBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  clearFile() {
    this.attachmentFile = null;
    this.attachmentBase64 = null;
  }

  submitForm() {
    if (this.hasPendingResignation) {
      alert(
        'You already have a pending resignation request. Please wait for approval before submitting another one.'
      );
      return;
    }

    if (this.resignationForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    this.isSubmitting = true;
    const f = this.resignationForm.value;
    const formData = new FormData();

    formData.append('requestedById', Number(f.requestedById).toString());
    formData.append('reason', f.reason);
    formData.append('proposedLastWorkingDay', f.proposedLastWorkingDay);
    formData.append('firstApproveId', Number(f.firstApproveId).toString());
    formData.append(
      'secondApproveId',
      f.secondApproveId ? Number(f.secondApproveId).toString() : ''
    );
    formData.append('createdBy', this.name);

    if (this.attachmentFile) {
      formData.append('attachment', this.attachmentFile, this.attachmentFile.name);
    } else {
      formData.append('attachment', '');
    }

    this.resignationService.createResignationRequest(formData).subscribe({
      next: () => {
        alert('Resignation request submitted successfully!');
        this.isSubmitting = false;
        this.goBack();
      },
      error: (err) => {
        console.error(err);
        alert('Error submitting resignation request');
        this.isSubmitting = false;
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
