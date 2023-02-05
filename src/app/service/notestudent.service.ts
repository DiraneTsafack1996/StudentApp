import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
import { Note } from '../modeles/NoteStudent';

@Injectable({
  providedIn: 'root'
})
export class NotestudentService {

  constructor(private ToastService : ToastrService,         private Afstore :AngularFirestore) { }


//Get all the Studenten entsprechend der Studiengang
Load_all_Studenten_entsprechend_der_Studiengang(StudiengangId)
{
  {
    return this.Afstore.collection("Students", ref=>ref.where("Studiengang_Id","==",StudiengangId))
  .snapshotChanges()
  .pipe(
    map(actions=>
      {
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id
          return {id,data}
        })
      })
  )}

}

SaveStudentenNote(data) {

   return this.Afstore.collection("Notestudents").add(data).then((ref=>{


    let Data : Note = {

       FachId : data.FachId,
       FachName  : data.FachName,
     
       StudiengangId : data.StudiengangId,
       StudiengangName : data.StudiengangName,
       StudentFirstName : data.StudentFirstName,
       StudentEmailuid : data.StudentEmailuid,
       CreditPunkte : data.CreditPunkte,


       Note : data.Note,
       Note_ref : ref.id
      
      }
     this.Afstore.collection("Notestudents").doc(ref.id).set(Data).then(()=> {

      this.ToastService.success("Note erfolgreich hinzugefugt !!!!!!!!!!!!!!!!!!!!!!!!")
     })
   }))

}


  // Get all the Course oder der Facher entsprechend der Studiengang
  Load_all_Module_entsprechend_der_Facher(StudiengangId)
  {
    {
      return this.Afstore.collection("ModulStudiengangs", ref=>ref.where("StudiengangId","==",StudiengangId))
    .snapshotChanges()
    .pipe(
      map(actions=>
        {
          return actions.map(a=>{

            const data = a.payload.doc.data();
            const id = a.payload.doc.id
            return {id,data}
          })
        })
    )}

  }



  // Retrieve All StudentenNoteListes
  Get_All_Note_Studenten() {
    return this.Afstore.collection("Notestudents")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {

            const data = a.payload.doc.data();
            const id = a.payload.doc.id
            return { id, data }
          })
        })
      )

  }

  // Load der StudiengangName entsprechend der Id
  Load_StudiengangName_entsprechend_Id(Id) {
    {

      return this.Afstore.collection('Studiengangs', ref => ref.where('Studiengang_Id_ref', '==', Id))
        .snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(a => {

              const data = a.payload.doc.data();
              const id = a.payload.doc.id
              return { id, data }
            })
          })
        )
    }





  }


  // ---------------- delete 
  DeleteNoteStudent(id)
  {
    this.Afstore.collection("Notestudents").doc(id).delete().then(()=>{
   
      this.ToastService.error("Notestudents erfolgreicht gelöscht !!!!!!!!!!!")
    })
  }



  // Retrieve the Notes of Studenten
  
Load_Note(StudentEmailuid)
{
  {
    //StudiengangId
    //StudentEmailId
    return this.Afstore.collection('Notestudents', ref=>ref.where('StudentEmailuid' , '==',StudentEmailuid))
  .snapshotChanges()
  .pipe(
    map(actions=>
      {
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id
          return {id,data}
        })
      })
  )}

}


  
}
