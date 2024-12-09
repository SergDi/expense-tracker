import { inject, Pipe, PipeTransform } from "@angular/core";
import { AccountingFacade } from "../../domain/application/accounting.facade";

@Pipe({ name: 'categoryName' })
export class CategoryNamePipe implements PipeTransform {

    protected readonly accountingFacade = inject(AccountingFacade)

    transform(value: number) {
        const categories = this.accountingFacade.categories()
        const category = categories.find(f => f.id === value)
        return category ? category.name : value;
    }
}