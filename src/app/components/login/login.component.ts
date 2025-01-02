import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/birthdays']);
      },
      (error) => {
        let errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
        
        if (error.status === 400 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: errorMessage,
        });
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
