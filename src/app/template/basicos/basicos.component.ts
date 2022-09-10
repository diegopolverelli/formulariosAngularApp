import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm={
    producto:'PR001',
    precio:10,
    existencias:10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return  this.miFormulario?.controls['producto']?.invalid &&
            this.miFormulario?.controls['producto'].touched

  }

  precioValido(): boolean {
    console.log(this.miFormulario?.controls['precio']);
    console.log('Valor: ',this.miFormulario?.controls['precio']?.value);
    console.log('Tipo valor: ',typeof this.miFormulario?.controls['precio']?.value);
    console.log(isNaN(this.miFormulario?.controls['precio']?.value));


    let rta1=false;

    if (typeof(this.miFormulario?.controls['precio']?.value)==='string'){
      rta1=true
    }
    // else{
      if(this.miFormulario?.controls['precio']?.value<=0){
        rta1=true;
      }
    // }

    // console.log('Rta1.:',rta1);

    const rta=this.miFormulario?.controls['precio']?.touched
    && rta1 

    // this.miFormulario?.controls['precio'].value.length>0    
    
    // console.log('Rta.:',rta);

    return rta; 

            

  }

//  guardar(miFormulario:NgForm){
  guardar(){
    console.log(this.miFormulario.value);
  
    this.miFormulario.resetForm({
      existencias: 0
    });
  }
}
