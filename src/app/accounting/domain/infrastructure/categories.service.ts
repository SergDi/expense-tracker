
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Category } from '../entities/category';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService extends DataService<Category>  {

    override key = 'categories'
}
