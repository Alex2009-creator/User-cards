import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { RealizationService } from 'src/app/shared/services/realization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private realization: RealizationService,
    private router: Router
  ) { }

  form: FormGroup | any;
  formData: any;
  email: FormControl | any;
  password: FormControl | any;
  messageError: string | any;
  flagErr: boolean | any;
  key1: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/dashboard']) // страница авторизации пропускается
  }

  onSubmit(form: any) {
    if (this.form.valid) {
      this.formData = { ...this.form.value }
      this.form.reset();
    }

    this.flagErr = true;

    for (let user of this.realization.userobj) {
      if ((user['emailDb'] == this.formData['email']) && (user['password'] == this.formData['password'])) {        
        this.flagErr = false;
        localStorage.key1 = user['emailDb'];
        this.realization.getToken();
        this.router.navigate(['/dashboard'])
      }
    }

    if (this.flagErr) {
      this.flagErr = true;
      return this.messageError = 'Email or password do not match!'
    } else {
      this.messageError = '';
    }
  }

}