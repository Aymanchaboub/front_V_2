import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string | undefined;
  message: string | undefined;

  constructor(private http: HttpClient) {}
  onSubmit() {
    this.http.get<boolean>(`http://localhost:8080/api/auth/newsletter/${this.email}`).subscribe(
      (result) => {
        if (result) {
          alert(`L'adresse e-mail ${this.email} existe déjà.`);

        
        } else {
          alert(`L'adresse e-mail ${this.email} n'existe pas.`);


        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}