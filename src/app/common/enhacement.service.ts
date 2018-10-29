import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnhacementService {

  constructor() { }
  action(item:any){
    // console.log(item);
    let funname=item.enhancement_code;
   return  this[funname](item);
  } 
  BOR(item:any){
    // debugger;
    item.value=item.value.replace(/;$/," ");
    let k= item.value.split(":");
   
     return k;

  }
}
