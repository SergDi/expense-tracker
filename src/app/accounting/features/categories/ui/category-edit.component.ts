import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../common/modal/modal.component';
import { Category } from '../../../domain/entities/category';
import { SvgIconComponent } from "../../../../common/icons/svg-icon.component";

@Component({
    selector: 'category-edit',
    template: `
        <div class="modal">
            <header>
                <h3>{{ model.id ? 'Edit' : 'Add' }} Category</h3>
                <button (click)="close()"><svg-icon name="close"/></button>
            </header>
            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <input [(ngModel)]="model.name" placeholder="Name" />
                </div>
            </div>
            <footer>
                <button (click)="close()">Close</button>
                <button (click)="save()" class="add">Save</button>
            </footer>
        </div>
    `,
    imports: [
        FormsModule,
        SvgIconComponent
    ]
})
export class CategoryEditComponent extends ModalComponent<Category> {

}