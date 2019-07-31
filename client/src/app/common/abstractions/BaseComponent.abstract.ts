import {routesAliases} from "../enums/routesAliases";
import {Unsubscribable} from "../types/Unsubscribable";
import {Subject} from "rxjs";
import {OnDestroy} from "@angular/core";

export abstract class BaseComponent implements OnDestroy, Unsubscribable {
  readonly routesAliases: typeof routesAliases = routesAliases;
  unsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
