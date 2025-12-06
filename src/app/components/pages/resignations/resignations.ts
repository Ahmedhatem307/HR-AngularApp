import { Component } from '@angular/core';
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
export class Resignations {
  resignationForm: FormGroup;
  attachmentBase64: string | null = null;
  name: string = 'Ahmed';

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
      secondApproveId: [''], // optional
    });
  }

  submitForm() {
    const f = this.resignationForm.value;
    const formData = new FormData();

    formData.append('requestedById', Number(f.requestedById).toString());
    formData.append('reason', f.reason);

    // Optional fields
    formData.append(
      'proposedLastWorkingDay',
      f.proposedLastWorkingDay?.trim() === '' ? '' : f.proposedLastWorkingDay
    );

    formData.append('attachment', f.attachment?.trim() === '' ? '' : f.attachment);

    // Approver IDs
    formData.append('firstApproveId', Number(f.firstApproveId).toString());
    formData.append(
      'secondApproveId',
      f.secondApproveId?.toString().trim() === '' ? '' : Number(f.secondApproveId).toString()
    );

    formData.append('createdBy', this.name);

    this.resignationService.createResignationRequest(formData).subscribe(() => {});
    this.goBack();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.attachmentBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  goBack() {
    this.location.back();
  }
}
