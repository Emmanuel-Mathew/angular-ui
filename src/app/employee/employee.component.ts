import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  msg: string;
  dtOptions: DataTables.Settings = {};
  btnText: string;
  btnClass: string;

  constructor(public service: EmployeeService) { }

  ngOnInit() {
    this.btnText = "Save";
    this.btnClass = "primary";
    this.service.getEmployees();
    this.dtOptions = {
      responsive: true,
      autoWidth: false
    };
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.employeeId == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.insertEmployee().subscribe(res => {
      if (res) {
        alert("Record inserted successfully!");
      }
      else {
        alert("Record could not be inserted!")
      }
      this.resetForm(form);
      this.service.getEmployees();
    },
      err => {
        alert("Something went wrong, please try again later!")
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.updateEmployee().subscribe(res => {
      if (res) {
        alert("Record updated successfully!");
      }
      else {
        alert("Record could not be updated!")
      }
      this.resetForm(form);
      this.service.getEmployees();
      this.btnText = "Save";
      this.btnClass = "primary";
    },
      err => {
        alert("Something went wrong, please try again later!")
      }
    )
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.btnText = "Update";
    this.btnClass = "success";
  }

  resetForm(form: NgForm) {
    this.service.formData = new Employee();
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(id)
        .subscribe(res => {
          if (res)
            alert("Record deleted successfully!");
          else
            alert("Record could not be deleted!")
          this.service.getEmployees();
        },
          err => { alert("Something went wrong, please try again later!") })
    }
  }

}
