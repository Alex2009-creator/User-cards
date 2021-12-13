import { Component, OnInit } from '@angular/core';
import { RealizationService } from 'src/app/shared/services/realization.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { UserCard } from 'src/app/shared/services/usercardclass';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  cardUser: UserCard = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: ''
  }

  loginForm: FormGroup | any;
  formData: any;
  userId: number;
  oldId: number;
  newId: number;
  flagUser: boolean;

  constructor(
    public userservice: UsersService,
    public realization: RealizationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('keyId');
    this.getName(this.userId);
    this.flagUser = true;
    this.loginForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      gender: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    })
  }

  onSubmit(form: any) {
    this.formData = { ...this.loginForm.value }    
    this.oldId = this.userId;
    this.updateUser();
    this.flagUser = false;
    this.loginForm.reset();
  }

  addNewUser() { // добавление карточки пользователя
    return this.userservice.postNewtUser(this.formData).subscribe(() => {
      this.cardUser = this.userservice.objUser;
    })
  }

  getName(Id) {
    return this.userservice.getCurrentUser(Id).subscribe(() => {
      this.cardUser = this.userservice.objUser;
      if (this.flagUser == false) {
        this.userservice.runFlag(this.flagUser) // установка флага для отображения сообщения об обновлении записи
        this.router.navigate(['/viewuser'])
      }
    })
  }

  updateUser() {    // обновление карточки пользователя
    return this.userservice.postNewtUser(this.formData).subscribe(() => {
      this.cardUser = this.userservice.objUser;
      this.newId = this.cardUser['id'];
      localStorage.setItem('keyId', String(this.newId))      
      this.delOldCard(this.oldId);      
    })
  }

  getAllUser() {
    this.realization.checkToken();
    this.router.navigate(['/users']);
  }

  delOldCard(oldId) {
    return this.userservice.delUser(oldId).subscribe(() => {
      this.cardUser = this.userservice.objUser;
      this.getName(this.newId)
    })
  }
}