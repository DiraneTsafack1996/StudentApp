import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  Student : any
  constructor(private studentservice :StudentService) { }

  ngOnInit(): void {
    this.Load_All_Studenten()
  }



  // 
  Load_All_Studenten()
  {
    this.studentservice.Get_All_Studentent().subscribe( data=> {
      this.Student=data
    })
  }


  DeleteStudent(Id)
  {
    this.studentservice.DeleteStudent(Id)
  }
}
