import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ToastrService } from 'ngx-toastr';
import { Studiengang } from '../modeles/Studiengang';

@Injectable({
  providedIn: 'root'
})
export class StudiengangService {

  constructor(private Afstore : AngularFirestore , private ToastService : ToastrService) { }
  @Output() Changed = new EventEmitter();



// SAve a Studiengang in Firestore db
  Save_A_Studiengang(obj: Studiengang) {
    let Data = {

      StudiengangName: obj.StudiengangName,
      
    }
     this.Afstore.collection("Studiengangs").add(Data).then((refdoc => {
        obj.Studiengang_Id_ref = refdoc.id

        let Datas =  {
          Studiengang_Id_ref : refdoc.id,
          StudiengangName: Data.StudiengangName,
        
        }
        this.Afstore.collection("Studiengangs").doc(refdoc.id).set(Datas).then(() =>

        {
          this.ToastService.success("Studiengangs erfolgreicht hinzugefugt !!!!!!!!!! ")
        }
         
        )
       this.Changed.emit(); 
      }))

  }
//---------------------------------  Get All Studiengange
Get_All_Studiengang()
{

  return new Promise<Studiengang[]>(resolve => {
    this.Afstore.collection("Studiengangs").get().subscribe(function(snapshot) {
      let obj_studiengang : Studiengang [] = [];

      snapshot.forEach(function(doc) {

        let data = doc.data();

        let obj = new Studiengang()

        obj.StudiengangName = data["StudiengangName"]
        
        obj.Studiengang_Id_ref = doc.id

        obj_studiengang.push(obj)

      })

      resolve(obj_studiengang)

    })
  })
  




}



//----------------------------------------------------- Studiengang Verifierizieren
Studiengang_Verifiezieren(StudiengangName)
  {
  return this.Afstore.collection("Studiengangs" , ref => ref.where('StudiengangName', '==', StudiengangName )). get()
  }


  //------------------------------------------------------- Retrieve One Studiengang
  Retrieve_Studiengang(id:string)
  {
    return new Promise<Studiengang>(resolve=> {
      this.Afstore.collection("Studiengangs").doc(id).get().subscribe(function(doc) {
        let data = doc.data();
        let obj = new Studiengang()
  
        obj.StudiengangName = data["StudiengangName"]
        obj.Studiengang_Id_ref = doc.id

        resolve(obj)
  
      })
    })
  

  }

    //------------------------------------------------------------------------- Edit one Fach
    Edit_Studiengang(id, obj:Studiengang)
    {
      let data = {
  
        StudiengangName: obj.StudiengangName,
        Studiengang_Id_ref : id
      }
  
   this.Afstore.collection("Studiengangs").doc(id).set(data).then(()=> {
    this.ToastService.success("Studiengangs erfolgreicht geandert !!!!!!!!!!")
  })
  
  
    }
  
    // Delete ein Studiengang 
  
    
    DeleteStudiengang(id)
    {
      this.Afstore.collection("Studiengangs").doc(id).delete().then(()=>{
        this.Changed.emit()
        this.ToastService.error("Studiengangs erfolgreicht gelöscht !!!!!!!!!!!")
      })
    }











}
