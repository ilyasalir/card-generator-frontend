import { Component } from '@angular/core';    
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';    
import { CommonModule } from '@angular/common';    
  
interface FileInputEvent extends Event {  
    target: HTMLInputElement & EventTarget;  
}  
  
@Component({    
  selector: 'app-greeting-card',    
  templateUrl: './greeting-card.component.html',    
  styleUrls: ['./greeting-card.component.css'],    
  standalone: true,    
  imports: [CommonModule, ReactiveFormsModule],    
})    
export class GreetingCardComponent {    
  cardForm: FormGroup;    
  imageUrl: string | ArrayBuffer | null = null;    
    
  constructor(private fb: FormBuilder) {    
    this.cardForm = this.fb.group({    
      dear: ['', Validators.required],    
      message: ['', Validators.required],    
      from: ['', Validators.required],    
      file: [null, Validators.required],    
    });    
  }    
    
  onFileSelected(event: Event): Promise<void> {  
    return new Promise((resolve) => {  
        const target = event.target as HTMLInputElement;  
        console.log('Files:', target.files);  
        if (target.files && target.files.length) {  
            const reader = new FileReader();  
            reader.onload = () => {  
                this.imageUrl = reader.result;  
                this.cardForm.patchValue({ file: target.files![0] });  
                console.log('File selected:', target.files![0]);  
                resolve(); // Resolve the promise when done  
            };  
            reader.readAsDataURL(target.files[0]);  
        } else {  
            resolve(); // Resolve if no files  
        }  
    });  
}  

 
    
  downloadImage() {    
    const canvas = document.createElement('canvas');    
    const ctx = canvas.getContext('2d');    
    const img = new Image();    
    img.src = this.imageUrl as string;    
      
    img.onload = () => {    
      canvas.width = img.width;    
      canvas.height = img.height;   
        
      if (ctx) {  
        ctx.drawImage(img, 0, 0);    
      
        // Set font properties    
        ctx.font = '20px Arial';    
        ctx.fillStyle = 'black';    
      
        const dear = this.cardForm.value.dear;  
        const max = 22;  
        const dearText = dear.length > max ? dear.substring(0, max) : dear;   
        ctx.fillText(dearText, 300, 217);    
      
        const message = this.cardForm.value.message;    
        const maxLength = 30;    
        const message1 = message.length > maxLength ? message.substring(0, maxLength) : message;    
        const message2 = message.length > maxLength ? message.substring(maxLength, 59) : '';    
      
        ctx.fillText(message1, 185, 275);    
        ctx.fillText(message2, 185, 325);    
          
        const from = this.cardForm.value.from;  
        const maxFrom = 25;  
        const fromText = from.length > maxFrom ? from.substring(0, maxFrom) : from;   
        ctx.fillText(fromText, 270, 380);    
      }  
          
      const link = document.createElement('a');    
      link.href = canvas.toDataURL('image/png');    
      link.download = 'greeting-card.png';    
      link.click();    
    };    
  }    
  
  onDragOver(event: DragEvent) {    
    event.preventDefault();    
    event.stopPropagation();    
}    
    
onDragLeave(event: DragEvent) {    
    event.preventDefault();    
    event.stopPropagation();    
}    
    
onDrop(event: DragEvent) {      
    event.preventDefault();      
    event.stopPropagation();      
  
    const files = event.dataTransfer?.files;      
    if (files && files.length > 0) {      
        const fileInputEvent: FileInputEvent = {  
            target: { files: files },  
            currentTarget: null,
            bubbles: false,  
            cancelable: false,  
            composed: false,
        } as FileInputEvent;   
  
        this.onFileSelected(fileInputEvent);      
    }      
}    
}  
