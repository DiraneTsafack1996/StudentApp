import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFachComponent } from './components/Fach/add-fach/add-fach.component';
import { EditFachComponent } from './components/Fach/edit-fach/edit-fach.component';
import { FachListComponent } from './components/Fach/fach-list/fach-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddnotestudentComponent } from './components/management/addnotestudent/addnotestudent.component';
import { ListnotestudentComponent } from './components/management/listnotestudent/listnotestudent.component';
import { UbersichtComponent } from './components/management/ubersicht/ubersicht.component';
import { map } from 'rxjs/operators';
import { AddModuleStudiengangComponent } from './components/module-studiengang/add-module-studiengang/add-module-studiengang.component';
import { ListModuleStudiengangComponent } from './components/module-studiengang/list-module-studiengang/list-module-studiengang.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AddStudentComponent } from './components/Student/add-student/add-student.component';
import { EditStudentComponent } from './components/Student/edit-student/edit-student.component';
import { ListStudentComponent } from './components/Student/list-student/list-student.component';
import { ViewStudentComponent } from './components/Student/view-student/view-student.component';
import { AddStudiengangComponent } from './components/Studiengang/add-studiengang/add-studiengang.component';
import { EditStudiengangComponent } from './components/Studiengang/edit-studiengang/edit-studiengang.component';
import { ListStudiengangComponent } from './components/Studiengang/list-studiengang/list-studiengang.component';
import { MyGuard } from './modeles/guard';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ViewNoteOneStudentComponent } from './components/view-note-one-student/view-note-one-student.component';


const redirectodash = () => redirectLoggedInTo(['übersicht']);



const redirectUnauthorizedOrNotAdminToDash = () =>
    map((user: any) => {
        if (!user) {
            return ['login'];
        } else if (['diraneserges@gmail.com'].includes(user.email)) {
             return true;
           
        }
        return ['übersicht'];
        
    });
    const redirectunthorizedtologin = () => redirectUnauthorizedTo(['login']);








const routes: Routes = [

  //--------------------------------------------------------- Fach
  {path:'addfach' , component:AddFachComponent,canActivate: // marque creer
  [AngularFireAuthGuard],
  data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}},
  {
    path:'listfach' ,component:FachListComponent ,canActivate:[AngularFireAuthGuard]
    
  },
  {
    path:'listfach/:id' ,component:EditFachComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },

  //---------------------------------------------------------- Studiengang
  {
    path:'addstudiengang' ,component:AddStudiengangComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },
  {
    path:'liststudiengang' ,component:ListStudiengangComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },
  {
    path:'liststudiengang/:id' ,component:EditStudiengangComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },

  //-------------------------------------------------------------------- Student
  {
    path:'addstudent' ,component:AddStudentComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },
  {
    path:'liststudent' ,component:ListStudentComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },
  {
    path:'liststudent/view' ,component:ViewStudentComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },
  {
    path:'liststudent/Editer' ,component:EditStudentComponent ,canActivate:[AngularFireAuthGuard]
    ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
  },


 // --------------------------------------------------------------------- ModuleStudiengang
 {
  path:'addmodulestudiengang' ,component:AddModuleStudiengangComponent ,canActivate:[MyGuard]
  ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
},
{
  path:'listmodulestudiengang' ,component:ListModuleStudiengangComponent ,canActivate:[MyGuard]
  ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
},


//-------------------------------------------------- Management 

{
  path:'addnote' ,component:AddnotestudentComponent ,canActivate:[AngularFireAuthGuard]
  ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
},

{
  path:'viewnote' ,component:ViewNoteOneStudentComponent ,canActivate:[AngularFireAuthGuard]
  ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
},
{
  path:'listenote' ,component:ListnotestudentComponent ,canActivate:[AngularFireAuthGuard]
  ,data:{authGuardPipe:redirectUnauthorizedOrNotAdminToDash}
},

//------------------------------------------------------------ LOgin
{
  path:'login' ,
  component:LoginComponent,
  canActivate:[AngularFireAuthGuard],
  data:{authGuardPipe:redirectodash}
},
{
  path:'übersicht' ,component:UbersichtComponent ,canActivate:[AngularFireAuthGuard]
  ,data:{authGuardPipe:redirectunthorizedtologin}
},
{path:'' , redirectTo:'login', pathMatch:'full'},
{path:'pagenotfound' , component:PagenotfoundComponent},
{path:'**' , component:PagenotfoundComponent},












  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
