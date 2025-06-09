// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = { id: '', name: '' };
  isLoading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Optional: clear loginData on init

     history.pushState(null, '', location.href);
  window.onpopstate = () => {
    history.go(1);
     };
    this.loginData = { id: '', name: '' };
  }

  login() {
    if (!this.loginData.id || !this.loginData.name) {
      alert('Both ID and Name are required');
      return;
    }

    this.isLoading = true;
    // Call the GET login API
    this.userService.loginUser(this.loginData.id, this.loginData.name).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.success) {
          alert(res.message || 'Login successful');
          this.router.navigate(['/users']);
        } else {
          alert(res.message || 'Invalid ID or Name');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        alert('Server error during login');
      }
    });
  }
  goToRegister() {
  this.router.navigate(['/register']);
}
}
