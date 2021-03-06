import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkAccordion } from '@angular/cdk/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import type {
  AfterContentInit,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { KEYS } from '@terminus/fe-utilities';

import { TsExpansionPanelTriggerComponent } from '../trigger/expansion-panel-trigger.component';
import {
  TS_ACCORDION,
  TsAccordionBase,
} from './accordion-base';


/**
 * Component to allow multiple {@link TsExpansionPanelComponent}'s to function as an accordion.
 *
 * @example
 * <ts-accordion
 *               [multi]="true"
 *               [hideToggle]="true"
 *               (destroyed)="accordionDestroyed()"
 * >
 *               <ts-expansion-panel>
 *                 ...
 *               </ts-expansion-panel>
 *
 *               <ts-expansion-panel>
 *                 ...
 *               </ts-expansion-panel>
 * </ts-accordion>
 *
 * <example-url>https://release--5f0ca4e61af3790022cad2fe.chromatic.com/?path=/story/components-structure-expansion-panel</example-url>
 */
@Component({
  selector: 'ts-accordion',
  template: `<ng-content></ng-content>`,
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['multi'],
  providers: [
    {
      provide: TS_ACCORDION,
      useExisting: TsAccordionComponent,
    },
  ],
  host: { class: 'ts-accordion' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsAccordion',
})
export class TsAccordionComponent extends CdkAccordion implements TsAccordionBase, AfterContentInit, OnDestroy {
  /**
   * Store a reference to the key manager
   */
  private keyManager!: FocusKeyManager<TsExpansionPanelTriggerComponent>;

  /**
   * Collect a list of all triggers
   */
  @ContentChildren(TsExpansionPanelTriggerComponent, { descendants: true })
  public triggers!: QueryList<TsExpansionPanelTriggerComponent>;

  /**
   * Determine if the toggle indicator should be hidden
   *
   * @param value
   */
  @Input()
  public set hideToggle(value: boolean) {
    this._hideToggle = value;
  }
  public get hideToggle(): boolean {
    return this._hideToggle;
  }
  private _hideToggle = false;

  /**
   * The event emitted as the accordion is destroyed
   */
  @Output()
  public readonly destroyed: EventEmitter<void> = new EventEmitter();


  /**
   * Initialize the key manager
   */
  public ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.triggers).withWrap();
  }

  /**
   * Alert consumers when the accordion is destroyed
   */
  public ngOnDestroy(): void {
    this.destroyed.emit();
  }

  /**
   * Handle keyboard events coming in from the panel triggers
   *
   * @param event
   */
  public handleTriggerKeydown(event: KeyboardEvent): void {
    const { code } = event;
    const manager = this.keyManager;

    if (code === KEYS.HOME.code) {
      manager.setFirstItemActive();
      event.preventDefault();
    } else if (code === KEYS.END.code) {
      manager.setLastItemActive();
      event.preventDefault();
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  /**
   * Handle focus events for the trigger
   *
   * @param trigger - The trigger component that is receiving focus
   */
  public handleTriggerFocus(trigger: TsExpansionPanelTriggerComponent): void {
    this.keyManager.updateActiveItem(trigger);
  }
}
