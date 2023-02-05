import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-edit-studiengang',
  templateUrl: './edit-studiengang.component.html',
  styleUrls: ['./edit-studiengang.component.css']
})
export class EditStudiengangComponent implements OnInit {

  EditStudiengangForm : FormGroup
  Id_Document : any 
  Obj_Studiengang : Studiengang = null;



  get studiengang_() {
    return this.EditStudiengangForm.get('studiengang');
  }

  constructor(private Studiengang_Service : StudiengangService, private route : Router,
                   private ActivatedRouted : ActivatedRoute) { 


    this.Id_Document = this.ActivatedRouted.snapshot.params["id"]

    
    this.EditStudiengangForm = new FormGroup({

      studiengang: new FormControl('' , [Validators.required, Validators.minLength(3)]),
      
    });

    this.Studiengang_Service.Retrieve_Studiengang(this.Id_Document).then((data=> {
      this.Obj_Studiengang = data
      this.EditStudiengangForm.setValue({

        
        'studiengang' :this.Obj_Studiengang.StudiengangName,
        

      })
    }))
   }








  

  ngOnInit(): void {
  }

  Edit_Studiengang()
  {
    this.Obj_Studiengang.StudiengangName = this.EditStudiengangForm.get('studiengang').value;
    
    this.Studiengang_Service.Edit_Studiengang(this.Id_Document , this.Obj_Studiengang)
    this.route.navigate(['liststudiengang']);
  }

}
