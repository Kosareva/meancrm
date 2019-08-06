import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../common/abstractions/BaseComponent.abstract";
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsRestService} from "../../../shared/rest/api/positions-rest.service";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {routesParams} from "../../../common/enums/routesParams";
import {Position} from "../../../shared/rest/model/Position";
import {OrderService} from "../order.service";
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.sass']
})
export class OrderPositionsComponent extends BaseComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private orderService: OrderService,
    private positionsRestService: PositionsRestService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsRestService.positionCollectionResourceGet(params[routesParams.ID]);
        }),
        map((positions: Position[]) => {
          return positions.map(position => {
            position.quantity = 1;
            return position;
          });
        })
      );
  }

  addToOrder(position: Position): void {
    MaterialService.toast(`Added x${position.quantity}`);
    this.orderService.add(position);
  }

}
