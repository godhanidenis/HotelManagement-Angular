import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  errorMessage: any;

  repos: [] = [];
  profileForm = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
  });
  showErrorMsg: boolean | undefined;
  successMsg: boolean | undefined;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.registartiom(this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.successMsg = true;
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        if (error) {
          this.showErrorMsg = true;
        }
      }
    );
  }
}
