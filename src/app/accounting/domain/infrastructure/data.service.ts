
import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../common/storage.service';
import { deleteItem, addItem, updateItem} from '../../../shared/utils/array-utils';

@Injectable({
    providedIn: 'root'
})
export class DataService<T> {

    protected readonly service = inject(StorageService)

    public key: string = ''

    getList(): T[] {
        const list = this.service.getItem<T[]>(this.key)
        return list ? list : [];
    }

    deleteItem(predicate: (item: T) => boolean) {

        const array = this.getList()
        const { updatedArray } = deleteItem(array, predicate)
        
        this.service.setItem(this.key, updatedArray)
    }

    addItem(item: T, predicate: (item: T, array: T[]) => T) {

        const array = this.getList()
        const { updatedArray, addedItem } = addItem(array, predicate, item)

        this.service.setItem(this.key, updatedArray)
        return addedItem
    }

    updateItem(item: T, predicate: (item: T) => boolean) {

        const array = this.getList()
        const { updatedArray, updatedItem } = updateItem(
            array,
            predicate,
            arrayItem => ({ ...arrayItem, ...item })
        )

        this.service.setItem(this.key, updatedArray)
        return updatedItem
    }

}
