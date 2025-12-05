import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveType } from '../interfaces/LeaveType.interface';

@Injectable({ providedIn: 'root' })
export class LeaveTypes {
  constructor(private http: HttpClient) {}
  private Url = 'http://localhost:5220/api/LeaveType/LeaveTypes';

  getAllLeaveTypes() {
    const result = this.http.get<LeaveType[]>(`${this.Url}`);
    return result;
  }

  GetLeaveTypesById(id: number) {
    return this.http.get<LeaveType>(`${this.Url}/${id}`);
  }
}
