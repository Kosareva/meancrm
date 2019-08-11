import {Injectable} from "@angular/core";
import {OrderPosition} from "../../shared/rest/model/OrderPosition";
import {Position} from "../../shared/rest/model/Position";

@Injectable()
export class OrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  add(position: Position): void {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      quantity: position.quantity,
      cost: position.cost,
      _id: position._id
    });

    const candidate = this.list.find(p => p._id === position._id);
    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  clear(): void {
    this.list = [];
    this.price = 0;
  }

  remove(orderPositionId: string): void {
    const idx = this.list.findIndex((p) => p._id === orderPositionId);
    if (idx !== undefined || idx !== null) {
      this.list.splice(idx, 1);
    }
    this.computePrice();
  }

  private computePrice(): void {
    this.price = this.list.reduce((total, item) => total += +item.quantity * +item.cost, 0);
  }

}
