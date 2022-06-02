import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-address-editor',
  templateUrl: './cart-address-editor.component.html',
  styleUrls: ['./cart-address-editor.component.scss'],
})
export class CartAddressEditorComponent implements OnInit {

  @ViewChild('myForm') ngForm: NgForm;
  
  @Input('address') address: string;
  @Input('note') note: string;

  formGroup: FormGroup;

  constructor(
    public modalController: ModalController,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() { 
    this.formGroup = this._fb.group({
      'address': [this.address, [Validators.required]],
      'note': [this.note],
    });
  }

  onFormSubmit() {
    this.modalController.dismiss({...this.formGroup.value});
  }

  onSave() {
    this.ngForm.ngSubmit.emit();
  }
  
  onDismiss() {
    this.modalController.dismiss();
  }

}
