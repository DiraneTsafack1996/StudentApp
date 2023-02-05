import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fach } from 'src/app/modeles/Fach';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { FachService } from 'src/app/service/fach.service';
import { StudiengangService } from 'src/app/service/studiengang.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ToastrService } from 'ngx-toastr';
import { StudiengangModule } from 'src/app/modeles/StudiengangModule';
import { ModulStudiengangService } from 'src/app/service/modul-studiengang.service';
import { Router } from '@angular/router';
import { Console } from 'console';



@Component({
  selector: 'app-add-module-studiengang',
  templateUrl: './add-module-studiengang.component.html',
  styleUrls: ['./add-module-studiengang.component.css']
})
export class AddModuleStudiengangComponent implements OnInit {

  ModuleStudiengang: any
  Studiengang: Studiengang[] = []
  AddModuleStudiengangForm: FormGroup
  Fach: Fach[] = []


  MinimumNumber = 1
  MaximumNumber = 4
  constructor(private Fachservice: FachService, private Toast: ToastrService,private route :Router,
    private ModulStudiengangeService: ModulStudiengangService,
    private studiengangService: StudiengangService) {


    this.Load_all_Subjects()
    this.Fachservice.Changed.subscribe(() => {
      this.Load_all_Subjects()
    })

    //Load all Studiengangen
    this.Load_all_Studiengangen()
    this.studiengangService.Changed.subscribe(() => {
      this.Load_all_Studiengangen()
    })




    // Initialisieren meinerm Formular
    this.AddModuleStudiengangForm = new FormGroup({
      creditpunkte: new FormControl('', [Validators.required, Validators.min(this.MinimumNumber), Validators.max(this.MaximumNumber)]),
      fach: new FormControl('', [Validators.required]),
      studiengang: new FormControl('', [Validators.required]),

    });
  }


  Load_all_Subjects() {
    this.Fachservice.Get_All_Fach().then((data => {

      this.Fach = data
    }))
  }

  Load_all_Studiengangen() {
    this.studiengangService.Get_All_Studiengang().then((data => {

      this.Studiengang = data
    }))
  }







  get creditpunkte_() {
    return this.AddModuleStudiengangForm.get('creditpunkte');
  }

  get studiengang_() {
    return this.AddModuleStudiengangForm.get('studiengang');
  }


  get fach_() {
    return this.AddModuleStudiengangForm.get('fach');
  }









  ngOnInit(): void {
  }










   StudiengangName : any
 
   Add_einen_ModulStudiengang() {

    let Splitted_Fach = this.AddModuleStudiengangForm.value.fach.split('-');
    let Splitted_Studiengang = this.AddModuleStudiengangForm.value.studiengang.split('-');


    let Data: StudiengangModule = {

      CreditPunkte: this.AddModuleStudiengangForm.value.creditpunkte,
      StudiengangId: Splitted_Studiengang[0],
      StudiengangName: Splitted_Studiengang[1],

      FachId: Splitted_Fach[0],
      FachName: Splitted_Fach[1],
    }

    console.log(Data)

    this.ModulStudiengangeService.
      PrufIf(Splitted_Studiengang[0], Splitted_Fach[0], Data.CreditPunkte).
      then(data => {
        if (data.empty) {

          this.ModulStudiengangeService.SaveModuleStudiengang(Data)
        }

        else {
          this.Toast.success("Dieser Modulstudiengang mit Creditpunkte existiert in Firestore")
        }

      })
      this.AddModuleStudiengangForm.reset()
      this.route.navigate(['listmodulestudiengang']);




  }

}
