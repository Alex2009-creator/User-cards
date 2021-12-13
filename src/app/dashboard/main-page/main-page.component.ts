import { Component, OnInit } from '@angular/core';
import { RealizationService } from 'src/app/shared/services/realization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public showFiller: boolean = false;
  constructor(
    public realization: RealizationService,
    public router: Router) { }

  ngOnInit(): void {

  }

  getListUsers() {
    this.realization.checkToken(); // Если пользователь зарегистрирован (наличие токена в LocalStorage), 
    this.router.navigate(['/users'])
  }

  exitProgramm() {
    localStorage.removeItem("key1");
    localStorage.removeItem("keyToken");
    localStorage.removeItem("keyId");
    this.router.navigate(['/login'])
  }

}
