import { EventEmitter, Injectable, Output } from '@angular/core';
import { Student } from 'src/app/modeles/Student';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { getAuth, deleteUser } from "firebase/auth";





import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import ShortUniqueId from 'short-unique-id';

import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  @Output() Changed = new EventEmitter(); 
  
  constructor(private Afstore: AngularFirestore,private router : Router,
    
    private ToastService: ToastrService,) {

  }

  Edit_Student(id, data) {

    this.Afstore.collection("Students").doc(id).update(data).then(() => {
      this.ToastService.success("Students erfolgreicht geandert !!!!!!!!!!")
    })


  }




  // Erstellen einen Neuen Student 
  SignUp(obj: Student) {
    const uid_password = new ShortUniqueId({ length: 10 });
    const uid_matrikule_nummer = new ShortUniqueId({ length: 5 });
    let Neu_User: Student = {

      // Student_Email_Uid : user.user.uid,
      Email: obj.Email,
      Lastname: obj.Lastname,
      Firstname: obj.Firstname,
      Password: uid_password(),
      Studiengang_Id: obj.Studiengang_Id,
      Nummer: obj.Nummer,
      Anschrift: obj.Anschrift,
      Bild: obj.Bild,
      Geschecht: obj.Geschecht,
      StudiengangName : obj.StudiengangName,

      MatrikulNummer: uid_matrikule_nummer(),


    }

    return new Promise(() => {

      firebase.auth().createUserWithEmailAndPassword(Neu_User.Email, Neu_User.Password)
        .then((user) => {


          //res('Success')
         
            this.Afstore.collection("Students").add(Neu_User).then((ref => {



              let Datas = {
                Email: Neu_User.Email,
                Lastname: Neu_User.Lastname,
                Firstname: Neu_User.Firstname,
                Password: Neu_User.Password,
                Studiengang_Id: Neu_User.Studiengang_Id,
                Nummer: Neu_User.Nummer,
                Anschrift: Neu_User.Anschrift,
                Bild: Neu_User.Bild,
                Geschecht: Neu_User.Geschecht,
                MatrikulNummer: Neu_User.MatrikulNummer,
                Student_Id_ref: ref.id,
                Student_Email_uid: user.user.uid,
                StudiengangName : Neu_User.StudiengangName,
  
  
  
              }
              this.Afstore.collection("Students").doc(ref.id).set(Datas).then(() => {
                this.ToastService.success("Student erfolgreich erstellt")


               
              })
         
  
            }))
          
          
       



        });
    })
  }

  // Get all Student von db
  Get_All_Studentent() {
    return this.Afstore.collection("Students")
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

  //Get ein Student 
  Load_OneStudent(id) {
    return this.Afstore.doc(`Students/${id}`).valueChanges();
  }

 
DeleteStudent(Id)
{
  this.Afstore.collection("Students").doc(Id).delete().then(()=>{
   // this.Changed.emit()

   
    this.ToastService.error("Student erfolgreicht gelöscht !!!!!!!!!!!")
  })
}

}
