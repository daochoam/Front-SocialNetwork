/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { TOKEN_SESSION } from '../../const/const';

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuComponent {
  @Input() id: string | undefined = "";
  @Input() name: string = ""
  @Input() email: string = ""
  @Input() age: number | string = ""

  User: IUser = { fullName: "", email: "", age: 0, password: "" }

  constructor(
    private route: Router,
    private user: UserService,
    private auth: AuthenticationService) { }

  onLogout() {
    this.auth.logOut()
      .then((response: any) => {
        if (response) {
          localStorage.removeItem(TOKEN_SESSION)
          this.route.navigate(['/'])
        }
      })
  }
}
