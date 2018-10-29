import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/common/api.service";
import { AppComponent } from "src/app/app.component";
import { EnhacementService } from "src/app/common/enhacement.service";
declare var jquery: any;
declare var $ :any;
declare var Modernizr :any;
declare var froalaEditor :any;
declare var value :any;
declare var checked :any;


@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit,AfterViewInit {
  selecteddates: any;
  mystyle: any;
  instructions: any;
  enhancements: any = [];
  subcategories: any = [];
  getclevel: any = 2;
  target_by: any;
  edition: any;
  category: any;
  paper: any;
  selType: any;

  constructor(private route:Router,private app:AppComponent,private _api:ApiService,private enhac:EnhacementService) { }

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
    this.selecteddates=this.app.getLocalStorage("selecteddates");
    
  }
  getOuters(){
    
this.getSubSubCat(this.category.id,2);
if(this.selType.id==1){
  this.getEnhancements(this.paper.id,this.category.id,2);
  this.getEnhancements(this.paper.id,this.category.id,1);
  this.getInstructions(this.selType.id,this.paper.id,this.category.id,this.edition.id);
  this.getSampleAds(this.selType.id,this.paper.id,this.category.id,this.edition.id);
  
}


  }
  
  getSubSubCat(val,level){
    this.getclevel=level;
    this._api.POST('getSubCategories', {"type_id":this.selType.id,"paper_id":this.paper.id,"category_id":val,"level":this.getclevel}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.subcategories[level] =dt.data;
        // console.log(this.subcategories);
      }
      
    });
  }
  ngAfterViewInit(){
    this.jqryfunctionsload();
  }
  checkout(){
    let ad=$("div#preview-body.ct").html();
    // debugger;
    this.app.setLocalStorage("addcontent",ad);
    this.route.navigate(['./bookingsummary']);
  }
  jqryfunctionsload(){

    
    $('#edit-header').on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
      $('#preview-header').html(editor.html.get());
    }).froalaEditor({
  toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'align']
});
$('#edit-body').on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
      $('#preview-body').html(editor.html.get());
    }).froalaEditor({
  toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'align']
});
$('#edit-footer').on('froalaEditor.contentChanged froalaEditor.initialized', function (e, editor) {
      $('#preview-footer').html(editor.html.get());
    }).froalaEditor({
  toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'align']
});

//add color picker for footer content
if (Modernizr.inputtypes.color) {
$(".pickerfooter").css("display", 'inline-block');
var d = <HTMLInputElement>document.getElementById('colorpicker-footer');

d.addEventListener('change', function(e) {
  //d.innerHTML = c.value;

  var color = d.value;
  //  console.log("test fire",d);
  // var color = "green";
  $("#edit-footer .fr-element").css("background-color", color);
  $("#preview-footer").css("background-color", color);
  }, false);
}
//add color picker for body content
if (Modernizr.inputtypes.color) {
$(".pickerbody").css("display", 'inline-block');
var b = <HTMLInputElement>document.getElementById('colorpicker-body');

b.addEventListener('change', function(c) {
  //d.innerHTML = c.value;
  var color = b.value;
  // var color = "red";
  $("#edit-body .fr-element").css("background-color", color);
  $("#preview-body").css("background-color", color);
  }, false);
}
//add color picker for header content
if (Modernizr.inputtypes.color) {
$(".pickerheader").css("display", 'inline-block');
var f = <HTMLInputElement>document.getElementById('colorpicker-header');
f.addEventListener('change', function(g) {
  //d.innerHTML = c.value;
  
  var color = f.value;
  // var color = "blue";
  $("#edit-header .fr-element").css("background-color", color);
  $("#preview-header").css("background-color", color);
  }, false);
}

  }
  cmCheck() {
    if ((<HTMLInputElement>document.getElementById('three')).checked) {
      document.getElementById('preview-container').style.width = '3cm';
    }
    else if((<HTMLInputElement>document.getElementById('six')).checked) {
      document.getElementById('preview-container').style.width = '6cm';
    }
    else if((<HTMLInputElement>document.getElementById('eight')).checked) {
      document.getElementById('preview-container').style.width = '8cm';
    }
    else if((<HTMLInputElement>document.getElementById('twelve')).checked) {
      document.getElementById('preview-container').style.width = '12cm';
    }
  }
  getEnhancements(paper_id,category_id,enhancement_type){

    this._api.POST('getEnhacements', {"type_id":this.selType.id,"paper_id":paper_id,"category_id":category_id,"enhancement_type":enhancement_type}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.enhancements[enhancement_type] =dt.data;
        // console.log(this.subcategories);
      }
      
    });

  }
  getInstructions(type_id,paper_id,category_id,edition_id){
    this._api.POST('getInstructions', {"type_id":type_id,"paper_id":paper_id,"category_id":category_id,"edition_id":edition_id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.instructions =dt.data;
        // console.log(this.subcategories);
      }
      
    });
  }
  applyEnhacement(enh:any){
    // debugger;
   let k= this.enhac.action(enh);
   if(enh.enhancement_code=="BOR"){
    let key=k[0].toString();
    let val=k[1].toString();
    let obj={"border-style":val+'!important'};
     this.mystyle=obj;
   }
    // console.log(this.mystyle);
  }
  getSampleAds(type_id,paper_id,category_id,edition_id){
    this._api.POST('getSampleAds', {"type_id":type_id,"paper_id":paper_id,"category_id":category_id,"edition_id":edition_id}).subscribe(data =>{
      if(data.status==1){
        
        let dt=JSON.parse(data.json);
        this.instructions =dt.data;
        // console.log(this.subcategories);
      }
      
    });
  }

}
