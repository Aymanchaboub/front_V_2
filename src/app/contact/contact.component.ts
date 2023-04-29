import { ContactService } from './../_services/contact.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact = { name: '', email: '', subject: '', message: '' };
  serverUrl = 'http://localhost:8080/api/auth/contact';

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.http.post(this.serverUrl, this.contact).subscribe(() => {
      alert('Votre message a été envoyé avec succès.');
      this.router.navigate(['/home']);

    });
  }

}