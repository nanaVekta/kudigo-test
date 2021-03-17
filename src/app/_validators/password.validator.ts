import { AbstractControl, ValidatorFn } from "@angular/forms";

export class PasswordValidator {
  static equalTo(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input;
      if(!isValid) {
        return { 'equalTo': {isValid}}
      }
      else{
        return null;
      }
    }
  }
}
