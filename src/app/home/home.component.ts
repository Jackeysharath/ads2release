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
    this.getPaperTypes();
  }
  rearrangedesc(data:any){
    let arr=data.split("*");
    if(arr.length>0){
      return arr;
    }else{
      return data;
    }
 
  }
  getPaperTypes(){
    this._api.POST('getPaperTypes', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.paperTypes=dt.data;
        let i=0;
        this.paperTypes.forEach(element => {
          this.paperTypes[i].desc=this.rearrangedesc(element.type_description);
i++;
        });
      }else{
        this.paperTypes=[];
      }

    });

  }
  selType(id,act=1){
    this.app.setLocalStorage("type_id",id);
    if(act==1)
    this.getType();
  }
  getType(){
    this.route.navigate(['./category']);
  }

}
