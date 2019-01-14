import { InventoryResolved, Inventory } from './inventory';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { InventoryService } from './inventory.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryResolverService implements Resolve<Inventory[]> {
  constructor(private inventoryService: InventoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Inventory[]> {
    console.log('Inventory data called from resolver... ');
    return this.inventoryService.getInventory();
  }
}
