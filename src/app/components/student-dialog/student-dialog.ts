import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './student-dialog.html',
  styleUrls: ['./student-dialog.css']
})
export class StudentDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', Validators.required],
      mobile: [data?.mobile || '', Validators.required],
      course: [data?.course || '', Validators.required],
      designation: [data?.designation || ''],
      status: [data?.status || 'Active'],
      joiningDate: [data?.joiningDate || '']
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      alert('Student information saved successfully!');
    }
  }

  close() {
    this.dialogRef.close();
  }
}