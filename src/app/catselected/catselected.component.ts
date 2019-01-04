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
  packagesshow:boolean=false;

  constructor(private route:Router,private app:AppComponent,private _api:ApiService) {
    this.logurl=this._api.logourl;
   }

  ngOnInit() {
    this.getLocals();
    this.getOuters();
  }
  getLocals(){
    this.selType=this.app.getLocalStorage("type_id");
    this.paper=this.app.getLocalStorage("paper");
    this.category=this.app.getLocalStorage("category");
    this.edition=this.app.getLocalStorage("edition");
    this.target_by=this.app.getLocalStorage("targetby");
    this.state=this.app.getLocalStorage("state");
    if(this.target_by=='location'){
      this.getPapersByLocation();
      this.getStates();
    }else{

    }
  }
  getStates(){
    this._api.POST('getStates', {}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.states=dt.data;
      }
     
    });
  }
  getEditionByState(id:any){
    this.state=id;
    this.app.setLocalStorage("state",id);
    this._api.POST('getEditionsByState', {"state_id":this.state}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.seleditions=dt.data;
      }
      // this.seleditions=data.editions;
    });
  }
  getPapersByLocation(){
    this._api.POST('getPapersByLocation', {"category_id":this.category.id,"edition_id":this.edition.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.locpapers=dt.data;
      }
      
    });
  }
  getOuters(){
    this.getNewspapers();
    this.getLogoUrl();
    
    if(this.target_by=='location'){
      // this.getPapersByLocation();
      this.getStates();
      this.getEditionByState(this.state);
    }else{
      if(this.edition.id!==null)
      this.getPrices();
      
      this.getEditions();
    }
    
  }
  getLogoUrl(){
    this.logourl=this._api.logourl;
  }
  getNewspapers(){
    this._api.POST('getPapers', {"type_id":this.selType.id,"category_id":this.category.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.papers=dt.data;
      }
      
    });

  }
  getPaperLogo(){
    if(this.paper.logo!==null){
      return this.logourl+this.paper.logo;
    }else{
      return "assets/images/paper1.jpg";
    }
  }
  getCTnormalPrice(){
    this._api.POST('getCTnormalPrice', {"paper_id":this.paper.id,"edition_id":this.edition.id,"category_id":this.category.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.editions=dt.data;
      }
      // this.editions=data.editions;
    });
  }
  getEditions(){
    this._api.POST('getEditions', {"paper_id":this.paper.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.seleditions=dt.data;
      }
      // this.editions=data.editions;
    });
  }
  setPaper(item:any){
    this.app.setLocalStorage("paper",item);
    this.getLocals();
    this.getPrices();
  }
  getPrices(){
    this._api.POST('getPricesList', {"type_id":this.selType.id,"paper_id":this.paper.id,"category_id":this.category.id,"edition_id":this.edition.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.packagesshow=true;
        this.pricesList=dt.data;
      }
      // this.pricesList=data.pricesList;
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
      this.route.navigate(['./date']);
    }else if(this.selType.id==2){
      this.route.navigate(['./seltemplate']);
    }
    
  }
  getPaperById(id:any){
    let a=0;
    this.papers.forEach(element => {
      if(element.id==id){
        a=element;
      }
      // return element;
    });
    return a;
  }
  getEditonBasedonNewspaper(paper:any){
    // debugger;
    paper=this.getPaperById(paper);
    
    this.paper=paper;
    this.app.setLocalStorage("paper",this.paper);
    this._api.POST('getEditions', {"paper_id":paper.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.seleditions=dt.data;
      }

    });
    // this.getCategoriesOnSelection(null);
  }
  
  getEditionById(id:any){
      let a=0;
      this.seleditions.forEach(element => {
        if(element.id==id){
          a=element;
        }
        // return element;
      });
      return a;
    }
  setEdition(edition_id){
    let edition=this.getEditionById(edition_id);
    this.app.setLocalStorage("edition",edition);
    this.getLocals();
    this.getPrices();
  }
  changeCat(){
    this.route.navigate(["./category"]);
  }

}
