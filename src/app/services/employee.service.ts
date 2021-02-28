import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee= new Employee();
  readonly baseURL = 'https://localhost:44369/Employee';
  lstEmployees : Employee[];

  constructor(private http: HttpClient) { }

  insertEmployee() {
    return this.http.post(this.baseURL, this.formData);
  }

  updateEmployee() {
    return this.http.put(`${this.baseURL}/${this.formData.employeeId}`, this.formData);
  }

  deleteEmployee(id: Number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getEmployees() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.lstEmployees = res as Employee[]);
  }
}
