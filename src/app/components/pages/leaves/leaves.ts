import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestsService } from '../../../services/requests.service';
import { LeaveTypes } from '../../../services/leaveType.service';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves implements OnInit {
  attachmentBase64: string | null = null;
  leaveTypes: any[] = [];
  form: FormGroup;
  name: string = 'Ahmed';

  constructor(
    private fb: FormBuilder,
    private service: RequestsService,
    private leaveService: LeaveTypes
  ) {
    this.form = this.fb.group({
      requestedById: [6], // will get from auth later
      startDate: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      leaveType: [null, Validators.required],
      reason: ['', Validators.required],
      attachment: [''],
      isPaid: [false],
      firstApproveId: ['', Validators.required],
      secondApproveId: [''],
    });
  }
  ngOnInit(): void {
    this.leaveService.getAllLeaveTypes().subscribe((type) => {
      const names = type.map((t) => ({ id: t.id, name: t.name }));
      this.leaveTypes = names;
    });
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

  submit() {
    const formValue = this.form.value;
    const payload = {
      requestedById: Number(formValue.requestedById),
      startDate: formValue.startDate?.trim() === '' ? null : formValue.startDate,
      leaveType: Number(formValue.leaveType),
      reason: formValue.reason,
      attachment: formValue.attachment?.trim() === '' ? null : formValue.attachment,
      isPaid: formValue.isPaid ? true : false,
      firstApproveId: Number(formValue.firstApproveId),
      secondApproveId:
        formValue.secondApproveId?.toString().trim() === ''
          ? null
          : Number(formValue.secondApproveId),
      createdBy: this.name,
    };
    this.service.addLeaveRequest({ ...payload }).subscribe(() => {});
  }
}
