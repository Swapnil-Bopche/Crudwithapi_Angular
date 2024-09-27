import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User_ } from '../user_interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let user: User_[] = [
      {
        id: 1, firstname: 'kl',
        title: 'Mr',
        lastname: 'rahul',
        email: '@email.com',
        dob: '25-5-1981',
        password: '121',
        acceptTerms: true
      },
      {
        id: 2, firstname: 'shubman',
        title: 'Miss',
        lastname: 'gill',
        email: '@email.com',
        dob: '25-5-2001',
        password: '141',
        acceptTerms: true
      }
    ];

    return { user }
  }
}
