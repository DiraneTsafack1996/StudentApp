import { Component, OnInit } from '@angular/core';
import { Fach } from 'src/app/modeles/Fach';
import { FachService } from 'src/app/service/fach.service';

@Component({
  selector: 'app-fach-list',
  templateUrl: './fach-list.component.html',
  styleUrls: ['./fach-list.component.css']
})
export class FachListComponent implements OnInit {

  obj_Fach : Fach [] = []
  constructor(private Fachservice : FachService) { 

    this.Load_all_Subjects()
    this.Fachservice.Changed.subscribe(()=> {
      this.Load_all_Subjects()
    })
  }

  ngOnInit(): void {
  }



  Load_all_Subjects()
  {
    this.Fachservice.Get_All_Fach().then(( data=> {

      this.obj_Fach = data
    }))
  }

  DeleteFach(id)
  {
    this.Fachservice.Deletefach(id)
  }

}
