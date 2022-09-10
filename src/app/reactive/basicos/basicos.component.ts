import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit{

// La forma de crear la referencia al formulario es como sigue:
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5),
  // }); 

// Alternativamente podemos utilizar FormBuilder, que nos permite
// esquivar los new FormControl... etc...
  miFormulario: FormGroup =this.fb.group({
    nombre: [null, 
             [Validators.required, Validators.minLength(3)]
            ],
    precio: [null,
             [Validators.required, Validators.min(0.00001)]
            ],
    existencias: [null,
                  [Validators.required, Validators.min(0)]
                 ],
   })

  constructor(private fb: FormBuilder ) { }

ngOnInit(): void {

  // Para inicializar el valor puedo utilizar
  // el setValue, pero es necesario completar
  // todos los campos; si no da error. Y es posible
  // que alguno se cree dinamicamente (un id que pro
  // vea una DB, por ejemplo)
  // this.miFormulario.setValue({
  //   nombre:'RTX 4080ti',
  //   precio: 1000,
  //   existencias:10 
  // })

  // entonces puedo utilizar el .reset, donde
  // puedo omitir el envío de propiedades.
  // En este caso no mando las existencias
  this.miFormulario.reset({
    nombre:'RTX 4080ti',
    precio: 1000,
    // existencias:10 
  })

}

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors
                           && this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }


}
