import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.sass']
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg: string;
}
