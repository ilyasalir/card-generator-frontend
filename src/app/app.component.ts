import { Component } from '@angular/core';  
import { GreetingCardComponent } from './greeting-card/greeting-card.component';  

@Component({  
  selector: 'app-root',  
  template: `<app-greeting-card></app-greeting-card>`,  
  standalone: true,  
  imports: [GreetingCardComponent],  
})  
export class AppComponent {
  title = 'greeting-card-generator';
}  
