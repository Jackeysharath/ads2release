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
  @ViewChild('mdpdemo') mdpdemo: ElementRef;
  @ViewChild('altField') altField: ElementRef;
  
  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

  ngOnInit() {
    this.getLocals();
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
      this.scheamspackage=data.papers;
    });
  }
  ngAfterViewInit(){
    let altField=this.altField.nativeElement
    $('#mdp-demo').multiDatesPicker({
			altField: "#altField",
		  maxPicks: 3
		});
  }
  getCompose(){
    this.route.navigate(['./compose']);
  }

}
