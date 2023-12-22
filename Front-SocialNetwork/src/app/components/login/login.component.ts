/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidateUserService } from '../../services/validate-user.service';
import { TOKEN_SESSION } from '../../const/const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  isLoginMode = true;
  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  /*  LOGIN MESSAGES */
  messageEmail: string = ""
  messagePassword: string = ""

  constructor(
    private route: Router,
    private auth: AuthenticationService,
    private validate: ValidateUserService) { }

  /* CLEAR FIELDS */
  clearFields(): void {
    this.loginEmail = "";
    this.loginPassword = "";
    this.registerEmail = "";
    this.registerPassword = "";
    this.messageEmail = "";
    this.messagePassword = ""
  }

  onLogin() {
    this.auth.logIn({ email: this.loginEmail, password: this.loginPassword })
      .then((response: any) => {
        if (response) {
          this.clearFields()
          localStorage.setItem(TOKEN_SESSION, response.token)
          this.route.navigate(['/wall'])
        }
      })
  }



  onRegister() {

  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
