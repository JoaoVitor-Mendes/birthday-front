import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  // Método para fazer login chamando a API
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, { username, password }).pipe()
  }

  register(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/register`, { username, password });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar se o token é válido (por exemplo, se não está expirado)
      return !this.isTokenExpired(token);
    }
    return false;
  }

  // Método para verificar se o token está expirado
  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    const currentTime = Math.floor((new Date).getTime() / 1000);
    return currentTime >= expiry;
  }

  // Método para salvar o token de autenticação
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para remover o token de autenticação (logout)
  removeToken(): void {
    localStorage.removeItem('token');
  }
}

