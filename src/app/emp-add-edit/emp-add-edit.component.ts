import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  latestEmpId: string = 'z00000';

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const initialEmpId = this.generateEmployeeId();
    this.empForm = this._fb.group({
      empId: [initialEmpId],
      firstName: '',
      lastName: '',
      email: '',
      active: false,
    });

    const firstNameControl = this.empForm.get('firstName');
    if (firstNameControl) {
      firstNameControl.valueChanges.subscribe(() => {
        this.generateAndSetEmail();
      });
    }

    const lastNameControl = this.empForm.get('lastName');
    if (lastNameControl) {
      lastNameControl.valueChanges.subscribe(() => {
        this.generateAndSetEmail();
      });
    }
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  // Generate empId start at z00001
  private generateEmployeeId(): string {
    const prefix = 'z';
    const currentNumber = parseInt(this.latestEmpId.substr(1), 10);
    const nextNumber = currentNumber + 1;
    const nextEmpId = `${prefix}${nextNumber.toString().padStart(5, '0')}`;
    this.latestEmpId = nextEmpId;
    return nextEmpId;
  }

  //on submit at add form
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee updated successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    } else {
      alert('Please fill out the information completely.');
    }
  }

  //close form
  onCancelClick() {
    this._dialogRef.close();
  }

  //Generate Email 
  private generateAndSetEmail() {
    const firstName = this.empForm.get('firstName')?.value;
    const lastName = this.empForm.get('lastName')?.value;

    if (firstName && lastName) {
      const email = `${firstName}.${lastName.slice(0, 2)}@ztest.com`;

      this.empForm.get('email')?.setValue(email);
    }
  }

  //clear :except empId
  clearForm() {
    this.empForm.reset({ empId: this.empForm.value.empId }, { emitEvent: false });
  }

}
