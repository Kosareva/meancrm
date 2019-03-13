import {Subject} from "rxjs";
import {OnDestroy} from "@angular/core";
import {Unsubscribable} from "../types/Unsubscribable";

export abstract class UnsubscribableAbstract implements OnDestroy, Unsubscribable {

  unsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
