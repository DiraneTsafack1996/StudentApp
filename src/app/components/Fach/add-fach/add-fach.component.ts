import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fach } from 'src/app/modeles/Fach';
import { FachService } from 'src/app/service/fach.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fach',
  templateUrl: './add-fach.component.html',
  styleUrls: ['./add-fach.component.css']
})
export class AddFachComponent implements OnInit {

  FachForm : FormGroup
  obj_fach : Fach = null;
  constructor(private FachService : FachService , private router : Router,
    private ToastService : ToastrService) {
    
    this.FachForm = new FormGroup({
      fachname: new FormControl('' , [Validators.required, Validators.minLength(3)]),
      
    });
   }


   get fachname_() {
    return this.FachForm.get('fachname');
  }


  ngOnInit(): void {
  }

  Add_Fach()
  {
    this.obj_fach = new Fach()
    
    this.obj_fach.FachName = this.FachForm.get('fachname').value;
    //console.log("Fach ist : " + this.obj_fach.FachName)
    //this.FachService.save(this.obj_fach)

    this.FachService.Fach_Oder_Subject_Verifiezieren(this.obj_fach.FachName).subscribe(data=> {

      if(data.empty)
      {
        this.FachService.save(this.obj_fach)
      }
      else
      {
        this.ToastService.warning ("Dieser Fach " + this.obj_fach.FachName + " Existiert schon in Database")
      }
    })
    this.FachForm.reset()
    this.router.navigate(['listfach']);





  }

}
