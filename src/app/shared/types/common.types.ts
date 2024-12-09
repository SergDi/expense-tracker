export type orderType = 'asc' | 'desc'

export type SortBy<T> = {
    key: keyof T,
    order: orderType
}