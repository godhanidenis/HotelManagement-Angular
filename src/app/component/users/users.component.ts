import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('userModal') userModal: any;

  userList: any;
  isCreateUser: boolean = true;
  userToBeUpdated: any;
  userForm!: FormGroup;

  constructor(private usersService: UsersService) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
      login: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getUserList().subscribe(
      (res) => {
        this.userList = res;
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  openCreateUserModal() {
    this.isCreateUser = true;
    this.userForm.reset();
    this.userForm.get('password')?.addValidators(Validators.required);
  }

  openEditUserModal(userToBeUpdated: any) {
    this.isCreateUser = false;
    this.userForm.get('password')?.clearValidators();
    this.userForm.patchValue(userToBeUpdated);
    this.userToBeUpdated = userToBeUpdated;
  }

  createUser() {
    this.usersService.creatUser(this.userForm.value).subscribe(
      (res) => {
        this.getAllUsers();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  editUser() {
    this.usersService
      .updateUser(this.userToBeUpdated.id, this.userForm.value)
      .subscribe(
        (res) => {
          this.getAllUsers();
        },
        (error) => {
          alert(error.error.error);
        }
      );
  }

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe(
      (res) => {
        this.getAllUsers();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }
}
