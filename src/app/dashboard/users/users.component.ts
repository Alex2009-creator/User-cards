import { Component, OnInit } from '@angular/core';
import { RealizationService } from 'src/app/shared/services/realization.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { UserCard } from 'src/app/shared/services/usercardclass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listUsers: UserCard[] = [];
  private flagUser: boolean;

  constructor(
    public realization: RealizationService,
    public userservice: UsersService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.flagUser = true;
    this.userservice.getData().subscribe(() => {
      this.listUsers = this.userservice.dataMas;
    })
  }
  getUserCard(userid) {
    let curentId = String(userid);
    localStorage.setItem('keyId', curentId)

    this.realization.getId(userid)
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.userservice.runFlag(this.flagUser);
    this.router.navigate(['/viewuser']);
  }

  updateUserCard(userid) {
    let curentId = String(userid);
    localStorage.setItem('keyId', curentId)

    this.realization.getId(userid)
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/edituser']);
  }

  addNewUser() {
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/adduser']);
  }

  goMainPage() {
    this.router.navigate(['/']);
  }

}
