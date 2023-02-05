import { Component, OnInit } from '@angular/core';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { NotestudentService } from 'src/app/service/notestudent.service';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-view-note-one-student',
  templateUrl: './view-note-one-student.component.html',
  styleUrls: ['./view-note-one-student.component.css']
})
export class ViewNoteOneStudentComponent implements OnInit {

  obj_Studiengang :  Studiengang [] = []
  Students : any
  constructor(private Note_Service : NotestudentService,     private Studiengang_Service : StudiengangService  ) {
    this.Load_all_Studiengangen()
    this.Studiengang_Service.Changed.subscribe(()=> {
      this.Load_all_Studiengangen()
    })
   }
   note : any
  ngOnInit(): void {
  }
  Load_all_Studiengangen()
  {
    this.Studiengang_Service.Get_All_Studiengang().then(( data=> {

      this.obj_Studiengang = data
    }))
  }

  onChangeStudiengang(e)
  {
    // console.log("StudiengangId : " + e.target.value)
    this.Note_Service.Load_all_Studenten_entsprechend_der_Studiengang(e.target.value).subscribe((data=>{
      this.Students = data
      }))

  }
  onChangeStudent(e)
  {
    //console.log("StudentEmailuid " + e.target.value)
    this.Note_Service.Load_Note(e.target.value).subscribe((data=>{
      this.note = data
    }))
  }

}
