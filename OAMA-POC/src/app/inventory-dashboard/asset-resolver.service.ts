import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { InventoryService } from './inventory.service';
import { AssetResolved } from './asset';

@Injectable({
  providedIn: 'root'
})
export class AssetResolverService implements Resolve<AssetResolved> {
  constructor(private inventoryService: InventoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AssetResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Asset id was not a number: ${id}`;
      console.error(message);
      return of({ asset: null, error: message });
    }

    return this.inventoryService.getAsset(+id).pipe(
      map(asset => ({ asset: asset })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ asset: null, error: message });
      })
    );
  }
}
