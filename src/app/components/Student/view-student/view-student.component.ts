import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/modeles/Student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  Id_Document : any  
  overviewForm : FormGroup
  Student_Overview : any

  image : any
  Student : any

id_studiengang : any
StudiengangName : any
  constructor(private route : Router, private studentservice : StudentService, private fb :FormBuilder ,
    private ActivatedRouted : ActivatedRoute)

     {// Mein Formular Initialisieren
      this.overviewForm = new FormGroup({

        lastname:new FormControl('' , [Validators.required, Validators.minLength(8)]),
        firstname:new FormControl('' , [Validators.required, Validators.minLength(8)]),
        email:new FormControl('' , [Validators.required]),
        password:new FormControl('' , [Validators.required]),
        matrikulnummer :new FormControl('' , [Validators.required]),
        geschecht:new FormControl('' , [Validators.required]),
        studiengang:new FormControl('' , [Validators.required]),
        nummer:new FormControl('' , [Validators.required]),
        anschrift:new FormControl('' , [Validators.required]),
        
            
          });
          this.ActivatedRouted.queryParams.subscribe(data => {
            this.Id_Document = data['id'];
      
            this.studentservice.Load_OneStudent(data['id']).subscribe(data => {
      
              this.Student = data
              this.overviewForm = this.fb.group({
            
                email : [this.Student.Email ,Validators.required],
                password : [this.Student.Password ,Validators.required],
                firstname: [this.Student.Firstname, Validators.required],
                lastname: [this.Student.Lastname, Validators.required],
                matrikulnummer : [this.Student.MatrikulNummer ,Validators.required],
                bild: [this.Student.Bild, Validators.required],
                nummer: [this.Student.Nummer, Validators.required],
                anschrift: [this.Student.Anschrift, Validators.required],
                studiengang: [this.Student.StudiengangName, Validators.required],
                geschecht: [this.Student.Geschecht, Validators.required],
      
      
      
              })

              this.image = this.Student.Bild
            }
      

          
      
            )
          })
    
 
   }

    
    

















  ngOnInit(): void {
  

   

   
    

  }
}
