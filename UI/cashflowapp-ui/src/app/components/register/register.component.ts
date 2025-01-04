import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  navigateBack() {
    this.router.navigate(['/user'])
  }

}
