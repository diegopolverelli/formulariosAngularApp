import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue],

  });
  
  persona={
    genero:'F',
    notificaciones: true
  }

  constructor(private fb: FormBuilder ) { }

  // ngOnInit(): void {
  //   this.miFormulario.reset(this.persona)
  // }

    ngOnInit(): void {
    this.miFormulario.reset({...this.persona,
      condiciones:true})

      // me puedo suscribir a la variación de un ítem
      // del formulario
    this.miFormulario.get('condiciones')?.valueChanges
      .subscribe(newValue=>{
        console.log(newValue);
      })

      // me puedo suscribir también a la variación
      // de cualquier ítem del formulario (de todo el form)
    this.miFormulario.valueChanges
      .subscribe(form =>{
        console.log(form);
        delete form.condiciones; // porque persona no lleva propiedad condiciones
        this.persona=form;
      })

    }

    guardar(){
      const formValue = {...this.miFormulario.value};

      delete formValue.condiciones;

      this.persona=formValue;

      console.log('Entro al submit');

    }

}
