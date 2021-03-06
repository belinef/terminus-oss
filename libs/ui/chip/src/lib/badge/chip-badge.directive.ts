import {
  Directive,
  ElementRef,
  Host,
} from '@angular/core';
import type { OnInit } from '@angular/core';

import { TsChipComponent } from '../chip/chip.component';

@Directive({ selector: '[tsChipBadge]' })
export class TsChipBadgeDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    @Host() private parent: TsChipComponent,
  ) {}

  public ngOnInit(): void {
    this.parent.isFocusable = false;
    this.parent.isRemovable = false;
    this.parent.isSelectable = false;
    this.elementRef.nativeElement.classList.add('ts-chip--badge');
  }
}
