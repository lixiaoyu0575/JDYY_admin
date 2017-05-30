/**
 * Created by th3ee on 5/22/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  userData =
  [
    {
      id: 10001,
      name: 'Andy',
      email: '610870693@qq.com',
      level: 1,
    },
    {
      id: 10002,
      name: 'Billy',
      email: 'th3eepop@163.com',
      level: 2,
    }
    ,
    {
      id: 10003,
      name: 'Carter',
      email: 'wsswk311@163.com',
      level: 2,
    }
    ,
    {
      id: 10004,
      name: 'David',
      email: 'wsswk@126.com',
      level: 2,
    }
    ,
    {
      id: 10005,
      name: 'Eric',
      email: 'th3eepop@163.com',
      level: 2,
    }
    ,
    {
      id: 10006,
      name: 'Farmer',
      email: 'th3eepop@163.com',
      level: 2,
    }
    ,
  ];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.userData);
      }, 500);
    });
  }

}
