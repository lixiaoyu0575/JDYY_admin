import {Injectable} from '@angular/core';

@Injectable()
export class ImageTableService {

  dataTableData = [
    {
      'ID': '001',
      'name': '病人甲',
      'age': '25',
      'examContent': 'CT',
      'time': '2016-01-01',
      'status': '有'
    },
    {
      'ID': '003',
      'name': '病人丙',
      'age': '68',
      'examContent': 'MRI',
      'time': '2016-03-01',
      'status': '有'
    },
    {
      'ID': '002',
      'name': '病人乙',
      'age': '75',
      'examContent': 'CT',
      'time': '2014-01-01',
      'status': '无'
    },
    {
      'ID': '005',
      'name': '病人子',
      'age': '85',
      'examContent': 'CT',
      'time': '2016-01-02',
      'status': '有'
    },
    {
      'ID': '004',
      'name': '病人丁',
      'age': '56',
      'examContent': 'MRI',
      'time': '2017-01-01',
      'status': '无'
    },
    {
      'ID': '006',
      'name': '病人午',
      'age': '65',
      'examContent': 'CT',
      'time': '2013-04-01',
      'status': '无'
    },
];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.dataTableData);
      }, 1);
    });
  }
}
