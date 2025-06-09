import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser = {
    Name: '',
    Age: '',
    Qualification: ''
  };

  constructor(private userService: UserService, private router: Router) {}

 onRegister(): void {
  this.userService.addUser(this.newUser).subscribe({
    next: () => {
      alert('User registered successfully!');
      this.router.navigate(['/users']);
    },
    error: (err) => {
      console.error('Registration failed:', err);
      alert('Failed to register user!');
    }
  });
}
}
