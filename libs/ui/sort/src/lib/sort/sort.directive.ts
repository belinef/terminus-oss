import {
  Directive,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  isNull,
  isUndefined,
} from '@terminus/fe-utilities';

import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortInvalidDirectionError,
} from '../sort-errors';


/**
 * Define the allowed sort directions for {@link TsSortDirective}
 */
export type TsSortDirection
  = 'asc'
  | 'desc'
  | ''
;

/**
 * Interface for a directive that holds sorting state consumed by `TsSortHeaderComponent`
 */
export interface TsSortableItem {
  /**
   * The id of the column being sorted
   */
  id: string;
  /**
   * Starting sort direction
   */
  start: 'asc' | 'desc';
  /**
   * Whether to disable clearing the sorting state
   */
  disableClear: boolean;
}

/**
 * The current sort state
 */
export interface TsSortState {
  /**
   * The id of the column being sorted
   */
  active: string;
  /**
   * The sort direction
   */
  direction: TsSortDirection;
}


/**
 * Container for TsSortables to manage the sort state and provide default sort parameters
 *
 * @example
 *
 * <ts-table [dataSource]="dataSource" tsSort>
 *   ...
 * </ts-table>
 *
 * <example-url>https://release--5f0ca4e61af3790022cad2fe.chromatic.com/?path=/story/components-data-display-table</example-url>
 */
@Directive({
  selector: '[tsSort]',
  exportAs: 'tsSort',
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled: tsSortDisabled'],
})
export class TsSortDirective implements OnChanges, OnDestroy {
  /**
   * Store the disabled flag
   */
  public disabled = false;

  /**
   * Collection of all registered sortables that this directive manages
   */
  private sortables = new Map<string, TsSortableItem>();

  /**
   * Used to notify any child components listening to state changes
   */
  public _stateChanges = new Subject<void>();

  /**
   * The id of the most recently sorted TsSortable
   */
  @Input('tsSortActive')
  public active!: string;

  /**
   * The direction to set when an TsSortable is initially sorted.
   *
   * May be overridden by the TsSortable's sort start.
   */
  @Input('tsSortStart')
  public start: 'asc' | 'desc' = 'asc';

  /**
   * The sort direction of the currently active TsSortable
   *
   * @param direction
   */
  @Input('tsSortDirection')
  public set direction(direction: TsSortDirection) {
    if (isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }
  public get direction(): TsSortDirection {
    return this._direction;
  }
  private _direction: TsSortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   *
   * May be overridden by the TsSortable's disable clear input.
   */
  @Input('tsSortDisableClear')
  public disableClear = false;

  /**
   * Event emitted when the user changes either the active sort or sort direction
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('tsSortChange')
  public readonly sortChange = new EventEmitter<TsSortState>();


  /**
   * Trigger next on all changes
   */
  public ngOnChanges(): void {
    this._stateChanges.next();
  }

  /**
   * Complete the observable on destroy
   */
  public ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  /**
   * Register function to be used by the contained TsSortables. Adds the TsSortable to the
   * collection of TsSortables.
   *
   * @param sortable
   */
  public register(sortable: TsSortableItem): void {
    if (!sortable.id && isDevMode()) {
      throw getSortHeaderMissingIdError();
    }

    if (this.sortables.has(sortable.id) && isDevMode()) {
      throw getSortDuplicateSortableIdError(sortable.id);
    }
    this.sortables.set(sortable.id, sortable);
  }

  /**
   * Unregister function to be used by the contained TsSortables. Removes the TsSortable from the
   * collection of contained TsSortables.
   *
   * @param sortable
   */
  public deregister(sortable: TsSortableItem): void {
    this.sortables.delete(sortable.id);
  }

  /**
   * Sets the active sort id and determines the new sort direction
   *
   * @param sortable
   */
  public sort(sortable: TsSortableItem): void {
    if (this.active === sortable.id) {
      this.direction = this.getNextSortDirection(sortable);
    } else {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    }

    this.sortChange.next({
      active: this.active,
      direction: this.direction,
    });
  }

  /**
   * Returns the next sort direction of the active sortable, checking for potential overrides
   *
   * @param sortable
   */
  public getNextSortDirection(sortable: TsSortableItem): TsSortDirection {
    if (!sortable) {
      return '';
    }
    // Get the sort direction cycle with the potential sortable overrides.
    const disableClearDoesntExist = isNull(sortable.disableClear) || isUndefined(sortable.disableClear);
    const disableClear = disableClearDoesntExist ? this.disableClear : sortable.disableClear;
    const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }
}

/**
 * Returns the sort direction cycle to use given the provided parameters of order and clear
 *
 * @param start
 * @param disableClear
 */
function getSortDirectionCycle(start: 'asc' | 'desc', disableClear: boolean): TsSortDirection[] {
  const sortOrder: TsSortDirection[] = ['asc', 'desc'];
  if (start === 'desc') {
    sortOrder.reverse();
  }

  if (!disableClear) {
    sortOrder.push('');
  }
  return sortOrder;
}
