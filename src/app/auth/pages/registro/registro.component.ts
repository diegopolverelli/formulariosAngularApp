import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {



  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.email, Validators.pattern(emailPattern)], [this.emailValidator]],
    username: ['',[Validators.required, noPuedeSerStrider]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],

  }, {
    // validaciones que se aplican a todo el form (no solo a un campo específico)
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })

  get emailErrorMsg(): string {
    const errors= this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'El campo email es obligatorio'
    }

    if(errors?.['pattern']){
      return 'El formato ingresado no corresponde a un email válido'
    }

    if(errors?.['emailTomado']){
      return 'El email introducido ya se encuentra en uso. Por favor ingrese uno diferente'
    }


    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Diego Polverelli',
      email:'test1@test.com',
      username: 'elPepes'
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required']
  //   && this.miFormulario.get('email')?.touched;

  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //   && this.miFormulario.get('email')?.touched;

  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //   && this.miFormulario.get('email')?.touched;

  // }


  submitFormulario(){
    this.miFormulario.markAllAsTouched();
    
    console.log(this.miFormulario.value);

  }

}
