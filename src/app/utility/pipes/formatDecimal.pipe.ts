import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDecimal'
})
export class FormatDecimalPipe {
    transform(value: number, args?: string): number {
        let decimalPointIndex = args ? parseInt(args, 10) : 2;
        if (isNaN(value)) {
            value = 0
        }
        const decimals = value.toString().split('.')[1];
        return decimals && decimals.length > decimalPointIndex ? +value.toFixed(2) : value
    }
}