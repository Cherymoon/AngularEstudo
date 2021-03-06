import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {


  @Input() options: RadioOption[]
  value: any;
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(option: RadioOption) {
    this.value = option;
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }



}
