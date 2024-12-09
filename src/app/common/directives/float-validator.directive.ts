import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export const options = {
    decimalSeparator: (1.1).toLocaleString().substring(1, 2),
    defaultSeparator: '.'
};

@Directive({
  selector: '[floatValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FloatValidatorDirective,
      multi: true,
    },
  ],
})
export class FloatValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {

    const float = (value: string) => {
        if (!value) {
            return true;
        }
        return new RegExp('^-?[0-9]\\d*(\\' + options.defaultSeparator + '\\d+)?$').test(value) && !isNaN(parseFloat(value));
    }

    const value = control.value;
    if (!float(value)) {
      return { floatError: true };
    }
    return null;
  }
}