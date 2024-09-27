import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';

const routes: Routes = [
  {
    path: 'students', component: StudentsComponent
  },
  {
    path: 'students-form', component: StudentFormComponent
  },
  {
    path: 'students/:id', component: StudentFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
