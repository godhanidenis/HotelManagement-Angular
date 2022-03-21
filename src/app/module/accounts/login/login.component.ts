import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMsg: string = '';

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}
  profileForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.service.login(this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('accessToken', res.user_jwt);
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.errorMsg = error.error.error;
      }
    );
  }
}
