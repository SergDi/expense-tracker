import { Directive, ElementRef, Input, OnInit, OnDestroy, ViewContainerRef, inject } from '@angular/core';
import { fromEvent, Observable, merge, Subscription } from 'rxjs';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';

import { TemplatePortal } from '@angular/cdk/portal';
import { filter, takeUntil } from 'rxjs/operators';

import { IDropdownPanel } from './model/dropdown-panel';
import { positions, PositionTypeEnum } from './model/positions';
import { Config } from './model/config';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit, OnDestroy {

  @Input('appDropdown') public dropdownPanel!: IDropdownPanel;

  @Input('skyDropdownConfig') config!: Config

  get origin() {
    return this.host.nativeElement;
  }

  private overlayRef!: OverlayRef;
  private isDropdownOpen!: boolean;
  private dropdownClosingActionsSub$!: Subscription;

  protected overlayPositionBuilder = inject(OverlayPositionBuilder);

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay) {
  }

  ngOnInit(): void {

    const sources = [fromEvent(this.origin, 'click')];

    merge(...sources).subscribe(() => this.toggleDropdown());

    this.dropdownPanel.updatePosition.subscribe(_=> this.updateDropdownPosition());
  }

  ngOnDestroy(): void {

    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  private openDropdown() {

    this.isDropdownOpen = true;
    this.dropdownPanel.opened.next();

    const positionStrategy = this.getOverlayPosition(this.origin, this.config?.position, this.config?.offsetX, this.config?.offsetY);
    
    this.overlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy
    });

    const template = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef
    );
    this.overlayRef.attach(template);

    this.dropdownClosingActionsSub$ = this.dropdownClosingActions().subscribe(() => this.destroyDropdown());
  }

  
  private destroyDropdown(): void {

    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub$.unsubscribe();
    this.overlayRef.detach();

    this.isDropdownOpen = false;
    this.dropdownPanel.closed.next();
  }

  private updateDropdownPosition() {
    setTimeout((_: any)=> this.overlayRef.updatePosition());
  }

  private getOverlayPosition(element: HTMLInputElement, positionType: PositionTypeEnum,  offsetX: number, offsetY: number) {

    let positionsArray = Object.keys(positions).map(key => positions[key as PositionTypeEnum])

    if(positionType) {
      const position = positions[positionType as keyof typeof positions];
      position.offsetX = offsetX || position.offsetX;
      position.offsetY = offsetY || position.offsetY;

      positionsArray = [position]
    }

    return this.overlayPositionBuilder
        .flexibleConnectedTo(element)
        .withPositions(positionsArray)
        .withFlexibleDimensions(false)
        .withPush(false);
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const outside = overlayClickOutside(this.overlayRef, this.origin);
    const closed = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, outside, closed);
  }
}

export function overlayClickOutside( overlayRef: OverlayRef, origin: HTMLElement) {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = !origin.contains(clickTarget); // the input
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false); // the dropdown
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    )
}
