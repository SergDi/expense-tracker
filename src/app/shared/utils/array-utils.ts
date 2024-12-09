import { orderType } from "../types/common.types";

type UpdateFunction<T> = (item: T) => T;

export function addItem<T>(array: T[], predicate: (item: T, array: T[]) => T, newItem: T): { updatedArray: T[]; addedItem: T } {
    
    const addedItem = predicate(newItem, array)
    const updatedArray = [...array, addedItem]

    return { updatedArray, addedItem }
}

export function updateItem<T>(array: T[], predicate: (item: T) => boolean, updateFn: UpdateFunction<T>): { updatedArray: T[]; updatedItem: T | null } {
    
    let updatedItem: T | null = null
    const updatedArray = array.map(item => {
        if (predicate(item)) {
            updatedItem = updateFn(item)
            return updatedItem
        }
        return item
    })

    return { updatedArray, updatedItem }
}

export function deleteItem<T>(array: T[], predicate: (item: T) => boolean): { updatedArray: T[] } {

    const updatedArray = array.filter(item => predicate(item) ? false : true)

    return { updatedArray }
}

export function sortArrayByKey<T, K extends keyof T>(
    array: T[],
    keyOrSelector: K,
    order: orderType = 'asc'
): T[] {
    const compareFn = (a: T, b: T) => {
        const valueA = a[keyOrSelector]
        const valueB = b[keyOrSelector]

        if (valueA < valueB) return order === 'asc' ? -1 : 1
        if (valueA > valueB) return order === 'asc' ? 1 : -1
        return 0;
    }

    return [...array].sort(compareFn)
}