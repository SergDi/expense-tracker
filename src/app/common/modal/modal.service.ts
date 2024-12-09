import { inject, Injectable, Injector } from '@angular/core';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalRef } from './modal-ref';

export interface ModalConfig {
    injector?: Injector;
    initialState?: any;

    class?: string | string[];
    hasBackdrop?: boolean;
    backdropClass?: string | string[];
}

export function useModalDialog() {

    const injector = inject(Injector);
    const modalService = inject(ModalService);

    return {
        open<T>(template: ComponentType<T>, config?: ModalConfig): ModalRef {
            const newConfig: ModalConfig = { injector, ...config };
            return modalService.open(template, newConfig)
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    protected readonly overlay = inject(Overlay);
    protected readonly injector = inject(Injector);

    open<T>(component: ComponentType<T>, config: ModalConfig): ModalRef {

        const positionStrategy =
            this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically()

        const overlayRef = this.overlay.create({
            panelClass: config.class,
            hasBackdrop: config.hasBackdrop || true,
            backdropClass: config.backdropClass,
            positionStrategy: positionStrategy,
        });

        // Create dialogRef to return
        const dialogRef = new ModalRef(overlayRef);
        // Create injector to be able to reference the DialogRef from within the component
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: ModalRef, useValue: dialogRef }
            ],
        });
        // Attach component portal to the overlay
        const portal = new ComponentPortal(component, null, injector);
        const componentRef = overlayRef.attach(portal);

        if (config?.initialState) {
            Object.keys(config.initialState).forEach((key: string) => {
                componentRef.setInput(key, config.initialState[key])
            });
        }

        return dialogRef;
    }
}