import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './common/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ads2relase';
  foopapers: any[];
  foocategories: any[];
  fooeditions: any[];
  foolanguages: any[];
  constructor(private route:Router,private _api:ApiService){
    this.footerContent();
  }
  footerContent(){
    this.getFooNewsPapers();
    this.getFooCategories();
    this.getFooEditions();
    this.getFooLanguages();
  } 
   setLocalStorage(key:string,value){
    if(typeof value !=="string"){
      value=JSON.stringify(value);
    }
    localStorage.setItem(key,value);
  }
  getLocalStorage(key:string){
    if(localStorage.getItem(key)!==null){
      
      return JSON.parse(localStorage.getItem(key));
      
      
    }else{
      return "";
    }
    
  }
  getFooNewsPapers(){
    this._api.POST('getPopPapers', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.foopapers=dt.data;
        
      }else{
        this.foopapers=[];
      }

    });
  }
  getFooCategories(){
    this._api.POST('getPopCategories', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.foocategories=dt.data;
        
      }else{
        this.foocategories=[];
      }

    });
  }
  getFooEditions(){
    this._api.POST('getPopEditions', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.fooeditions=dt.data;
        
      }else{
        this.fooeditions=[];
      }

    });
  }
  getFooLanguages(){
    this._api.POST('getPopLanguages', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.foolanguages=dt.data;
        
      }else{
        this.foolanguages=[];
      }

    });
  }
}
