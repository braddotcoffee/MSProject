import { NgModule             }  from  '@angular/core'
import { RouterModule, Routes }  from  '@angular/router'

import { HomeComponent        }  from  '../Components/home.component';
import { LoginComponent       }  from  '../Components/login.component';
import { DashboardComponent   }  from  '../Components/dashboard.component';
import { ProfileComponent     }  from  '../Components/profile.component';
import { CourseComponent      }  from  '../Components/course.component';

const routes = [
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'profile/:email',
    component: ProfileComponent
  },

  {
    path: 'course/:cCode',
    component: CourseComponent
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

