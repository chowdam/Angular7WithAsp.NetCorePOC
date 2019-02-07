import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { InventoryService } from "./inventory.service";
import { AssetResolved } from "./asset";
import { AssetVMResolved } from "./AssetVM";

@Injectable({
  providedIn: "root"
})
export class AssetResolverService implements Resolve<AssetVMResolved> {
  constructor(private inventoryService: InventoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AssetVMResolved> {
    const id = route.paramMap.get("id");
    if (id === "") {
      const message = `Asset id was not a number: ${id}`;
      console.error(message);
      return of({ assetmodel: null, error: message });
    }

    return this.inventoryService.getAsset(id).pipe(
      map(asset => ({ assetmodel: asset })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ assetmodel: null, error: message });
      })
    );
  }
}
