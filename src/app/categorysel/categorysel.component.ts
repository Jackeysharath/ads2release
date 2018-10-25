import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiService } from "src/app/common/api.service";
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-categorysel',
  templateUrl: './categorysel.component.html',
  styleUrls: ['./categorysel.component.css']
})
export class CategoryselComponent implements OnInit {
  categories: any;
  edition: any;
  editions: any;
  papers: any;
  category: any;
  paper: any;
  selType: any;
  paperTypes: any;
  seleditions: any;

  constructor(private route:Router,private app:AppComponent,private _api:ApiService,private home:HomeComponent) { }

  ngOnInit() {
    this.getLocals();
    this.getOuters();
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
  getEditions(){
    this._api.POST('getEditions', {}).subscribe(data =>{
      this.editions=data.editions;
    });
  }
  getNewpaperBasedonEdition(){}
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
    this._api.POST('getEditions', {"paper_id":paper.id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.seleditions=dt.data;
      }

    });

  }
  getCategoriesOnSelection(edition){
    // debugger;
    edition=this.getEditionById(edition);
    // console.log(edition);
    this.edition=edition;
    this.app.setLocalStorage("edition",this.edition);
    this._api.POST('getCategories', {"paper_id":this.paper.id,"edition_id":this.edition.id}).subscribe(data =>{
      
      if(data.status==1){
        let dt=JSON.parse(data.json);
        this.categories=dt.data;
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
