
# NgxFormatField
* A Directive to `format` the model value which will appear in the view. It will not manipulate the Input value which will be saved in the model.

## Usage
### Add the following directive as per requirement: 
*	Comma Seperator Field with round off: `[appFormatFields]="CURRENCY"`.
*	Comma Seperator Field: `[appFormatFields]="COMMA"`.
*   Numeric Field with round off: `[appFormatFields]="NUMERIC"`.
*	Alphabet Field: `[appFormatFields]="ALPHABET"`.
*	For dynamic Regex Format: `[appFormatFields]="PATTERN”`, `[formatRegex]="formatRegex"` where `‘formatRegex’` is a dynamic regex pattern to be mentioned by the user in component.ts.

## Implementation
`Replace the ‘CURRENCY’ with the directive as per requirement.`

### 1)	In module.ts
```typescript
import { NgxFormatFieldModule } from 'ngx-format-field';
imports: [ NgxFormatFieldModule ]
```

### 2)	In component.ts
```typescript
public CURRENCY: string;
public formatRegex: string;
uiForm = this.formBuilder.group({
currency: [''],
});
ngOnInit() {
this.CURRENCY = 'CURRENCY';
this. formatRegex = '^[0-9!@#$%^&]+$ ';
}
get currency() {
    return this.uiForm.get('currency');
}
onChangeCurrency() {
this.currency.patchValue(this.currency.value);
}
```
### 3) In HTML
For Currency:
```typescript
<input type="text" formControlName="currency" [appFormatFields]="CURRENCY"
(change)="onChangeCurrency()">
```
For Dynamic Regex Check:
```typescript
<input type="text" formControlName="pattern" [appFormatFields]="PATTERN"
[formatRegex]="formatRegex" (change)="onChangePattern()">
```

## Output

| Directive Attribute |  Attribute    |  Input         | Value which will appear in the view on tab out | Input value which will be saved in the model |
| ------------------- | ------------- | -------------  | ---------------------------------------------- | -------------------------------------------- |
| [appFormatFields]   | [formatRegex] |                |                                                |                                              |
| &quot;CURRENCY&quot;|               | 12345.6789     |          12,346                                | 12345.6789                                   |
|                     |               |abcd489739abc   |                                                |                                              |
| &quot;COMMA&quot;   |               |12345.6789      | 12,345.679                                     | 12345.6789                                   |
|                     |               |abcd489739abc   |                                                |                                              |
| &quot;NUMERIC&quot; |               |1234.567        | 1235                                           | 1234.567                                     |
|                     |               |1234abc         |                                                |                                              |
| &quot;ALPHABET&quot;|               |ABCDabcd        | ABCDabcd                                       | ABCDabcd                                     |
|                     |               |ABCDabcd1234    |                                                |                                              |
| &quot;PATTERN&quot; | ^[0-9!@#$%^&amp;]+$ | 123!@#$123  | 123!@#$123                                  | 123!@#$123                                   |
|                     |               |1234abc         |                                                |                                              |