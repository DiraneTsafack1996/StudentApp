import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/modeles/Student';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { StudentService } from 'src/app/service/student.service';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  EditStudentForm: FormGroup
  Studiengang: Studiengang[] = []
  Geschecht = ['weibliches ', 'männliches', 'Divers'];
  Id_Document: any
  Student: any

  constructor(private route: Router, private studentservice: StudentService,
    private fb: FormBuilder, private studiengangservice: StudiengangService,
    private ActivatedRouted: ActivatedRoute) {
    this.Load_all_Studiengangen()
    this.studiengangservice.Changed.subscribe(() => {
      this.Load_all_Studiengangen()
    })


    // Mein Formular Initialisieren
    this.EditStudentForm = new FormGroup({

      firstname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(8)]),

      nummer: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      anschrift: new FormControl('', [Validators.required, Validators.minLength(8)]),
      geschecht: new FormControl('', [Validators.required]),
      studiengang: new FormControl('', [Validators.required]),
      bild: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),


    });



    // Retrieve data in Entsprechend Felder
    this.ActivatedRouted.queryParams.subscribe(data => {
      this.Id_Document = data['id'];

      this.studentservice.Load_OneStudent(data['id']).subscribe(data => {

        this.Student = data
        this.EditStudentForm = this.fb.group({
          // Filiere: [`${this.post.Filiere.FiliereId}-${this.post.Filiere.FiliereName}`, Validators.required],
          // email : [this.Student.Email ,Validators.required],
          firstname: [this.Student.Firstname, Validators.required],
          lastname: [this.Student.Lastname, Validators.required],
          bild: [this.Student.Bild, Validators.required],
          nummer: [this.Student.Nummer, Validators.required],
          anschrift: [this.Student.Anschrift, Validators.required],
          studiengang: [this.Student.StudiengangId, Validators.required],
          geschecht: [this.Student.Geschecht, Validators.required],



        })
      }


      )
    })
  }

  ngOnInit(): void {

  }
  Load_all_Studiengangen() {
    this.studiengangservice.Get_All_Studiengang().then((data => {

      this.Studiengang = data
    }))
  }



















  get last_name() {
    return this.EditStudentForm.get('lastname');
  }
  get first_name() {
    return this.EditStudentForm.get('firstname');
  }

  get nummer_() {
    return this.EditStudentForm.get('nummer');

  }
  get anschrift_() {
    return this.EditStudentForm.get('anschrift');
  }

  get geschecht_() {
    return this.EditStudentForm.get('geschecht');
  }
  get studiengang_() {
    return this.EditStudentForm.get('studiengang');
  }
  get bild_() {
    return this.EditStudentForm.get('bild');
  }


  EditStudent() {

    let Neu_User: Student = {


      Lastname: this.EditStudentForm.value.lastname,
      Firstname: this.EditStudentForm.value.firstname,
      Studiengang_Id: this.EditStudentForm.value.studiengang,
      Nummer: this.EditStudentForm.value.nummer,
      Anschrift: this.EditStudentForm.value.anschrift,
      Bild: this.EditStudentForm.value.bild,
      Geschecht: this.EditStudentForm.value.geschecht,
    }
    // console.log(Neu_User)
    this.studentservice.Edit_Student(this.Id_Document, Neu_User)
    this.route.navigate(['liststudent']);

  }

}
