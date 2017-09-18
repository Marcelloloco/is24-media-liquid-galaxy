import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'maxLength'})
export class MaxLengthPipe implements PipeTransform {
    transform(value, length): string {
        let limit = length ? parseInt(length, 10) : -1;
        let trail = '...';
        if(limit === -1 || value.length <= limit) {
           return value;
        }
        return value.substring(0, limit) + trail;
    }
}
