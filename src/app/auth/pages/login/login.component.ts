import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  constructor() {

  }
login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (success) => {
      if (success) {
        this.router.navigate(['/productos/listar']);
      } else {
        this.notification.error(
          'Error de inicio de sesión', // Título
          'Usuario o contraseña incorrectos' // Mensaje
        );
        
      }
    },
    error: (err) => {
      this.notification.error(
        'Error del servidor',
        'No se pudo iniciar sesión. Intenta nuevamente más tarde.'
      );
      console.error(err);
    },
  });
}

}