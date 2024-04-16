import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  backgroundImage = 'assets/logo/bg2.jpg'; 

  users = [
   
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
