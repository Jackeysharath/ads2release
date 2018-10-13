import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/app/common/api.service";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-seltemplate',
  templateUrl: './seltemplate.component.html',
  styleUrls: ['./seltemplate.component.css']
})
export class SeltemplateComponent implements OnInit {
  finalselection: any;
  templates: any;
  edition: any;
  paper: any;
  category: any;
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
    this.finalselection=this.app.getLocalStorage("finalselection");
  }
  getTemplate(){
    this._api.POST('getTemplates', {"type_id":this.selType.id,"paper_id":this.paper.id,"category_id":this.category.id,"edition_id":this.edition.id,"finalselection":this.finalselection.id}).subscribe(data =>{
      this.templates=data.papers;
    });
  }
  getTempleteType(template){
    this.app.setLocalStorage("selectedTemplate",template);
    this.route.navigate(['./seltemplatetype']);
  }

}
