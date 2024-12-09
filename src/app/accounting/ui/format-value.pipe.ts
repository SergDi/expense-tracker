import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: 'formatValue' })
export class FormatValuePipe implements PipeTransform {

    transform(value: string | number, type: PipeTransform | null, format: string | null) {

        if(type) {
            return type.transform(value, format)
        }

        return value
       
    }
}