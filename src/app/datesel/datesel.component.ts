import { Component, OnInit , ElementRef, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/app/common/api.service";
import { AppComponent } from "src/app/app.component";
declare var multiDatesPicker: any;
declare var jquery: any;
declare var $ :any;
declare var Modernizr :any;
@Component({
  selector: 'app-datesel',
  templateUrl: './datesel.component.html',
  styleUrls: ['./datesel.component.css']
})

export class DateselComponent implements OnInit,AfterViewInit {
  scheamspackage: any;
  conditions: any;
  edition: any;
  category: any;
  paper: any;
  selType: any;
  noofads:any=2;
  @ViewChild('mdpdemo') mdpdemo: ElementRef;
  @ViewChild('altField') altField: ElementRef;
  
  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

  ngOnInit() {
    this.getLocals();
    this.getScheamsPackages();
  }
  getLocals(){
    this.selType=this.app.getLocalStorage("type_id");
    this.paper=this.app.getLocalStorage("paper");
    this.category=this.app.getLocalStorage("category");
    this.edition=this.app.getLocalStorage("edition");
  }
  getDateConditions(){
    this._api.POST('getDateConditions', {"type_id":this.selType.id,"paper_id":this.paper.id,"edition_id":this.edition.id,"offer_id":""}).subscribe(data =>{
      this.conditions=data.papers;
    });
  }
  getScheamsPackages(){
    this._api.POST('getScheamsPackage', {"type_id":this.selType.id,"paper_id":this.paper.id,"edition_id":this.edition.id,"offer_id":""}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.scheamspackage=dt.data;
      }
      // this.scheamspackage=data.papers;
    });
  }
  ngAfterViewInit(){
    // let altField=this.altField.nativeElement;
    this.dateIntiate();
  }
  dateIntiate(){
    var bufferdays=1;
    var date = new Date();
    $('#mdp-demo').multiDatesPicker({
      minDate: bufferdays, // this should be buffer time
			altField: "#altField",
      maxPicks: this.noofads

		});
  }
  getCompose(){
    let selectedates=$("input#altField").val();
    // debugger;
    this.app.setLocalStorage("selecteddates",selectedates);
    this.route.navigate(['./compose']);
  }
  noofdays(act){
    if(act=='plus'){
      this.noofads++;
    }else if(act=='minus'){
      if(this.noofads>1)
      this.noofads--;
    }
    this.dateIntiate();
  }


}
