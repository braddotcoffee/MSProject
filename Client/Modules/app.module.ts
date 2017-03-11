import { NgModule              }  from  '@angular/core';
import { BrowserModule         }  from  '@angular/platform-browser';
import { FormsModule           }  from  '@angular/forms';
import { RouterModule          }  from  '@angular/router';
import { HttpModule            }  from  '@angular/http';

import { AppRoutingModule      }  from  './app-routing.module';

import { AppComponent          }  from  '../Components/app.component';
import { HomeComponent         }  from  '../Components/home.component';
import { LoginComponent        }  from  '../Components/login.component';
import { DashboardComponent    }  from  '../Components/dashboard.component';
import { PersonComponent       }  from  '../Components/person.component';
import { ScheduleComponent     }  from  '../Components/schedule.component';
import { ProfileComponent      }  from  '../Components/profile.component';
import { SearchComponent       }  from  '../Components/search.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],

  declarations: [
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PersonComponent,
    ScheduleComponent,
    ProfileComponent,
    SearchComponent,
    AppComponent
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule {  }
