import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ICompany } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly API_URL = `${environment.webApiURL}/api/Company`;

  constructor(private http: HttpClient) {}

  GetCompanySetting() {
    return this.http.get<ICompany>(`${this.API_URL}/GetCompanySetting`);
  }

  SaveCompanySetting(dto: FormData){
    return this.http.post<ICompany>(`${this.API_URL}/SaveCompanySetting`, dto);
  }
}


