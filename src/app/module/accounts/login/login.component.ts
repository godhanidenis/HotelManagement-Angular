import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ErrorMsg: boolean | undefined;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}
  profileForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.service.login(this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('accessToken', res.user_jwt);
        this.router.navigate(['/']);
      },
      (error: any) => {
        if (error) {
          // this.Errormessgage = true;
        }
      }
    );
  }
}
