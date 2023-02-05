import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Fach } from '../modeles/Fach';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FachService {

  constructor(private Afstore : AngularFirestore , private ToastService : ToastrService) { }
  @Output() Changed = new EventEmitter();


  // Save the Subject in Db

  save(obj: Fach) {
    let Data = {

      FachName: obj.FachName,
      
    }
     this.Afstore.collection("Fachs").add(Data).then((refdoc => {
        obj.Fach_Id_ref = refdoc.id

        let Datas =  {
          Fach_Id_Ref : refdoc.id,
          FachName: Data.FachName,
        
        }
        this.Afstore.collection("Fachs").doc(refdoc.id).set(Datas).then(() =>

        {
          this.ToastService.success("Fach erfolgreicht hinzugefugt !!!!!!!!!! ")
        }
         
        )
       this.Changed.emit(); 
      }))

  }



  //---------------------------------  Get All Subjects
  Get_All_Fach()
  {

    return new Promise<Fach[]>(resolve => {
      this.Afstore.collection("Fachs").get().subscribe(function(snapshot) {
        let obj_Fach : Fach [] = [];

        snapshot.forEach(function(doc) {

          let data = doc.data();

          let obj = new Fach()

          obj.FachName = data["FachName"]
          
          obj.Fach_Id_ref = doc.id

          obj_Fach.push(obj)

        })

        resolve(obj_Fach)

      })
    })
    




  }


  Fach_Oder_Subject_Verifiezieren(FachName)
  {
  return this.Afstore.collection("Fachs" , ref => ref.where('FachName', '==', FachName )). get()
  }

  //---------------------------------------- Retrieve data von eines Fach oder Subjects
  Retrieve_Ein_Fach(id:string)
  {
    return new Promise<Fach>(resolve=> {
      this.Afstore.collection("Fachs").doc(id).get().subscribe(function(doc) {
        let data = doc.data();
        let obj = new Fach()
  
        obj.FachName = data["FachName"]
        obj.Fach_Id_ref = doc.id

        resolve(obj)
  
      })
    })
  

  }


  //------------------------------------------------------------------------- Edit one Fach
  Edit_eines_Fach(id, obj:Fach)
  {
    let data = {

      FachName: obj.FachName,
      Fach_Id_ref : id
    }

 this.Afstore.collection("Fachs").doc(id).set(data).then(()=> {
  this.ToastService.success("Fach erfolgreicht geandert !!!!!!!!!!")
})


  }

  // Delete ein Fach oder ein Subject

  
  Deletefach(id)
  {
    this.Afstore.collection("Fachs").doc(id).delete().then(()=>{
      this.Changed.emit()
      this.ToastService.error("Fach erfolgreicht gelöscht !!!!!!!!!!!")
    })
  }

  
}
