import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../shared/abstractions/BaseComponent.abstract";
import {Filter} from "../../../shared/types/Filter";
import {MaterialService} from "../../../shared/services/material.service";
import {MaterialDatepicker} from "../../../shared/types/MaterialDatepicker";
import {getSafe} from "../../../shared/utils/Utils";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.sass']
})
export class HistoryFilterComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  end: MaterialDatepicker;
  @ViewChild('end', {static: true}) endRef: ElementRef;

  isValid = true;
  @Output() onFilter = new EventEmitter<Filter>();
  order: number;
  start: MaterialDatepicker;
  @ViewChild('start', {static: true}) startRef: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.start.destroy();
    this.end.destroy();
  }

  submitFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }
    if (getSafe(() => this.start.date)) {
      filter.start = this.start.date;
    }
    if (getSafe(() => this.end.date)) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
  }

  validate(): void {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }

}
