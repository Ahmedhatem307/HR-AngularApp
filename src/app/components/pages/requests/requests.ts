import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { LeaveRequest } from '../../../interfaces/leaveRequest.interface';
import { CommonModule } from '@angular/common';
import { ResignationRequest } from '../../../interfaces/resignationRequest.interface';
import { Employee, Person, UserTemp } from '../../../services/userTemp.service';

export interface RequestTableItem {
  id: number;
  type: string;
  date: string;
  status: string;
  name: string;
}

@Component({
  selector: 'app-requests',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests implements OnInit {
  allRequests: RequestTableItem[] = [];
  employee: Employee | null = null;
  person: Person | null = null;
  isLoading: boolean = false;

  StatusMap: { [key: string]: string } = {
    '0': 'Pending',
    '1': 'Approved',
    '2': 'Rejected',
    '3': 'Cancelled',
  };

  constructor(private requestsService: RequestsService, private userService: UserTemp) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data) => {
      this.employee = data.employee;
      this.person = data.person;
      this.loadRequests();
    });
  }

  loadRequests() {
    this.isLoading = true;
    this.requestsService.GetRequestsByEmployeeID(1).subscribe({
      next: (req) => {
        this.allRequests = req.result.map((r: any) => ({
          id: r.id,
          type: r.type,
          date: r.date,
          status: this.StatusMap[r.status] || 'Unknown',
          name: r.name || 'N/A',
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Requests loading error', err);
        this.isLoading = false;
      },
    });
  }

  cancelRequest(requestId: number, requestType: string) {
    const confirmed = confirm('Are you sure you want to cancel this request?');
    if (confirmed) {
      this.requestsService.cancelRequest(requestId, requestType, 1).subscribe({
        next: () => {
          alert('Request canceled successfully!');
          this.loadRequests();
        },
        error: (err) => {
          console.error(err);
          alert('Error canceling request');
        },
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'badge-pending';
      case 'Approved':
        return 'badge-approved';
      case 'Rejected':
        return 'badge-rejected';
      case 'Cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-secondary';
    }
  }
}
