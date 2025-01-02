import { Component, OnInit } from '@angular/core';
import { BirthdayService } from '../../services/birthday.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-birthday-list',
  templateUrl: './birthday-list.component.html',
  styleUrls: ['./birthday-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BirthdayListComponent implements OnInit {
  birthdays: any[] = [];

  constructor(
    private birthdayService: BirthdayService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.birthdayService.getBirthdays().subscribe((data: any) => {
      const currentYear = new Date().getFullYear();
      this.birthdays = data.map((b: any) => {
        const [day, month] = b.date.split('/');
        if (day && month) {
          const formattedDate = formatDate(new Date(currentYear, parseInt(month) - 1, parseInt(day)), 'dd/MM/yyyy', 'en-US');
          return {
            ...b,
            date: formattedDate
          };
        } else {
          return {
            ...b,
            date: 'Data Inválida'
          };
        }
      });
    });
  }

  goToNewBirthday() {
    this.router.navigate(['/birthdays/new']);
  }

  updateBirthday(id: string) {
    this.router.navigate(['/birthdays/edit', id]);
  }

  deleteBirthday(id: string) {
    this.birthdayService.deleteBirthday(id).subscribe(() => {
      this.birthdays = this.birthdays.filter(b => b.id !== id);
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']); // Exemplo de redirecionamento para a página de login
  }
}
