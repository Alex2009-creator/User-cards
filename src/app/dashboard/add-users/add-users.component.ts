import { Component, OnInit } from '@angular/core';
import { UserCard } from 'src/app/shared/services/usercardclass';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RealizationService } from 'src/app/shared/services/realization.service';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent implements OnInit {

  cardUser: UserCard = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: ''
  }

  loginForm: FormGroup | any;
  formData: any;

  constructor(
    public userservice: UsersService,
    public realization: RealizationService,
    public router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      gender: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    })
  }

  onSubmit(form: any) {
    if (this.loginForm.valid) {
      this.formData = { ...this.loginForm.value }      
      this.addNewUser();
      this.loginForm.reset();
    }
  }

  addNewUser() {    // добавление карточки пользователя и ее вызов для показа
    return this.userservice.postNewtUser(this.formData).subscribe(() => {
      this.cardUser = this.userservice.objUser;
    })
  }

  getAllUser() {
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/users']);
  }

}