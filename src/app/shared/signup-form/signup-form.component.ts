import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '@capacitor/app';
import { userSignup } from 'src/app/store/actions/user/user.actions';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/store/selectors/user/user.selectors';
import { skip } from 'rxjs/operators';
import { SigninFormComponent } from '../signin-form/signin-form.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {

  days: any = [];
  months: any = [];
  years: any = [];
  day: string;
  month: string;
  year: string;

  formGroup: any = FormGroup;
  user$: Observable<any>;

  constructor(
    public modalController: ModalController,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private _actionSubject$: ActionsSubject,
  ) { 
    this.user$ = this._store.pipe(select(selectUser));
  }

  /**
   * Present sign form modal
   */
  async presentSignFormModal() {
    const modal = await this.modalController.create({
      component: SigninFormComponent,
    });

    await this.modalController.dismiss();
    await modal.present();
  }

  ngOnInit() { 
    this.formGroup = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
      name: ['', [Validators.required]],
      day: ['', [Validators.required, Validators.minLength(1)]],
      month: ['', [Validators.required, Validators.minLength(1)]],
      year: ['', [Validators.required, Validators.minLength(4)]],
    });

    // Listen ngrx
    this._actionSubject$.pipe(skip(1))
      .subscribe((action: any) => {
        switch (action.type) {
          case '[User] Signin Success':
            this.modalController.dismiss();
            break;
          default:
            // no action
        }
      });
  }

  onFormSubmit() {
    const _day = this.formGroup.value.day;
    const _month = this.formGroup.value.month;
    const _year = this.formGroup.value.year;
    const _username = this.formGroup.value.username;
    const _name = this.formGroup.value.name;

    const data = {
      username: _username,
      name: _name,
      nickname: _name,
      password: _day + '-' + _month + '-' + _year,
      email: _username + '@asistenbelanja.com',
      roles: ['author'],
    }

    this._store.dispatch(userSignup({ data: data }));
  }

  ionViewDidEnter() {
    this.day = moment().format('D');
    this.month = moment().format('M');

    const _year = +moment().format('YYYY');
    this.year = _year.toString();

    let arrDays = [];
    let arrYears = [];
    let daysInMonth = moment().daysInMonth();

    while (daysInMonth) {
      var current = moment().date(daysInMonth).format('D');
      arrDays.push(current);
      daysInMonth--;
    }

    this.days = arrDays.reverse();

    for (let i = 1; i <= 12; i++) {
      let name = moment().month(i-1).format('MMM');
      this.months.push({'number': i, 'name': name});
    }

    // If you want an inclusive end date (fully-closed interval)
    var a = moment((_year - 70) + '-01-01');
    var b = moment(_year - 14 + '-01-01');

    for (var m = moment(a); m.diff(b, 'years') <= 0; m.add(1, 'years')) {
      arrYears.push(m.format('YYYY').toString());
    }

    this.years = arrYears.reverse();
  }
  
  onSignin() {
    this.presentSignFormModal();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

}
