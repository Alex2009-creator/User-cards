import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCard } from './usercardclass';

const httpOrtions = {
  headers: new HttpHeaders,
}
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  dataMas: UserCard[] = [];
  objUser: any;
  editobjUser: any;

  userId = +localStorage.getItem('keyId');
  flagUserServis: boolean;

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> { //Просмотр всех пользователей
    return this.http.get<any>('users').pipe(map((res: any) => {
      this.dataMas = res["data"];
    }));
  }

  public getCurrentUser(id: number): Observable<any> {    //Просмотр текущего пользователя 
    return this.http.get<any>(`users/${id}`)
      .pipe(map((res) => { this.objUser = res["data"] }));
  }

  public postNewtUser(item: any): Observable<any> { // Добавление пользователя
    return this.http.post<any>('users', item)
      .pipe(map((res) => { { this.objUser = res["data"] } }));
  }

  public delUser(oldId) { // Удаление исходной записи
    return this.http.delete<any>(`users/${oldId}`)
  }

  public runFlag(value) {
    this.flagUserServis = value;
    return this.flagUserServis
  }

  // public putUser(item: any):  Observable<any> { // Обновление данных пользователя     
  //   return this.http.put<any>(`users/${this.objUser['id']}`,
  //    `{"id": ${this.objUser['id']}, "name": ${this.objUser['name']}, "email": ${this.objUser['email']}, "gender": ${this.objUser['gender']}, "status": ${this.objUser['status']}}`
  //    )
  // }  

  // public getDataPosts(): Observable<any> { 
  //   return this.http.get<any>('posts');
  // }

  // public getDataGender(gender:string): Observable<any> {
  //   let newArray = []
  //   return this.http.get<any>('users')
  //   .pipe(
  //     map(
  //       (vl, i) => {

  //       vl.data.forEach(element => {
  //         if(element.gender === gender){
  //           newArray.push(element)
  //         }
  //       });

  //       console.log(newArray)
  //       return newArray;
  //     }
  //     )
  //   );
  // }

  // private subject = new Subject<any>();

  //   sendMessage(message: string) {
  //       this.subject.next({ text: message });
  //   }

  //   clearMessages() {
  //       this.subject.next();
  //   }

  //   getMessage(): Observable<any> {
  //       return this.subject.asObservable();
  //   }
}