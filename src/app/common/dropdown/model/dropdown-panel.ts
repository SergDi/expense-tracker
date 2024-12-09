import { EventEmitter, TemplateRef } from "@angular/core";

export interface IDropdownPanel {
  templateRef: TemplateRef<object>;
  readonly closed: EventEmitter<void>;
  readonly opened: EventEmitter<void>;
  readonly updatePosition: EventEmitter<void>;
}
