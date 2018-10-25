import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { ApiService } from '../common/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userdata: any;
  constructor(private route:Router,private app:AppComponent,private _api:ApiService) { }

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
onLogin(){
  let loginemail=(<HTMLInputElement>document.getElementById('loginemail')).value;
  let loginpassword=(<HTMLInputElement>document.getElementById('loginpassword')).value;
  this._api.POST('getLogin', {"username":loginemail,"password":loginpassword}).subscribe(data =>{
    if(data.status==1){
      
      let dt=JSON.parse(data.json);
      this.userdata=dt.data;
      this.app.setLocalStorage("userdata",this.userdata);
      this.pay();
    }

  });
}

}
