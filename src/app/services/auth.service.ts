import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly fixedUser = 'admin';
  private readonly fixedPw = 'admin123';

  login(username: string, password: string): boolean {
    if (username == this.fixedUser && password == this.fixedPw) {
      return true;
  }
  return false;
  }

  
}
