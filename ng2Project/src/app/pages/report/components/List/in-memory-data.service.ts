/**
 * Created by th3ee on 5/19/17.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 11, name: 'Mr. Nice', age: '35', reason: '', originaldiagnosis: '', status: 1, user: ['Andy', 'Billy', 'Eric', 'David' ]},
      {id: 12, name: 'Narco', age: '36', reason: '', originaldiagnosis: '', status: 0, user: ['Andy', 'Eric', 'David']},
      {id: 13, name: 'Bombasto', age: '30', reason: '', originaldiagnosis: '', status: 0, user: ['Andy', 'Carter']},
      {id: 14, name: 'Celeritas', age: '22', reason: '', originaldiagnosis: '', status: 0, user: ['Andy', 'Eric']},
      {id: 15, name: 'Magneta', age: '65', reason: '', originaldiagnosis: '', status: 1, user: [ 'Billy', 'Farmer']},
      {id: 16, name: 'RubberMan', age: '85', reason: '', originaldiagnosis: '', status: 0, user: [ 'Billy', 'David']},
      {id: 17, name: 'Dynama', age: '15', reason: '', originaldiagnosis: '', status: 1, user: [ 'Billy']},
      {id: 18, name: 'Dr IQ', age: '25', reason: '', originaldiagnosis: '', status: 0, user: [ 'Billy', 'Eric', 'David']},
      {id: 19, name: 'Magma', age: '75', reason: '', originaldiagnosis: '', status: 1, user: [ 'Billy']},
      {id: 20, name: 'Tornado', age: '44', reason: '', originaldiagnosis: '', status: 0, user: [ 'Billy', 'David']}
    ];

    return { heroes };
  }
}


