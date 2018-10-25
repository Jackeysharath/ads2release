import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private route:Router) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.jqryfunctionsload();
  }
  checkout(){
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

}
