import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth.component',
  templateUrl: './auth.component.component.html',
  styleUrls: ['./auth.component.component.css']
})
export class AuthComponentComponent implements OnInit {
  isLoginMode = true;
  error: string = null;
  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onHandleError(){
    this.error = null;
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['/workout'])
        }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      );
    }
    else{
      this.authService.signup(email,password).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['/workout'])
        }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        });
    }
   
      
    form.reset()
  }

}
