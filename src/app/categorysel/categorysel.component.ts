import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiService } from "src/app/common/api.service";

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
  getNewpaperBasedonEdition(){}
  getEditonBasedonNewspaper(paper){
    this.paper=paper;
    this.app.setLocalStorage("paper",this.paper);
    this._api.POST('getEditions', {"paper_id":paper.id}).subscribe(data =>{
      this.editions=data.editions;
    });

  }
  getCategoriesOnSelection(edition){
    this.edition=edition;
    this.app.setLocalStorage("location",this.edition);
    this._api.POST('getCategories', {"paper_id":this.paper,"edition_id":this.edition.id}).subscribe(data =>{
      this.categories=data.categories;
    });

  }
  selectCategory(category){
    this.category=category;
    this.app.setLocalStorage("category",this.category);
    this.route.navigate(['./selectedcat']);
  }

}
