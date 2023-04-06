import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class Header1Component implements OnInit,AfterViewInit {

  content?: string;

  constructor(private userService: UserService) { }
  ngAfterViewInit(): void {
    const script1 = document.createElement('script');
    script1.src = './main-js.js';
    document.body.appendChild(script1);
    const script2 = document.createElement('script');
    script2.src = './main.js';
    document.body.appendChild(script2);
    const script3= document.createElement('script');
    script3.src = 'assets/libs/js/dashboard-ecommerce.js';
    document.body.appendChild(script3);
    const script4= document.createElement('script');
    script4.src = 'assets/libs/js/dashboard-finance.js';
    document.body.appendChild(script4);
    const script5= document.createElement('script');
    script5.src = 'assets/libs/js/dashboard-influencer.js';
    document.body.appendChild(script5);
    const script6= document.createElement('script');
    script6.src = 'assets/libs/js/dashboard-sales.js';
    document.body.appendChild(script6);
    const script7= document.createElement('script');
    script7.src = 'assets/libs/js/gmaps.min.js';
    document.body.appendChild(script7);
    const script8= document.createElement('script');
    script8.src = 'assets/libs/js/google_map.js';
    document.body.appendChild(script8);
    const script9= document.createElement('script');
    script9.src = 'assets/libs/js/jvectormap.custom.js';
    document.body.appendChild(script9);
    const script10= document.createElement('script');
    script10.src = 'assets/vendor/jquery/jquery-3.3.1.min.js';
    document.body.appendChild(script10);
    const script11= document.createElement('script');
    script11.src = 'assets/vendor/bootstrap/js/bootstrap.bundle.js';
    document.body.appendChild(script11);
    const script12= document.createElement('script');
    script12.src = 'assets/vendor/slimscroll/jquery.slimscroll.js';
    document.body.appendChild(script12);
    const script13= document.createElement('script');
    script13.src = 'assets/vendor/charts/chartist-bundle/chartist.min.js';
    document.body.appendChild(script13);
    const script14= document.createElement('script');
    script14.src = 'assets/vendor/charts/sparkline/jquery.sparkline.js';
    document.body.appendChild(script14);
    const script15= document.createElement('script');
    script15.src = 'assets/vendor/charts/morris-bundle/raphael.min.js';
    document.body.appendChild(script15);
    const script16= document.createElement('script');
    script16.src = 'assets/vendor/charts/morris-bundle/morris.js';
    document.body.appendChild(script15);
    const script17= document.createElement('script');
    script17.src = 'assets/vendor/charts/c3charts/c3.min.js';
    document.body.appendChild(script17);
    const script18= document.createElement('script');
    script18.src = 'assets/vendor/charts/c3charts/d3-5.4.0.min.js';
    document.body.appendChild(script18);
    const script19= document.createElement('script');
    script19.src = 'assets/vendor/charts/c3charts/C3chartjs.js';
    document.body.appendChild(script19);

    const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './fonts/material-design-iconic-font/css/materialdesignicons.min.css';
document.head.appendChild(link);

  }


  ngOnInit(): void {

    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

}
