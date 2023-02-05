import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotestudentService } from 'src/app/service/notestudent.service';
import { AuthService } from 'src/app/service/auth.service';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-ubersicht',
  templateUrl: './ubersicht.component.html',
  styleUrls: ['./ubersicht.component.css']
})
export class UbersichtComponent implements OnInit {

  constructor(private Afauth:AngularFireAuth,private router : Router,
    private NoteService : NotestudentService , 
    private Authservice:AuthService) {
      this.Afauth.authState.subscribe(user => {
        // console.log("EmailUseruid  : " + user.uid)
   
        if(user)
        {
          this.NoteService.Load_Note(user.uid).subscribe((data => {
            //   console.log(data.length)
       
               this.note = data
       
               for(let item of data)
               {
                 this.StudentName = item.data['StudentFirstName']
                 this.StudiengangName = item.data['StudiengangName']
               }
           
       
              // console.log(this.StudentName)
       
             }))
        }
        else
        {
          this.router.navigate(['login']);
          
        }
       
      })
     }

  note : any
  StudentName : any
  StudiengangName : any
  ngOnInit(): void {

    
   //----------------------------------
   
  }

}
