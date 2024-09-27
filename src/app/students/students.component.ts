import { Component, OnInit } from '@angular/core';
import { ApiService } from '../DBMS/api.service';
import { Observable } from 'rxjs';
import { User_ } from '../user_interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  StudentsList$!: Observable<User_[]>;

  constructor(private _api: ApiService, private _toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllStudents();
  }

  private getAllStudents() {
    this.StudentsList$ = this._api.getAllUsers();
  }

  delete(id: number) {
    this._api.deleteUser(id).subscribe({
      next: (res) => {
        this._toastr.success("User deleted");
        this.getAllStudents()
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



}
