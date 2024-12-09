import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { IDropdownPanel } from './model/dropdown-panel';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  template: `
    <ng-template>
    <div (click)="closed.emit()" [ngClass]="class">
      <ng-content></ng-content>
    </div>
  </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass
  ]
})
export class DropdownComponent implements IDropdownPanel {

  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();
  @Output() updatePosition = new EventEmitter();

  @Input() class: string | Array<string> = 'dropdown-menu';
} 
