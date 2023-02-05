import { Component, OnInit } from '@angular/core';
import { Studiengang } from 'src/app/modeles/Studiengang';
import { StudiengangService } from 'src/app/service/studiengang.service';

@Component({
  selector: 'app-list-studiengang',
  templateUrl: './list-studiengang.component.html',
  styleUrls: ['./list-studiengang.component.css']
})
export class ListStudiengangComponent implements OnInit {

  obj_Studiengang :  Studiengang [] = []
  constructor(private Studiengang_Service : StudiengangService) {

    this.Load_all_Studiengangen()
    this.Studiengang_Service.Changed.subscribe(()=> {
      this.Load_all_Studiengangen()
    })
   }

  ngOnInit(): void {
  }
  Load_all_Studiengangen()
  {
    this.Studiengang_Service.Get_All_Studiengang().then(( data=> {

      this.obj_Studiengang = data
    }))
  }

  DeleteStudiengang(Id)
  {
  this.Studiengang_Service.DeleteStudiengang(Id)
  }
}
