import { Component, inject, Input } from '@angular/core';
import { ModalRef } from './modal-ref';

@Component({
    template: ``
})
export abstract class ModalComponent<T> {

    private _dialogRef = inject(ModalRef)

    @Input() model!: T

    close() {
        this._dialogRef.close(null)
    }

    save() {
        this._dialogRef.close(this.model)
    }
}
