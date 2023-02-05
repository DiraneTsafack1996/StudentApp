import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/service/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private Authservice : AuthService, private AngularAuth : AngularFireAuth, 
    private router :Router, private Toast : ToastrService) { }

  //message : string ="Hello Dirane"
  isAuth : boolean
  est_admin : boolean
  isAdminSub: Subscription;
  isAdmin: BehaviorSubject<boolean>;


  ngOnInit(): void {
        firebase.auth().onAuthStateChanged(
      (user) => {
         if(user) {
           this.isAuth = true
           this.email = user.email
          } 
         else {
           this.isAuth = false;
           
        
          
        
         }
       }
      );
    
     // this.AngularAuth.authState.subscribe(user =>console.log("info_user sind :" + user.email))




      this.isAdminSub = this.Authservice.isAdmin.subscribe((isAdmin:boolean)=>this.est_admin = isAdmin)
      this.Authservice.isCurrentUserAdmin();
  }
  email : string


  onclicklogout()
  {
    this.Authservice.signOutUser();
    
   // this.router.navigate(['pagenotfound']);
    //this.router.navigate(['login']);
  }



}
