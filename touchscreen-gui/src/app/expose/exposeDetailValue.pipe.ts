import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'exposeDetailValue'})
export class ExposeDetailValuePipe implements PipeTransform {
    transform(value): string {
        if(value === true || value === "true") {
            return "&#10004;"
        }
        if(value === false || value === "false") {
            return "&#10006;";
        }
        return value;
    }
}
