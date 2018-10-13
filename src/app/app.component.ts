import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ads2relase';
  constructor(){

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
}
