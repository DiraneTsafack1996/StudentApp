import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddFachComponent } from './components/Fach/add-fach/add-fach.component';
import { EditFachComponent } from './components/Fach/edit-fach/edit-fach.component';
import { FachListComponent } from './components/Fach/fach-list/fach-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FachService } from './service/fach.service';
import { AddStudiengangComponent } from './components/Studiengang/add-studiengang/add-studiengang.component';
import { EditStudiengangComponent } from './components/Studiengang/edit-studiengang/edit-studiengang.component';
import { ListStudiengangComponent } from './components/Studiengang/list-studiengang/list-studiengang.component';
import { AddStudentComponent } from './components/Student/add-student/add-student.component';
import { EditStudentComponent } from './components/Student/edit-student/edit-student.component';
import { ListStudentComponent } from './components/Student/list-student/list-student.component';
import { ViewStudentComponent } from './components/Student/view-student/view-student.component';
import { AddModuleStudiengangComponent } from './components/module-studiengang/add-module-studiengang/add-module-studiengang.component';
import { ListModuleStudiengangComponent } from './components/module-studiengang/list-module-studiengang/list-module-studiengang.component';
import { AddnotestudentComponent } from './components/management/addnotestudent/addnotestudent.component';
import { ListnotestudentComponent } from './components/management/listnotestudent/listnotestudent.component';
import { LoginComponent } from './components/login/login.component';
import { UbersichtComponent } from './components/management/ubersicht/ubersicht.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MyGuard } from './modeles/guard';
import { StudiengangService } from './service/studiengang.service';
import { AuthService } from './service/auth.service';
import { ModulStudiengangService } from './service/modul-studiengang.service';
import { NotestudentService } from './service/notestudent.service';
import { StudentService } from './service/student.service';
import { ViewNoteOneStudentComponent } from './components/view-note-one-student/view-note-one-student.component';







const firebase_Configuration = {

  apiKey: "AIzaSyAA5KIdx23EMHKRMjnAY0jn_3M_zub3jVU",

  authDomain: "ecommerceapp-72b2c.firebaseapp.com",

  databaseURL: "https://ecommerceapp-72b2c-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "ecommerceapp-72b2c",

  storageBucket: "ecommerceapp-72b2c.appspot.com",

  messagingSenderId: "273844664999",

  appId: "1:273844664999:web:87a972b1d30c367f57b982"




};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddFachComponent,
    EditFachComponent,
    FachListComponent,
    AddStudiengangComponent,
    EditStudiengangComponent,
    ListStudiengangComponent,
    AddStudentComponent,
    EditStudentComponent,
    ListStudentComponent,
    ViewStudentComponent,
    AddModuleStudiengangComponent,
    ListModuleStudiengangComponent,
    AddnotestudentComponent,
    ListnotestudentComponent,
    LoginComponent,
    UbersichtComponent,
    PagenotfoundComponent,
    ViewNoteOneStudentComponent,
   


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    
    AngularFireModule.initializeApp(firebase_Configuration)
  ],
  providers: [AuthService,
              FachService,
              MyGuard,
              StudiengangService,
              ModulStudiengangService,
              NotestudentService,
              StudentService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
