import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  persona: Persona={
    nombre: 'Diego',
    favoritos: [
      {id:1, nombre:'Italia90'},
      {id:2, nombre:'Daytona'},
    ]
  }

  nuevoJuego:string=''

  constructor() { }

  ngOnInit(): void {
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index,1);

  }

  agregarJuego(){
    const id=this.persona.favoritos.length+1
    this.persona.favoritos.push({
      id: id,
      nombre: this.nuevoJuego
      // nombre: this.miFormulario.controls['nuevoJuego']?.value
    });
    this.nuevoJuego='';
  };

  guardar(){
    console.log('formulario posteado');
  }
}
