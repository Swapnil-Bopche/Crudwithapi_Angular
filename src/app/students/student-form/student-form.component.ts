import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/DBMS/api.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit, OnDestroy {

  StudentForm!: FormGroup;
  Studentform_Subscription!: Subscription;
  Params_Subscription!: Subscription;
  isUpdate: boolean = false;


  constructor(private _fb: FormBuilder, private _api: ApiService, private _router: Router, private _activateRoute: ActivatedRoute, private _toastr: ToastrService) { }

  ngOnDestroy(): void {
    if (this.Studentform_Subscription) {
      this.Studentform_Subscription.unsubscribe();
    }

    if (this.Params_Subscription) {
      this.Params_Subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.toget_Params_route()
    this.formSetup_();
  }

  formSetup_() {
    this.StudentForm = this._fb.group({

      id: [null],
      title: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.email])],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      acceptTerms: ['', Validators.required]
    })
  }

  toget_Params_route() {
    this.Params_Subscription = this._activateRoute.params.subscribe({
      next: (res) => {
        console.log(res['id']);
        let id_ = res['id'];

        if (!id_) return;

        this._api.getUser(id_).subscribe({
          next: (res_) => {
            this.StudentForm.patchValue(res_);
            this.isUpdate = true;
            console.log(res_);

          },
          error: (err_) => {
            console.log(err_);

          }
        })

      },
      error: (er) => {
        console.log(er);

      }
    })
  }

  Onsubmit() {

    if (this.isUpdate == true) {
      this._api.updateUser(this.StudentForm.value).subscribe({
        next: (data) => {
          this._toastr.success('User Updated');
          this._router.navigate(['/students']);
          console.log(data);

        },
        error: (err) => {
          this._toastr.error('Unable to update user')
          console.log(err);

        }
      })
    }
    else {
      if (this.StudentForm.valid) {
        this.Studentform_Subscription = this._api.addUser(this.StudentForm.value).subscribe({
          next: (res_) => {
            this._router.navigate(['/students']);
            this._toastr.success('User added successfully')
            console.log(res_);

          },
          error: (err) => {
            console.log(err);

          }
        })
      }
      else {
        alert('please enter valid credentials')
      }
      //

    }


  }

  cancel() {
    this._router.navigate(['/students']);
  }




}
