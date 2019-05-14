import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid Action!!!");
      this.router.navigate(['list-user']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      email: ['',Validators.required],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required]
    });

    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });

    // console.log(this.userService.getUserById(+userId) as user);
    // this.editForm.setValue(this.userService.getUserById(+userId));

  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        }
      )

    // this.userService.updateUser(this.editForm.value);
    // this.router.navigate(['list-user']);
  }

}
