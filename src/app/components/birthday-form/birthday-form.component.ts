import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirthdayService } from '../../services/birthday.service';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho do serviço de autenticação

@Component({
  selector: 'app-birthday-form',
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BirthdayFormComponent implements OnInit {
  birthdayForm: FormGroup;
  birthdayId: string | null = null;

  constructor(
    private birthdayService: BirthdayService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Adicione o serviço de autenticação
  ) {
    this.birthdayForm = new FormGroup({
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.birthdayId = this.route.snapshot.paramMap.get('id');
    if (this.birthdayId) {
      this.birthdayService.getBirthdayById(this.birthdayId).subscribe((birthday: any) => {
        const currentYear = new Date().getFullYear();
        const [day, month] = birthday.date.split('/');
        const formattedDate = `${currentYear}-${month}-${day}`; // Formato compatível com input de data nativo
        this.birthdayForm.patchValue({
          date: formattedDate,
          description: birthday.description
        });
      });
    }
  }

  saveBirthday() {
    if (this.birthdayForm.valid) {
      const formValues = this.birthdayForm.value;
      const dateMoment = moment(formValues.date, 'YYYY-MM-DD');
      const formattedDate = dateMoment.format('DD/MM');
      const newBirthday = { date: formattedDate, description: formValues.description };
      if (this.birthdayId) {
        this.birthdayService.updateBirthday(this.birthdayId, newBirthday).subscribe(() => {
          this.router.navigate(['/birthdays']);
        });
      } else {
        this.birthdayService.addBirthday(newBirthday).subscribe(() => {
          this.router.navigate(['/birthdays']);
        });
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  goBack() {
    this.router.navigate(['/birthdays']);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']); // Redirecionar para a página de login após logout
  }
}
