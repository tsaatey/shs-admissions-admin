import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ghanaCediFormat',
})
export class GhanaCediFormatPipe implements PipeTransform {
  transform(value: number): string {
    let formattedValue = '0.00';

    // Ensure the value is a number and format it to 2 decimal places
    if (value) {
      formattedValue = value.toFixed(2);
    }

    // Prefix with the Ghanaian cedi symbol
    return `GH₵${formattedValue}`;
  }
}
