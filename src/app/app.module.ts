import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryselComponent } from './categorysel/categorysel.component';
import { CatselectedComponent } from './catselected/catselected.component';
import { DateselComponent } from './datesel/datesel.component';
import { ComposeComponent } from './compose/compose.component';
import { SeltemplateComponent } from './seltemplate/seltemplate.component';
import { SeltemplatetypeComponent } from './seltemplatetype/seltemplatetype.component';
import { BookingsummaryComponent } from './bookingsummary/bookingsummary.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { PrepaymentComponent } from './prepayment/prepayment.component';
import { ApiService } from './common/api.service';
import { Http } from '@angular/http';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryselComponent,
    CatselectedComponent,
    DateselComponent,
    ComposeComponent,
    SeltemplateComponent,
    SeltemplatetypeComponent,
    BookingsummaryComponent,
    UserComponent,
    LoginComponent,
    PrepaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routes
  ],
  providers: [ApiService,HttpModule,HomeComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
