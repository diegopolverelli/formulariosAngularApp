import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {


  // miArray=this.fb.array([
  //   ['Metal Gear', Validators.required],   // estas con colecciones de formControls; no son arrays...
  //   ['Death Stranding', Validators.required]
  // ], Validators.required)
    

  miFormulario: FormGroup =this.fb.group({
    nombre: ['', 
             [Validators.required, Validators.minLength(3)]
            ],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],   // estas con colecciones de formControls; no son arrays...
      ['Death Stranding', Validators.required]
    ], Validators.required)
            //    favoritos: this.miArray  
   });

   nuevoFavorito: FormControl = this.fb.control(
    '', Validators.required
   )

   get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
   }

//   miArray:any = this.miFormulario.controls['favoritos'].controls!


  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
    console.log(typeof this.miFormulario.controls['favoritos']);
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors
                           && this.miFormulario.controls[campo].touched;
  }


  agregarFavorito(){
    if (this.nuevoFavorito.invalid){
      return;
    }

    // this.favoritosArr.push(
    //   new FormControl (this.nuevoFavorito.value, Validators.required)
    //   )

    this.favoritosArr.push(
      this.fb.control(
        this.nuevoFavorito.value, Validators.required
      )
    );

      this.nuevoFavorito.reset();

  }

  borrar(index:number){
    console.log(this.favoritosArr);
    console.log(index);
    console.log(this.favoritosArr.controls[index]);

    this.favoritosArr.removeAt(index);

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
