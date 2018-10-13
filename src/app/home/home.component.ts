import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../common/api.service";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paperTypes: any;

  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

  ngOnInit() {
  }
  getPaperTypes(){
    this._api.POST('getPaperTypes', {}).subscribe(data =>{
      this.paperTypes=data.paper;
    });

  }
  selType(id){
    this.app.setLocalStorage("type_id",id);
    this.getType();
  }
  getType(){
    this.route.navigate(['./category']);
  }

}
