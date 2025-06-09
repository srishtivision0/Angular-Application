import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1 style="text-align: center;">E-Commerce Application</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
