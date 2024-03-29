import {FormGroup} from "@angular/forms";

export function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}

export function displayFieldCss(field: string, form: FormGroup) {
  return {
    'invalid': isFieldInvalid(field, form)
  };
}

export function getSafe(fn: Function): any | undefined {
  try {
    return fn();
  } catch (e) {
    return undefined;
  }
}

export function isFieldInvalid(field: string, form: FormGroup): boolean {
  return getSafe(() => !form.get(field).valid && form.get(field).touched);
}

export function isFieldHasError(field: string, error: string, form: FormGroup): boolean {
  return getSafe(() => isFieldInvalid(field, form) && form.get(field).hasError(error));
}

export class Utils {

}
