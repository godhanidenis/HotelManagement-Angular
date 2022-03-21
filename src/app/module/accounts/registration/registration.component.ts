import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  errorMsg: any;

  repos: [] = [];
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.registartiom(this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        this.errorMsg = error.error.error;
      }
    );
  }
}
