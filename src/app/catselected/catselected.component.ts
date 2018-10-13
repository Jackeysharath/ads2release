import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiService } from "src/app/common/api.service";

@Component({
  selector: 'app-catselected',
  templateUrl: './catselected.component.html',
  styleUrls: ['./catselected.component.css']
})
export class CatselectedComponent implements OnInit {
  [x: string]: any;
  pricesList: any;
  offers: any;
  editions: any;
  papers: any;
  edition: any;
  category: any;
  paper: any;
  selType: any;

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
  getNewspapers(){
    this._api.POST('getPapers', {"type_id":this.selType.id}).subscribe(data =>{
      this.papers=data.papers;
    });

  }
  getEditions(){
    this._api.POST('getEditions', {}).subscribe(data =>{
      this.editions=data.editions;
    });
  }
  getPrices(){
    this._api.POST('getPricesList', {"type_id":this.selType.id,"paper_id":this.paper.id,"category_id":this.category.id,"edition_id":this.edition.id}).subscribe(data =>{
      this.pricesList=data.pricesList;
    });
  }
  getOffers(){
    this._api.POST('getOffers', {"type_id":this.selType.id,"paper_id":this.paper.id,"category_id":this.category.id,"edition_id":this.edition.id}).subscribe(data =>{
      this.offers=data.offers;
    });
  }
  selectOffer(data){
    this.finalselection=data;
    this.app.setLocalStorage("finalselection",data);
    if(this.selType.id==1){
      this.route.navigate(['./compose']);
    }else if(this.selType.id==2){
      this.route.navigate(['./seltemplate']);
    }
    
  }

}
