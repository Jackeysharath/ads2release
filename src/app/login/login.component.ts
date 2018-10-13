import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  pay(){
    this.route.navigate(['./pay']);
  }
  userCheck() {
		if ((<HTMLInputElement>document.getElementById('new_user')).checked) {
			document.getElementById('newuser-content').style.display = 'block';
			document.getElementById('existinguser-content').style.display = 'none';
		}
		else if((<HTMLInputElement>document.getElementById('exist_user')).checked) {
			document.getElementById('newuser-content').style.display = 'none';
			document.getElementById('existinguser-content').style.display = 'block';
		}

}

}
