import { TestBed, ComponentFixture } from '@angular/core/testing';  
import { GreetingCardComponent } from './greeting-card.component';  
import { ReactiveFormsModule } from '@angular/forms';  
import { By } from '@angular/platform-browser';  
  
describe('GreetingCardComponent', () => {  
  let component: GreetingCardComponent;  
  let fixture: ComponentFixture<GreetingCardComponent>;  
  
  beforeEach(async () => {  
    await TestBed.configureTestingModule({  
      imports: [GreetingCardComponent, ReactiveFormsModule],  
    }).compileComponents();  
  });  
  
  beforeEach(() => {  
    fixture = TestBed.createComponent(GreetingCardComponent);  
    component = fixture.componentInstance;  
   
    component.cardForm.get('dear')?.setValue('John');  
    component.cardForm.get('message')?.setValue('Happy Birthday!');  
    component.cardForm.get('from')?.setValue('Alice');  
    component.cardForm.get('file')?.setValue(new File([''], 'test-image.png', { type: 'image/png' }));  
  
    fixture.detectChanges();  
  });  
  
  it('should create the component', () => {  
    expect(component).toBeTruthy();  
  });  
  
  it('should have a form with 4 controls', () => {  
    expect(component.cardForm.contains('dear')).toBeTruthy();  
    expect(component.cardForm.contains('message')).toBeTruthy();  
    expect(component.cardForm.contains('from')).toBeTruthy();  
    expect(component.cardForm.contains('file')).toBeTruthy();  
  });  
  
  it('should make the dear control required', () => {  
    const control = component.cardForm.get('dear');  
    control?.setValue('');  
    expect(control?.valid).toBeFalsy();  
  });  
  
  it('should make the message control required', () => {  
    const control = component.cardForm.get('message');  
    control?.setValue('');  
    expect(control?.valid).toBeFalsy();  
  });  
  
  it('should make the from control required', () => {  
    const control = component.cardForm.get('from');  
    control?.setValue('');  
    expect(control?.valid).toBeFalsy();  
  });  
  
  it('should make the file control required', () => {  
    const control = component.cardForm.get('file');  
    control?.setValue(null);  
    expect(control?.valid).toBeFalsy();  
  });  
  
  it('should update imageUrl when a file is selected', async () => {  
    const file = new File([''], 'test-image.png', { type: 'image/png' });  
    const event = { target: { files: [file] } } as unknown as Event;  
    await component.onFileSelected(event);  
    expect(component.imageUrl).toContain('data:image/png;base64');  
  });  
  
  it('should call downloadImage method when download button is clicked', () => {  
    spyOn(component, 'downloadImage').and.callThrough();
    fixture.detectChanges();
  
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));  
    expect(button).toBeTruthy(); 
   
    expect(button.nativeElement.disabled).toBeFalse();  
  
    button.nativeElement.click(); 
    expect(component.downloadImage).toHaveBeenCalled();  
  });  
});  
