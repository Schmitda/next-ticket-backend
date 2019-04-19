export class User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  id: number;
  private static createdUsers: number = 0;

  constructor(firstName: string, lastName: string, password: string, email: string) {
    this.id = User.createdUsers;
    User.createdUsers++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}
