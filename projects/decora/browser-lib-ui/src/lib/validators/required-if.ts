import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function RequiredIf(requiredIf: boolean): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (requiredIf) {

      const modelHasNoValue = value === null || value === undefined || value === '';

      if (modelHasNoValue) {

        return {
          requiredIf: {
            condition: requiredIf
          }
        };

      } else {

        return null;

      }

    } else {

      return null;

    }

  };

}
