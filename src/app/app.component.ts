import { Component } from '@angular/core';
import { RealizationService } from './shared/services/realization.service';
import { UsersService } from './shared/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'User cards';

  constructor(
    public realization: RealizationService,
    public userservice: UsersService,
    public router: Router
  ) { }

  getAllUser() {
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/']);
  }
}
