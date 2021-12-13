import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RealizationService implements CanActivate {

  public userobj = [
    { emailDb: 'monro@mail.com', password: '7777' },
    { emailDb: 'eridan@mail.com', password: '5555' }
  ];

  flagLocalToken: boolean;
  userId: number;

  constructor(public router: Router) { }


  getToken() {
    localStorage.keyToken = environment.token;
  }

  checkToken() {
    if (localStorage.getItem('keyToken') !== null) {
      return this.flagLocalToken = true
    } else {
      return this.flagLocalToken = false
    }
  }

  getId(userid) {
    return this.userId = userid
  }

  canActivate(): boolean {
    if (!this.checkToken()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

}