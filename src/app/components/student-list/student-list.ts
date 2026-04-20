import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDialogComponent } from '../student-dialog/student-dialog';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent implements OnInit {

  students: any[] = [];

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const data = localStorage.getItem('students');
    if (data) {
      this.students = JSON.parse(data);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  openDialog(student?: any, index?: number) {

    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '500px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        if (index != null) {
          result.id = student.id;
          this.students[index] = result;
        } else {
          result.id = this.students.length + 1;
          this.students.push(result);
        }

        this.saveToLocalStorage();
        this.students = [...this.students];
        this.cdr.detectChanges();
      }
    });
  }

  edit(student: any, i: number) {
    this.openDialog(student, i);
  }

  delete(i: number) {
    if (confirm('Delete this student?')) {
      this.students.splice(i, 1);
      this.saveToLocalStorage();
      this.students = [...this.students];
    }
  }
}