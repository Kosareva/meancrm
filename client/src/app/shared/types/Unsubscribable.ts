import {Subject} from "rxjs";

export interface Unsubscribable {
  unsubscribe: Subject<void>;

  ngOnDestroy(): void;
}
