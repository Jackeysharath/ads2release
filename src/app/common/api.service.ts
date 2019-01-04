import {Injectable} from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod,Request } from '@angular/http';
//import {BookComponent} from '../book/book.component';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { parseString } from 'xml2js';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    http:any;
    // bookcomponent:any;
    public labDetails=[];
    token:any=null;
    //private url:any='http://192.168.0.169:2007/api/';
    mdata:any=[];

    private url:any='http://localhost:1111/apiservice/'; //dev
    public logourl:any='http://localhost:1111/assets/uploads/';
 //  private url:any='http://epanel.ads2release.in/apiservice/'; //prod
   //public logourl:any='http://epanel.ads2release.in/assets/uploads/'; //prod
     constructor(http: Http){
         this.http=http;
        // this.labDetails =[];
        
        this.mdata=[];
         
     }
     getToken(){
        
        var headers = new Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        return this.http.get(this.url).map(data => {
          let data2= JSON.parse(this.trimxmltag(data._body));
          localStorage.setItem('req_token',this.token);
          return this.token = data2.data[0].GUID
          
    });
     }
    //  push(token:any,url:any,data:any){

    //  } 
    masterCall(url, data){

        // debugger;
        //data.TokenNo=localStorage.getItem('req_token')
        let body=this.transform(data);
       // console.log(body);
       console.log(this.url + url,body);
        return this.http.post(this.url + url,body,{
             headers : {

                 'Content-Type' : 'application/x-www-form-urlencoded'
             }
             
         }).map((res: Response) => {
            // let res1=res;
             let res1=this.trimxmltag(res['_body']);
            // return res1;
            // console.log(res1);
            let tstat=JSON.parse(res1).status;
             if (tstat==1){
                 return { status: tstat, json: res1 }
             }else{
                 return { status: tstat, json: "[]" }
             }
         });

    }

     POST(url, data){
        //  debugger;
         //request token here
         //localStorage.setItem('req_token','');
    //    this.getToken().map(
    //             data2 => {
    //                 this.token = data2.data[0].GUID
    //                 localStorage.setItem('req_token',this.token);
    //             }
    //         );
    // console.log(url,data);
            return this.masterCall(url,data).map((res)=>{
                return this.mdata=res;
            });
            

       
        
    }

    trimxmltag(dt:any){
        var re0='<?xml version="1.0" encoding="utf-8"?>';
        var re = '<string xmlns="http://Suvarna.org/">'; 
        var re1 = '</string>'; 
        var str = dt;
        var newstr = str.replace(re, ""); 
        var newstr = newstr.replace(re1, "");
        var newstr = newstr.replace(re0, ""); 
        //var newstr = newstr.replace(null, ""); 
        let parsed_data=newstr.trim();
        return parsed_data;
    }
    transform(data:any):any{
        let ret="";
        let i=0;
        for (let key in data) {
            if(i==0){
                ret=ret+''+key+'='+data[key];
            }else{
                ret=ret+'&'+key+'='+data[key];
            }
           
           i++;
          }
          //console.log(ret);
          return ret;
    }
    PinByGoogle(req_url):any{ 
         //console.log(req_url);
        return this.http.get(req_url).map(data => {
           return JSON.parse(this.trimxmltag(data._body)).results;
     });
    }
    ticketsHandling(data){
         return this.http.post(this.url,data,{
              headers : {
                  'Content-Type' : 'application/json',
                  'Authorization':'Basic c3Jpbml2YXNAdGVuZXRtZWRjb3JwLmNvbTp0ZW5ldEAzMjE='
              }
              
          })
          .map((res: Response) => {
          return res;
          });
    }

}
