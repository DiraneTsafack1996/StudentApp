import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import ShortUniqueId from 'short-unique-id';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //token : BehaviorSubject<string>;
  user_actuel : any;
  isAdmin: BehaviorSubject<boolean>;

  constructor(private Afstore : AngularFirestore , 
    private Auth : AngularFireAuth , private router :Router,
    private ToastService:ToastrService,) {
    this.isAdmin = new BehaviorSubject<boolean>(false);
   }



   //---------------------------------------------------------- Sign In 
   signin(email : string ,password:string)
   {
     return new Promise ((res,rej)=>{
       firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
         res("Sucess")
          //this.router.navigate(["fach"]);
          this.router.navigate (['übersicht']);
       }) .catch((err) => {
 
         if (err.code === 'auth/invalid-email') {
             rej("L'adresse email est invalide.");
         }
 
         if (err.code === 'auth/user-disabled') {
             rej("Der Benutzer wurde gesperrt.");
         }
 
         if (err.code === 'auth/user-not-found') {
             rej("Der Benutzer existiert nicht.");
         }
 
         if (err.code === 'auth/wrong-password') {
             rej("Das Passwort ist inkorrect.");
         }
 
         rej("Fehler Auftreten");
     });
     })
   }

     //----------------------------------------------- Abmelden / SignOut
signOutUser() {
  this.Auth.signOut();
  this.router.navigate(['login']);


  
}








// Is
isCurrentUserAdmin() {
  if (this.user_actuel) {
      ['diraneserges@gmail.com'].includes(this.user_actuel.email) ? this.isAdmin.next(true) : this.isAdmin.next(false);
  } else {
      this.Auth
          .user
          .subscribe(user => {
              if (user) {
                  this.user_actuel = user;
                  ['diraneserges@gmail.com'].includes(user.email) ? this.isAdmin.next(true) : this.isAdmin.next(false);
              } else {
                  this.isAdmin.next(false);
              }
          });
  }
}















}
