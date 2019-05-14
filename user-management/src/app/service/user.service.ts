import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:4200/employeelist/users';
  fakeUsers:User[] = [
    {id: 1, firstname: 'Rajiv', lastname: 'Risi', email: 'rajivrisi@gmail.com'},
    {id: 2, firstname: 'Saurav', lastname: 'Ganguly', email: 'sganguly@gmail.com'},
    {id: 3, firstname: 'MHSing', lastname: 'Dhoni', email: 'mhdhoni@gmail.com'},
    {id: 4, firstname: 'Sachin', lastname: 'Tendulkar', email: 'sachin@gmail.com'},
    {id: 5, firstname: 'Rahul', lastname: 'Dravid', email: 'rahuldravid@gmail.com'},
  ];

  constructor(private http: HttpClient) { }

  getUsers(){
    return of(this.fakeUsers);
    // return this.http.get<User[]>(this.baseUrl);
  }

  createUser(user: User) {
    return of(this.fakeUsers.push(user));
    // return this.http.post(this.baseUrl, user);
  }

  getUserById(id: number) {
    var obj = this.fakeUsers.filter(x => x.id === id)[0];
    return of(obj);

    // return this.http.get<User>(this.baseUrl + '/' + id);
  }

  updateUser(user: User) {
    let updateItem = this.fakeUsers.find(this.findIndexToUpdate, user.id);
    let index = this.fakeUsers.indexOf(updateItem);
    return of(this.fakeUsers[index] = user);

    // return this.http.put(this.baseUrl + '/' + user.id, user);
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  deleteUser(id: number) {
    const index = this.fakeUsers.findIndex(fakeUsr => fakeUsr.id === id);
    return of(this.fakeUsers.splice(index, 1));

    // return this.http.delete(this.baseUrl + '/' + id);
  }
  

}
