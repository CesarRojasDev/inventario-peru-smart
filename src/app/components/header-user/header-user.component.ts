import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [CommonModule,NzIconModule],
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  username: string | null = null;
  dropdownOpen = false;
  authService = inject(AuthService);
  constructor() {
    const userData = localStorage.getItem('usuarioData');
    this.username = userData ? JSON.parse(userData).usuario : null;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
  }
}
