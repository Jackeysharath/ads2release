import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seltemplatetype',
  templateUrl: './seltemplatetype.component.html',
  styleUrls: ['./seltemplatetype.component.css']
})
export class SeltemplatetypeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  selectTemplateType(){
    this.route.navigate(['./date']);
  }

}
