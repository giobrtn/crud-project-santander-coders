import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loggedIn: boolean = false;
  submitted: boolean = false;

  constructor (private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      username: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required])
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      

      if (this.authService.login(username, password)){
        console.log('Login realizado')
        this.loggedIn = true;
        this.router.navigate(['customer-list']);
      } else {
        console.error("Login falhou.")
      }
    }
    this.submitted = true;
  }
}
