import {RoutesAliases} from "../enums/RoutesAliases";
import {Unsubscribable} from "../types/Unsubscribable";
import {Subject} from "rxjs";
import {OnDestroy} from "@angular/core";

export abstract class BaseComponent implements OnDestroy, Unsubscribable {
  readonly routesAliases: typeof RoutesAliases = RoutesAliases;
  unsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
