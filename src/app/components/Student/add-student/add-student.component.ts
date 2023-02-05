import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Student } from 'src/app/modeles/Student';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { StudentService } from 'src/app/service/student.service';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  StudentForm: FormGroup;
  Studiengang: Studiengang[] = [];
  obj_student: Student = null;

  Geschecht = ['weibliches ', 'männliches'];

  constructor(
    private student_service: StudentService,
    private router: Router,
    private Studiengang_service: StudiengangService
  ) {
    this.Load_all_Studiengangen();
    this.Studiengang_service.Changed.subscribe(() => {
      this.Load_all_Studiengangen();
    });

    this.Mein_Formular_Initialisieren();
  }

  ngOnInit(): void {}

  image: any;
  Mein_Formular_Initialisieren() {
    this.StudentForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      // password: new FormControl('' , [Validators.required, Validators.minLength(8)]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),

      nummer: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      anschrift: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      geschecht: new FormControl('', [Validators.required]),
      studiengang: new FormControl('', [Validators.required]),
      bild: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),
    });
  }

  // Validations
  get email_() {
    return this.StudentForm.get('email');
  }
  // get password_() {
  //   return this.StudentForm.get('password');
  // }

  get last_name() {
    return this.StudentForm.get('lastname');
  }
  get first_name() {
    return this.StudentForm.get('firstname');
  }

  get nummer_() {
    return this.StudentForm.get('nummer');
  }
  get anschrift_() {
    return this.StudentForm.get('anschrift');
  }

  get geschecht_() {
    return this.StudentForm.get('geschecht');
  }
  get studiengang_() {
    return this.StudentForm.get('studiengang');
  }
  get bild_() {
    return this.StudentForm.get('bild');
  }

  Load_all_Studiengangen() {
    this.Studiengang_service.Get_All_Studiengang().then((data) => {
      this.Studiengang = data;
    });
  }

  AddStudent() {
    let Splitted_Studiengang =
      this.StudentForm.get('studiengang').value.split('-');
    this.obj_student = new Student();
    this.obj_student.Firstname = this.StudentForm.get('firstname').value;
    this.obj_student.Lastname = this.StudentForm.get('lastname').value;
    this.obj_student.Email = this.StudentForm.get('email').value;
    this.obj_student.Anschrift = this.StudentForm.get('anschrift').value;
    this.obj_student.Nummer = this.StudentForm.get('nummer').value;
    this.obj_student.Studiengang_Id = Splitted_Studiengang[0];
    this.obj_student.StudiengangName = Splitted_Studiengang[1];
    this.obj_student.Geschecht = this.StudentForm.get('geschecht').value;

    // console.log(this.obj_student)

    this.obj_student.Bild = this.StudentForm.get('bild').value;
    this.student_service.SignUp(this.obj_student);
    this.StudentForm.reset();
    this.router.navigate(['']);
  }
}
