import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[nshToggleTemplate]' })

export class ToggleTemplateDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }

  @Input() set nshToggleTemplate(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
