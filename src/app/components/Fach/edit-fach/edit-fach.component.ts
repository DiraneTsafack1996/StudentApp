import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fach } from 'src/app/modeles/Fach';
import { FachService } from 'src/app/service/fach.service';

@Component({
  selector: 'app-edit-fach',
  templateUrl: './edit-fach.component.html',
  styleUrls: ['./edit-fach.component.css']
})
export class EditFachComponent implements OnInit {
  EditFachForm : FormGroup
  Id_Document : any 
  ObjFach : Fach = null;
  constructor(private FachService : FachService,  private route : Router,  
    private ActivatedRouted : ActivatedRoute) {


    this.Id_Document = this.ActivatedRouted.snapshot.params["id"]
   //console.log("Id von meines Fachs " + this.Id_Document)




    this.EditFachForm = new FormGroup({

      fachname: new FormControl('' , [Validators.required, Validators.minLength(3)]),
      
    });


    this.FachService.Retrieve_Ein_Fach(this.Id_Document).then((data=> {
      this.ObjFach = data
      this.EditFachForm.setValue({

        
        'fachname' :this.ObjFach.FachName,
        

      })
    }))
   }








  ngOnInit(): void {
  }

  
 get fachname_() {
    return this.EditFachForm.get('fachname');
  }


  Edit_Fach()
  {
    this.ObjFach.FachName = this.EditFachForm.get('fachname').value;
   // console.log("Edit Fach ist :  " + this.ObjFach.FachName)
   this.FachService.Edit_eines_Fach(this.Id_Document , this.ObjFach)
   this.route.navigate(['listfach']);

  }
}
