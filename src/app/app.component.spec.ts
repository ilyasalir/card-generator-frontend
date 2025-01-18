import { TestBed } from '@angular/core/testing';  
import { AppComponent } from './app.component';  
import { CommonModule } from '@angular/common'; // Import CommonModule  
  
describe('AppComponent', () => {  
  beforeEach(async () => {  
    await TestBed.configureTestingModule({  
      imports: [CommonModule, AppComponent], // Include CommonModule  
    }).compileComponents();  
  });  
  
  it('should create the app', () => {  
    const fixture = TestBed.createComponent(AppComponent);  
    const app = fixture.componentInstance;  
    expect(app).toBeTruthy();  
  });
});  
