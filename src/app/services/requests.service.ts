import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../interfaces/leaveRequest.interface';
import { ResignationRequest } from '../interfaces/resignationRequest.interface';
import { HRLetter } from '../interfaces/HRLetter.interface';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private baseLeaveUrl = 'http://localhost:5220/api/LeaveRequest/LeaveRequests';
  private baseResignationUrl = 'http://localhost:5220/api/ResignationRequest/ResignationRequests';
  private baseHRLetterUrl = 'http://localhost:5220/api/HRLetterRequest/HRLetterRequests';
  private Url = 'http://localhost:5220/api/Employee/employee';

  constructor(private http: HttpClient) {}

  //All Requests by an employee
  GetRequestsByEmployeeID(id: number) {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: RequestTableItem[];
    }>(`${this.Url}/${id}/requests`);
  }

  // Leave Requests
  addLeaveRequest(dto: any) {
    return this.http.post(`${this.baseLeaveUrl}`, dto);
  }

  getAllLeaveRequests() {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: LeaveRequest[];
    }>(`${this.baseLeaveUrl}`);
  }

  getLeaveRequestById(id: number) {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: LeaveRequest;
    }>(`${this.baseLeaveUrl}/${id}`);
  }
  // HR Letter Requests
  createHRLetterRequest(body: any) {
    return this.http.post(`${this.baseHRLetterUrl}`, body);
  }
  getAllHRLetterRequests() {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: HRLetter[];
    }>(`${this.baseHRLetterUrl}`);
  }
  getHRLetterRequestById(id: number) {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: HRLetter;
    }>(`${this.baseHRLetterUrl}/${id}`);
  }

  // Resignation Requests
  createResignationRequest(body: any) {
    return this.http.post(`${this.baseResignationUrl}`, body);
  }
  getAllResignationRequest() {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: ResignationRequest[];
    }>(`${this.baseResignationUrl}`);
  }
  getResignationRequestById(id: number) {
    return this.http.get<{
      errorMessage: string | null;
      haveError: boolean;
      result: ResignationRequest;
    }>(`${this.baseResignationUrl}/${id}`);
  }
}
