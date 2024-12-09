import { computed, inject } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntities, addEntity, entityConfig, removeEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { CategoriesService } from '../infrastructure/categories.service';
import { Category } from '../../../accounting/domain/entities/category';

export interface CategoriesState {
    loading: boolean;
    error: string | null,
}

const initialState: CategoriesState = {
    loading: false,
    error: null,
}

const categoriesConfig = entityConfig({
    entity: type<Category>(),
    collection: 'categories',
    selectId: (category) => category?.id,
}); 

export function withCategories() {
    return signalStoreFeature(
        withState(initialState),
        withEntities(categoriesConfig),
        withComputed(({ categoriesEntities }) => ({
            categories: computed(() => {
                const categories = categoriesEntities()
                return categories
            }),
            categoriesLength: computed(() => {
                const categories = categoriesEntities()
                return categories.length
            })
        })),
        withMethods((store) => ({
            setLoading(loading: boolean) {
                patchState(store, () => ({ loading }))
            },
        })),
        withMethods((store, categoriesService = inject(CategoriesService)) => ({
            getCategories() {
                store.setLoading(true)

                const categories = categoriesService.getList()
                patchState(store, addEntities(categories, categoriesConfig))

                store.setLoading(false)
            },
            deleteCategory(model: Category) {
                store.setLoading(true)
                
                categoriesService.deleteItem(item => item.id === model.id)
                patchState(store, removeEntity(model.id, categoriesConfig))
                
                store.setLoading(false)
            },
            addCategory(model: Category) {
                store.setLoading(true)

                if (model.id) {
                    const item = categoriesService.updateItem(model, item => item.id === model.id)
                    patchState(store, updateEntity({ id: model.id, changes: { ...item}}, categoriesConfig))
                } else {
                    const newItem = categoriesService.addItem(model, (item, array) => { item.id = array.length + 1; return item})
                    patchState(store, addEntity(newItem, categoriesConfig))
                }

                store.setLoading(false)    
            },
        })),
        withHooks({
            onInit(store) {
                store.getCategories()
            },
        }),
    )
}