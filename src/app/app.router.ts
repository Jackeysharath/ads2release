import {ModuleWithProviders} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CategoryselComponent} from './categorysel/categorysel.component';
import {CatselectedComponent} from './catselected/catselected.component';
import {DateselComponent} from './datesel/datesel.component';
import {ComposeComponent} from './compose/compose.component';
import {SeltemplateComponent} from './seltemplate/seltemplate.component';
import {SeltemplatetypeComponent} from './seltemplatetype/seltemplatetype.component';
import {BookingsummaryComponent} from './bookingsummary/bookingsummary.component';
import {LoginComponent} from './login/login.component';
import {PrepaymentComponent} from './prepayment/prepayment.component';










export const router:Routes=[
    // {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'',component : HomeComponent},
    {path:'home',component : HomeComponent},
    {path:'category',component : CategoryselComponent},
    {path:'selectedcat',component : CatselectedComponent},
    {path:'date',component : DateselComponent},
    {path:'compose',component : ComposeComponent},
    {path:'seltemplate',component : SeltemplateComponent},
    {path:'seltemplatetype',component : SeltemplatetypeComponent},
    {path:'bookingsummary',component : BookingsummaryComponent},
    {path:'login',component : LoginComponent},
    {path:'pay',component : PrepaymentComponent},
    
    
    
    
    
    
    {path: '**', redirectTo: '/404'}

];
export const routes: ModuleWithProviders=RouterModule.forRoot(router,{ enableTracing: false });