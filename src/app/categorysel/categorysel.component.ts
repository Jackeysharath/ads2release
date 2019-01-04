import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiService } from "src/app/common/api.service";
import { HomeComponent } from '../home/home.component';
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: 'app-categorysel',
  templateUrl: './categorysel.component.html',
  styleUrls: ['./categorysel.component.css']
})
export class CategoryselComponent implements OnInit {
  logourl: any;

  type_id: number;
  targetby: any = "paper";
  state: any;
  states: any;
  categories: any;
  edition: any;
  editions: any;
  papers: any;
  category: any;
  paper: any;
  selType: any;
  paperTypes: any;
  seleditions: any;
  @ViewChild("tarbypap", {read: ElementRef}) tarbypap: ElementRef;
  @ViewChild("tarbyloc", {read: ElementRef}) tarbyloc: ElementRef;

  constructor(private route:Router,private app:AppComponent,private _api:ApiService,private home:HomeComponent) {
   this.logourl= this._api.logourl;
   }

  ngOnInit() {
    this.getLocals();
    this.getOuters();
    this.targetbycheck();
    }
    targetbycheck(){
    if(this.app.getLocalStorage("targetby")){
      this.targetby=this.app.getLocalStorage("targetby");
    }
      // debugger;
      if(this.targetby=="paper"){
        this.tarbypap.nativeElement.click();
        
      }else if(this.targetby=="location"){
        this.tarbyloc.nativeElement.click();
        
      }
    }
    intials(){
    this.categories=[];

    }
    setTargetby(val:string){
      // debugger;
      // this.app.clearLocalStorage();
      this.app.setLocalStorage("targetby",val);
      this.targetbycheck();
    }


  getLocals(){
    this.selType=this.app.getLocalStorage("type_id");
    // console.log(this.selType);
    this.paper=this.app.getLocalStorage("paper");
    // debugger;
    // if(this.paper!==null&&this.paper!==undefined){
    //   this.getEditonBasedonNewspaper(this.paper.id);
    // }
    this.category=this.app.getLocalStorage("category");
    this.edition=this.app.getLocalStorage("edition");
  }
  getOuters(){
    this.getNewspapers();
    this.getStates();
  }
  setTypeById(id:number){
    this._api.POST('getPaperTypes', {}).subscribe(data =>{
      // console.log(data.json);
      if(data.status==1){
        
      let dt=JSON.parse(data.json);
        this.paperTypes=dt.data;
        let i=0;
        this.paperTypes.forEach(element => {
          this.paperTypes[i].desc=this.home.rearrangedesc(element.type_description);
i++;
        });
        this.paperTypes.forEach(element => {
          if(element.id==id){
            this.home.selType(element,0);
            this.getLocals();
            this.intials();
          }
        });
      }else{
        this.paperTypes=[];
      }

    });

  }
  getNewspapers(){
    this._api.POST('getPapers', {"type_id":this.selType.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.papers=dt.data;
      }
      
    });

  }
  getStates(){
    this._api.POST('getStates', {}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.states=dt.data;
      }
     
    });
  }
  getEditions(){
    this._api.POST('getEditions', {}).subscribe(data =>{
      this.editions=data.editions;
    });
  }
  getEditionByState(id:any){
    this.state=id;
    this.app.setLocalStorage("state",id);
    this._api.POST('getEditionsByState', {"state_id":this.state}).subscribe(data =>{
      if(data.status==1){
        this.intials();
        
        let dt=JSON.parse(data.json);
        this.seleditions=dt.data;
      }
      // this.seleditions=data.editions;
    });
  }
  getCategoriesOnSelectionLocation(edition:any){
    edition=this.getEditionById(edition);
    // console.log(edition);
    this.edition=edition;
    this.app.setLocalStorage("edition",this.edition);
    this._api.POST('getCategories', {"paper_id":"","edition_id":this.edition.id,"type_id":this.selType.id}).subscribe(data =>{
      
      if(data.status==1){
        let dt=JSON.parse(data.json);
        this.categories=dt.data;
      }
      
    });

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
  getEditonBasedonNewspaper(paper:any){
    // debugger;
    paper=this.getPaperById(paper);
    this.paper=paper;
    this.app.setLocalStorage("paper",this.paper);
    // this._api.POST('getEditions', {"paper_id":paper.id}).subscribe(data =>{
    //   if(data.status==1){
        
    //     let dt=JSON.parse(data.json);
    //     this.seleditions=dt.data;
    //   }

    // });
    this.getCategoriesOnSelection(null);
  }
  getCategoriesOnSelection(edition){
    // debugger;
    if(edition!==null){
      edition=this.getEditionById(edition);
      // console.log(edition);
      this.edition=edition;
     
    }else{
      this.edition={};
      this.edition.id="";
    }
    this.app.setLocalStorage("edition",this.edition);
    this._api.POST('getCategories', {"paper_id":this.paper.id,"edition_id":this.edition.id,"type_id":this.selType.id}).subscribe(data =>{
      
      if(data.status==1){
        let dt=JSON.parse(data.json);
        this.categories=dt.data;
      }else{
        this.categories=[];
      }
      
    });

  }
  selectCategory(category){
    this.category=category;
    this.app.setLocalStorage("category",this.category);
    this.route.navigate(['./selectedcat']);
  }
  selectTargetBy(item){
    this.app.setLocalStorage("target_by","item");
  }

}
