import { Component, OnInit } from '@angular/core';
import { StudiengangModule } from 'src/app/modeles/StudiengangModule';
import { ModulStudiengangService } from 'src/app/service/modul-studiengang.service';

@Component({
  selector: 'app-list-module-studiengang',
  templateUrl: './list-module-studiengang.component.html',
  styleUrls: ['./list-module-studiengang.component.css']
})
export class ListModuleStudiengangComponent implements OnInit {

  constructor(private modulestudiengang : ModulStudiengangService) {

    this.Load_all_ModuleStudiengange()
    this.modulestudiengang.Changed.subscribe(()=> {
      this.Load_all_ModuleStudiengange()
    })
   }

  ngOnInit(): void {
  }
  
  ModulStudiengang : StudiengangModule [] = []





                                             Load_all_ModuleStudiengange()
  {
    this.modulestudiengang.Get_All_Studiengange().then(( data=> {

      this.ModulStudiengang = data
    }))
  }


  DeleteModulStudiengang(Id)
  {
   // console.log("ID_Document_rEFERENCE : " + Id)
   this.modulestudiengang.DeleteModuleStudiengang(Id)
  }

}
