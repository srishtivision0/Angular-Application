import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-grid',
  standalone: true,
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css'],
  imports: [CommonModule, FormsModule],
  template: `
    <h2>User Grid</h2>
    <table border="1" *ngIf="users.length > 0">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Qualification</th>
        <th>Action</th>
      </tr>
      <tr *ngFor="let user of users; let i = index">
        <ng-container *ngIf="editIndex !== i; else editMode">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.qualification }}</td>
          <td>
            <button (click)="onEdit(i)">Edit</button>
          </td>
        </ng-container>
        <ng-template #editMode>
          <td>{{ user.id }}</td>
          <td><input [(ngModel)]="users[i].name" /></td>
          <td><input type="number" [(ngModel)]="users[i].age" /></td>
          <td><input [(ngModel)]="users[i].qualification" /></td>
          <td>
            <button (click)="onUpdate(i)">Update</button>
            <button (click)="onCancel()">Cancel</button>
            
          </td>
        </ng-template>
      </tr>
    </table>
  `
})
export class UserGridComponent implements OnInit {
  users: any[] = [];
  editIndex: number | null = null;
  originalUser: any = null;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error loading users', err)
    });
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.originalUser = { ...this.users[index] };
  }

  onUpdate(index: number) {
    console.log('Updated user:', this.users[index]);
    this.editIndex = null;
    this.originalUser = null;
  }

  onCancel() {
    if (this.editIndex !== null && this.originalUser) {
      this.users[this.editIndex] = this.originalUser;
      this.editIndex = null;
      this.originalUser = null;
    }
  }
  onDelete(id: number): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Refresh list
    });
  }
  
}
canActivate(): boolean {
  const isLoggedIn = !!localStorage.getItem('authToken');
  if (isLoggedIn) {
    
    return true;
  }
  else{
    this.router.navigate(['/login']);

  }
  return false;
}

 logout(): void {


    // Agar localStorage/sessionStorage me koi authToken/store hai, to clear kar sakte ho:
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.clear();
    localStorage.clear();
    // Fir user ko login page pe bhej do:
    this.router.navigate(['/login']);

}


}