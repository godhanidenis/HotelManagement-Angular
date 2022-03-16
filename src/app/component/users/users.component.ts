import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: any;
  closeResult = '';
  createUser: boolean = false;
  userId = '';

  usersForm = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getUserList().subscribe(
      (res) => {
        this.userList = res;
      },
      (error) => {
        alert(error);
      }
    );
  }

  open(content: any, condition: boolean) {
    this.createUser = condition;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.usersService.creatUsers(this.usersForm.value).subscribe((res) => {
      this.getAllUsers();
    });
  }

  editUser(content: any, users: any) {
    this.open(content, true);
    this.usersForm.patchValue(users);
    this.userId = users.id;
  }

  editUserForm() {
    this.usersService
      .updateUsers(this.userId, this.usersForm.value)
      .subscribe((res) => {
        this.getAllUsers();
      });
  }

  deleteUser(id: any) {
    this.usersService.deleteUsers(id).subscribe(
      (res) => {
        this.getAllUsers();
      },
      (error) => {
        alert(error);
      }
    );
  }
}
