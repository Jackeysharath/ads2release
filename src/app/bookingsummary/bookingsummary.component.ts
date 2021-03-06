import { Component, OnInit } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-bookingsummary',
  templateUrl: './bookingsummary.component.html',
  styleUrls: ['./bookingsummary.component.css']
})
export class BookingsummaryComponent implements OnInit {
  famount: any;
  selecteddates: any;
  addcontent: any;

  finalselection: any;
  paper: any;
  category: any;
  edition: any;
  target_by: any;
  selType: any;
  gst:any=18;
  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

  ngOnInit() {
    this.getLocals();
  }
  getLocals(){
    this.selType=this.app.getLocalStorage("type_id");
    this.paper=this.app.getLocalStorage("paper");
    this.category=this.app.getLocalStorage("category");
    this.edition=this.app.getLocalStorage("edition");
    this.target_by=this.app.getLocalStorage("target_by");
    this.finalselection=this.app.getLocalStorage("finalselection");
    this.addcontent=this.app.getLocalStorage("addcontent");
    this.selecteddates=this.app.getLocalStorage("selecteddates");
    this.famount=this.app.getLocalStorage("famount");
    
    
  }
  getAmount(){
    return this.famount;
  }
  getGst():any{
    return parseFloat(this.getAmount())*((this.gst)/100);
  }
  getTotal(){
     let tot=parseFloat(this.getAmount())+parseFloat(this.getGst());
     this.app.setLocalStorage("total_amount",tot);
     return tot;

  }
  checkout(){
    this.route.navigate(['./login']);
  }

}
