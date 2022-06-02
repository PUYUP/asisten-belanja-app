import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { IonicModule } from '@ionic/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SigninFormComponent,
    SignupFormComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    SigninFormComponent,
    SignupFormComponent,
    CalendarComponent,
  ]
})
export class SharedModule { }
