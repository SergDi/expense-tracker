import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from "rxjs";

export class ModalRef {

    private afterClosedSubject = new Subject<any>();

    constructor(private overlayRef: OverlayRef) { }

    close(result: any) {
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();

        this.overlayRef.detach();
        this.overlayRef.dispose();
    }

    afterClosed(): Observable<any> {
        return this.afterClosedSubject.asObservable();
    }
}