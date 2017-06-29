/**
 * Created by th3ee on 5/17/17.
 */
export class Hero {
  patientID: string;
  examID: string;
  name: string;
  gender: string;
  age: string;
  examContent: string;
  examPart: string;
  reason: string;
  originaldiagnosis: string;
  status: string;
  time: string;
  user: string[];
}

export class User {
  id: number;
  name: string;
  email: string;
  level: number;
}

export class Usercreds {
  recipients: string;
  message: string;
  subject: string;
}
