import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public CURRENCY: string;
  public NUMERIC: string;
  public ALPHABET: string;
  public PATTERN: string;
  public COMMA: string;
  uiForm = this.formBuilder.group({
    currency: [''],
    numeric: [''],
    alphabet: [''],
    pattern: [''],
    comma: [''],
    formatRegex: ['']
  });

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.CURRENCY = 'CURRENCY';
    this.NUMERIC = 'NUMERIC';
    this.ALPHABET = 'ALPHABET';
    this.PATTERN = 'PATTERN';
    this.COMMA = 'COMMA';
  }
  get currency() {
    return this.uiForm.get('currency');
  }
  get numeric() {
    return this.uiForm.get('numeric');
  }
  get alphabet() {
    return this.uiForm.get('alphabet');
  }
  get pattern() {
    return this.uiForm.get('pattern');
  }
  get comma() {
    return this.uiForm.get('comma');
  }
  get formatRegex() {
    return this.uiForm.get('formatRegex');
  }
  onChangeCurrency() {
    this.currency.patchValue(this.currency.value);
  }
  onChangeNumeric() {
    this.numeric.patchValue(this.numeric.value);
  }
  onChangeAlphabet() {
    this.alphabet.patchValue(this.alphabet.value);
  }
  onChangePattern() {
    this.pattern.patchValue(this.pattern.value);
  }
  onChangeComma() {
    this.comma.patchValue(this.comma.value);
  }
}
