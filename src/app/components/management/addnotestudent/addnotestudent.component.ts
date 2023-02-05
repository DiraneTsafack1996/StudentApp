import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/modeles/NoteStudent';
import { Student } from 'src/app/modeles/Student';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { NotestudentService } from 'src/app/service/notestudent.service';
import { StudentService } from 'src/app/service/student.service';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-addnotestudent',
  templateUrl: './addnotestudent.component.html',
  styleUrls: ['./addnotestudent.component.css']
})
export class AddnotestudentComponent implements OnInit {


  AddNoteStudent : FormGroup
  Student :any
  Students : any
  Fach : any
  obj_Studiengang :  Studiengang [] = []
  
  MinimumNumber = 1
  MaximumNumber = 5
  constructor(private studiengangservice:StudiengangService, private router : Router,
           private Noteservice : NotestudentService) {

    this.Load_all_Studiengangen()
    this.studiengangservice.Changed.subscribe(()=> {
      this.Load_all_Studiengangen()
    })


    this.AddNoteStudent = new FormGroup({
      note: new FormControl('', [Validators.required, Validators.min(this.MinimumNumber), Validators.max(this.MaximumNumber)]),
      fach: new FormControl('', [Validators.required]),
      student: new FormControl('', [Validators.required]),

    });
   }

  ngOnInit(): void {


  }

  onChangeStudiengang(E)
  {
   // console.log("Id_reference von Studiengang : " + E.target.value)
    this.Noteservice.Load_all_Studenten_entsprechend_der_Studiengang(E.target.value).subscribe((data=>{
    this.Students = data
    }))
  }



  get fach_() {
    return this.AddNoteStudent.get('fach');
   }
   get student_() {
    return this.AddNoteStudent.get('student');
   }
   get note_() {
    return this.AddNoteStudent.get('note');
   }


  Student_ref : any
  Studiengang_Id : any
  Studiengang_Name : any
  Student_Firstname : any
  Student_Email_Uid : any

  onChange(e)
  {
    let Splitted_Module = e.target.value.split('-');

     this.Studiengang_Id = Splitted_Module[0]
     this.Studiengang_Name = Splitted_Module[1]
     this.Student_Firstname = Splitted_Module[2]
     this.Student_Email_Uid = Splitted_Module[3]

    // console.log("Id_Studiengang_von_selected_student : " + this.Studiengang_Id )
    console.log(this.Studiengang_Name)
    
    this.Noteservice.Load_all_Module_entsprechend_der_Facher(Splitted_Module[0]).subscribe((data=> {


    // console.log("Data : " +data.length)
      this.Fach = data
    }))
  }

  Load_all_Studiengangen()
  {
    this.studiengangservice.Get_All_Studiengang().then(( data=> {

      this.obj_Studiengang = data
    }))
  }


  Add_Student_Note()
  {
    let Splitted_Fach = this.AddNoteStudent.value.fach.split('-'); 

   let Data : Note = {

    FachId : Splitted_Fach[0] ,
    FachName : Splitted_Fach[1],
    CreditPunkte :  Splitted_Fach[2],
    
    StudiengangId : this.Studiengang_Id,
    StudiengangName : this.Studiengang_Name,

    StudentFirstName : this.Student_Firstname,
    StudentEmailuid : this.Student_Email_Uid,




    Note : this.AddNoteStudent.value.note
    
   }

      //console.log(Data)
     this.Noteservice.SaveStudentenNote(Data)
     this.router.navigate(["listenote"]);
    this.AddNoteStudent.reset()



  }

}
