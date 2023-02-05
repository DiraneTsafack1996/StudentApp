import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { StudiengangService } from 'src/app/service/studiengang.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-studiengang',
  templateUrl: './add-studiengang.component.html',
  styleUrls: ['./add-studiengang.component.css']
})
export class AddStudiengangComponent implements OnInit {

  StudiengangForm : FormGroup
  obj_studiengang : Studiengang = null;

  constructor(private ToastService : ToastrService, private router : Router,
    private Studiengang_Service : StudiengangService) {
    this.StudiengangForm = new FormGroup({
      studiengang: new FormControl('' , [Validators.required, Validators.minLength(3)]),
      
    });
   }
   
 
  ngOnInit(): void {
  }



  get studiengang_() {
    return this.StudiengangForm.get('studiengang');
  }



  Add_Studiengang()
  {
    this.obj_studiengang = new Studiengang()
    
    this.obj_studiengang.StudiengangName = this.StudiengangForm.get('studiengang').value;
    this.Studiengang_Service.Studiengang_Verifiezieren(this.obj_studiengang.StudiengangName ).subscribe(data=> {

      if(data.empty)
      {
        this.Studiengang_Service.Save_A_Studiengang(this.obj_studiengang)
      }
      else
      {
        this.ToastService.warning ("Dieser Studiengang " + this.obj_studiengang.StudiengangName + " Existiert schon in Database")
      }
    })
    this.StudiengangForm.reset()
    this.router.navigate(['liststudiengang']);

  }

}

