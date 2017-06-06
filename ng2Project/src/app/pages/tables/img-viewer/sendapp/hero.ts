/**
 * Created by th3ee on 5/17/17.
 */
export class Hero {
  id: number;
  name: string;
  age: string;
  reason: string;
  originaldiagnosis: string;
  status: number;
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
