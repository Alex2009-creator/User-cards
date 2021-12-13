import { Component, OnInit } from '@angular/core';
import { RealizationService } from 'src/app/shared/services/realization.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { UserCard } from 'src/app/shared/services/usercardclass';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {

  public userId: number;
  public flagUser: boolean
  public cardUser: UserCard = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: ''
  };

  constructor(
    public realization: RealizationService,
    public userservice: UsersService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.flagUser = this.userservice.flagUserServis;
    this.userId = +localStorage.getItem('keyId');
    this.getName(this.userId);

  }

  getAllUser() {
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/users']);
  }

  getName(userId) {
    return this.userservice.getCurrentUser(userId).subscribe(() => {
      this.cardUser = this.userservice.objUser;
    })
  }

}