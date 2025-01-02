import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BirthdayListComponent } from './components/birthday-list/birthday-list.component';
import { BirthdayFormComponent } from './components/birthday-form/birthday-form.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'birthdays', component: BirthdayListComponent, canActivate: [AuthGuard] },
  { path: 'birthdays/new', component: BirthdayFormComponent, canActivate: [AuthGuard] },
  { path: 'birthdays/edit/:id', component: BirthdayFormComponent, canActivate: [AuthGuard] },
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: () => {
      const authService = inject(AuthService);
      return authService.isAuthenticated() ? 'birthdays' : 'login';
    }
  },
  { path: '**', redirectTo: 'login' }
];
