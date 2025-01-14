import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from './../../interfaces/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Registration form model
  registerForm: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  navigateBack() {
    this.router.navigate(['/user']);
  }

  onRegister() {
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData: User = {
      name: this.registerForm.name,
      email: this.registerForm.email,
      password: this.registerForm.password,
    };

    this.userService
      .createUser(userData)
      .subscribe({
        next: (response) => {
          alert('Registration successful!');
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
        },
      });
  }
}
