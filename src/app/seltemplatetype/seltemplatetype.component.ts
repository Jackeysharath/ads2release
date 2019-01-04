import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiService } from "src/app/common/api.service";

@Component({
  selector: 'app-seltemplatetype',
  templateUrl: './seltemplatetype.component.html',
  styleUrls: ['./seltemplatetype.component.css']
})
export class SeltemplatetypeComponent implements OnInit {
  selectedTemplate: any;
  state: any;
  target_by: any;
  edition: any;
  category: any;
  paper: any;
  selType: any;
  cbw:any="1"; //0-black and white,1-color

  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

  ngOnInit() {
    this.getLocals();
   // this.getOuters();
  }
  getLocals(){
    this.selType=this.app.getLocalStorage("type_id");
    this.paper=this.app.getLocalStorage("paper");
    this.category=this.app.getLocalStorage("category");
    this.edition=this.app.getLocalStorage("edition");
    this.target_by=this.app.getLocalStorage("targetby");
    this.state=this.app.getLocalStorage("state");
    this.selectedTemplate=this.app.getLocalStorage("selectedTemplate");
    if(this.target_by=='location'){
     // this.getPapersByLocation();
      //this.getStates();
    }else{

    }
  }
  selectTemplateType(){
    this.route.navigate(['./date']);
  }
  setBwc(val){
    this.cbw=val;
  }

}
