import { Directive, ElementRef, HostListener, Input, Renderer2, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Directive({
  selector: '[appFormatFields]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxFormateFieldDirective), multi: true
    }
  ]
})
export class NgxFormateFieldDirective implements ControlValueAccessor {

  @Input('appFormatFields') appFormatFields: string;
  @Input('formatRegex') formatRegex: string;

  public onChange;
  public formattedValue: string[];

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  /**
   * Function to change the formatted value to Orignal form
   * @param value Value after writeValue method is called
   */
  @HostListener('input', ['$event.target.value'])
  private input(value) {

    if (this.appFormatFields === 'CURRENCY' || this.appFormatFields === 'COMMA' || this.appFormatFields === 'NUMERIC') {
      value = value.split(',').join('');
      value = this.regexChecker('^[0-9]+(.[0-9]+)?$', value);
    }
    if (this.appFormatFields === 'ALPHABET') {
      value = this.regexChecker('^[A-Za-z]+$', value);
    }
    if (this.appFormatFields === 'PATTERN') {
      value = this.regexChecker(this.formatRegex, value);
    }
    this.onChange(value);
  }
/**
 * Formats the value in input field.
 * @param value Value in the input field
 */
  public writeValue(value: any): void {
    if (value) {
      switch (this.appFormatFields) {
        case 'NUMERIC': // checks only number else make field 0
          value = this.regexFormater('^[0-9]+(.[0-9]+)?$', value);
          break;
        case 'ALPHABET': // checks only alphabet else make field blank string
          const pattern = '^[A-Za-z]+$';
          const formattedValue = value.match(pattern);
          value = formattedValue ? formattedValue[0] : '';
          break;
        case 'PATTERN': // checks only pattern else make field blank string
          if (this.formatRegex) {
            const patternValue = value.match(this.formatRegex);
            value = patternValue ? patternValue[0] : '';
          }
          break;
        case 'CURRENCY': // checks number & format into currency else make field 0
          let currency: number;
          const cur = this.regexFormater('^[0-9]+(.[0-9]+)?$', value);
          if (!isNaN(parseFloat(cur))) {
            value = parseFloat(cur).toLocaleString();
          }
          break;
        case 'COMMA':
          if (!isNaN(parseFloat(value))) {
            value = parseFloat(value).toLocaleString('en', { maximumFractionDigits: 20 });
          } else { value = ''; }
      }
    }
    const element = this.el.nativeElement;
    this.renderer.setProperty(element, 'value', value);
  }
  public regexChecker(pattern: string, value: any) {
    this.formattedValue = value.match(pattern);
    value = this.formattedValue ? this.formattedValue[0] : '';
    return value.toString();
  }
  public regexFormater(pattern: string, value: any) {
    this.formattedValue = value.match(pattern);
    value = this.formattedValue ? this.formattedValue[0] : '';
    let currency = Math.round(parseFloat(('' + value)));
    currency = isNaN(currency) ? 0 : currency;
    return currency.toString();

  }
/**
 * Function inherited from ControlValueAccessor
 */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
 /**
 * Function inherited from ControlValueAccessor
 */
  public registerOnTouched(fn: any): void {
    // registerOnTouched is function of ControlValueAccessor
  }
 /**
 * Function toset the disable property of form
 */
  public setDisabledState(isDisabled: boolean): void {
    const element = this.el.nativeElement;
    this.renderer.setProperty(element, 'disabled', isDisabled);
  }
}
