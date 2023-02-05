import { Injectable } from '@angular/core';
import { EventEmitter,  Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { ToastrService } from 'ngx-toastr';
import { StudiengangModule } from '../modeles/StudiengangModule';
import { from, map, Observable } from 'rxjs';
import * as firebase from 'firebase/compat';




@Injectable({
  providedIn: 'root'
})
export class ModulStudiengangService {

  constructor(private Afstore : AngularFirestore , private ToastService : ToastrService) {
   // this.modulStudiengangsCollection = Afstore.collection<StudiengangModule>('ModulStudiengangs');
   }
  @Output() Changed = new EventEmitter();


  SaveModuleStudiengang(obj: StudiengangModule) {
    let Data = {

      StudiengangName: obj.StudiengangName,
      StudiengangId : obj.StudiengangId,
      FachId :  obj.FachId,
      FachName : obj.FachName,
      CreditPunkte : obj.CreditPunkte
      
    }
     this.Afstore.collection("ModulStudiengangs").add(Data).then((refdoc => {
        obj.StudiengangModule_ref_id = refdoc.id

        let Datas =  {
          Studiengang_Id_ref : refdoc.id,
          StudiengangName: Data.StudiengangName,
          StudiengangId : Data.StudiengangId,
          FachId :  Data.FachId,
          FachNAme : Data.FachName,
          CreditPunkte : Data.CreditPunkte

        
        }


        this.Afstore.collection("ModulStudiengangs").
        doc(refdoc.id).
        set(Datas).
        then(()=>{
          {
            this.ToastService.success("ModulStudiengangs erfolgreicht hinzugefugt !!!!!!!!!! ")
          }
        })

        


       this.Changed.emit(); 
      }))

  }

  //---------------------------------------------------------- Get All ModulStudiengangen
  Get_All_Studiengange()
  {

    return new Promise<StudiengangModule[]>(resolve => {
      this.Afstore.collection("ModulStudiengangs").get().subscribe(function(snapshot) {
        let obj_modul_studiengang : StudiengangModule [] = [];

        snapshot.forEach(function(doc) {

          let data = doc.data();

          let obj = new StudiengangModule()

          obj.FachName = data["FachNAme"]
          obj.CreditPunkte = data["CreditPunkte"]
           obj.StudiengangName = data["StudiengangName"]
           obj.StudiengangModule_ref_id = doc.id

           obj_modul_studiengang.push(obj)

        })

        resolve(obj_modul_studiengang)

      })
    })
    




  }


    DeleteModuleStudiengang(id)
  {
    this.Afstore.collection("ModulStudiengangs").doc(id).delete().then(()=>{
      this.Changed.emit()
      this.ToastService.error("ModulStudiengangs erfolgreicht gelöscht !!!!!!!!!!!")
    })
  }





  


  

























  PrufIf(StudiengangId, FachId , CreditPunkte)
  {





  return this.Afstore.collection("ModulStudiengangs")
  .ref.where('StudiengangId', '==', StudiengangId ).
      where('FachId','==',FachId).
      where('CreditPunkte','==',CreditPunkte).get()
  }

  





  //  async PrufIfdieseModulstudiengangexstierts(StudiengangId, FachId, CreditPunkte , obj:StudiengangModule) {
  //   const snapshot = await this.Afstore.collection("ModulStudiengangs")
  //     .ref.where('StudiengangId', '==', StudiengangId )
  //     .where('FachId','==',FachId)
  //     .where('CreditPunkte','==',CreditPunkte)
  //     .get();
    
  //   if (snapshot.empty) {
  //     // No documents with the specified values were found, so you can add a new document
  //     let Data = {

  //       StudiengangName: obj.StudiengangName,
  //       StudiengangId : obj.StudiengangId,
  //       FachId :  obj.FachId,
  //       FachName : obj.FachName,
  //       CreditPunkte : obj.CreditPunkte
        
  //     }
  //      this.Afstore.collection("ModulStudiengangs").add(Data).then((refdoc => {
  //         obj.StudiengangModule_ref_id = refdoc.id
  
  //         let Datas =  {
  //           Studiengang_Id_ref : refdoc.id,
  //           StudiengangName: Data.StudiengangName,
  //           StudiengangId : Data.StudiengangId,
  //           FachId :  Data.FachId,
  //           FachNAme : Data.FachName
  
          
  //         }
  //         this.Afstore.collection("ModulStudiengangs").doc(refdoc.id).set(Datas).then(() =>
  
  //         {
  //           this.ToastService.success("ModulStudiengangs erfolgreicht hinzugefugt !!!!!!!!!! ")
  //         }
           
  //         )
  //        this.Changed.emit(); 
  //       }))
  //   } else {
  //     // A document with the specified values was found, so you can choose to update the existing document or prevent the new document from being added
  //   }
  // }

}
  

