import { Component, OnInit } from '@angular/core';
import { NotestudentService } from 'src/app/service/notestudent.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-listnotestudent',
  templateUrl: './listnotestudent.component.html',
  styleUrls: ['./listnotestudent.component.css']
})
export class ListnotestudentComponent implements OnInit {


  note : any
  constructor(private studentservice : StudentService,          private noteservice : NotestudentService) { 

 
  }

  
  
  
  
  
  DeleteNoteStudent(id)
  {
    this.noteservice.DeleteNoteStudent(id)
  }
  
  
  
  ngOnInit(): void {
    this.Load_All_Note()
  }



  Load_All_Note()
  {
    this.noteservice.Get_All_Note_Studenten().subscribe((data=>{

      this.note = data
    }))

 


   



    // Load the studiengangname entsprechend der iD
    

  }

}
