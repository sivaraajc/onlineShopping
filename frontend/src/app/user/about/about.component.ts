import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  backgroundImage = 'assets/logo/bg2.jpg'; 

  users = [
    {
      name: 'Prathap',
      image: 'assets/logo/prathap.jpeg',
      details: 'Founder',
      email:'prathapshanmugam5@gmail.com'
    },
    {
      name: 'Aravindh',
      image: 'assets/logo/aravindh.jpg',
      details: 'CEO',
      email:'aadhiaravindh007@gmail.com'
    },
    {
      name: 'Saran',
      image: 'assets/logo/saran.jpeg',
      details: 'Co-Founder',
      email:'saran@gmail.com'
    },
    {
      name: 'Dhivagar',
      image: 'assets/logo/dhivagar.jpeg',
      details: 'Manager',
      email:'dhivagarmech304@gmail.com'
    },
    // Add more users as needed
  ];

  contactUser(user: any): void {
    const subject = `Regarding ${user.name}`;
    const body = `Hello ${user.name},\n\n`;

    // Construct the mailto URL
    const mailtoUrl = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in a new tab
    window.location.href = mailtoUrl;


}




}
