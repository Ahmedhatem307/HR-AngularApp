import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsService } from '../../../services/requests.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hrletters',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hrletters.html',
  styleUrl: './hrletters.css',
})
export class Hrletters {
  hrLetterForm: FormGroup;
  attachmentBase64: string | null = null;
  name: string = 'Ahmed';

  constructor(private fb: FormBuilder, private hrService: RequestsService) {
    this.hrLetterForm = this.fb.group({
      requestedById: [6],
      letterType: ['', Validators.required],
      reason: ['', Validators.required],
      extraDetails: [''],
      attachment: [''],
      firstApproveId: [null, Validators.required],
      secondApproveId: [''],
    });
  }

  submitForm() {
    const f = this.hrLetterForm.value;
    const payload = {
      requestedById: Number(f.requestedById),
      letterType: f.letterType,
      reason: f.reason,
      extraDetails: f.extraDetails?.trim() === '' ? null : f.extraDetails,
      attachment: f.attachment?.trim() === '' ? null : f.attachment,
      firstApproveId: Number(f.firstApproveId),
      secondApproveId:
        f.secondApproveId?.toString().trim() === '' ? null : Number(f.secondApproveId),
      createdBy: this.name,
    };

    this.hrService.createHRLetterRequest({ ...payload }).subscribe({});
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
}
