import { EventEmitter, TemplateRef } from "@angular/core";

export interface IDropdownPanel {
  templateRef: TemplateRef<any>;
  readonly closed: EventEmitter<void>;
  readonly opened: EventEmitter<void>;
  readonly updatePosition: EventEmitter<void>;
}
