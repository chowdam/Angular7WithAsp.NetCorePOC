import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from './inventory';
import { tap, catchError } from 'rxjs/operators';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  private inventoryUrl = 'http://localhost:5000/api/inventory';

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryUrl).pipe(
      tap(data => console.log('Get Inventory data called from service ')),
      catchError(this.handleError)
    );
  }

  getAsset(id: number): Observable<Asset> {
    if (id === 0) {
      return of(this.initializeAsset());
    }
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.get<Asset>(url).pipe(
      tap(data => console.log('getAsset: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    console.log(err);
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeAsset(): Asset {
    // Return an initialized object
    return {
      // asset realted
      SerialNumber: '',
      AssetStatus: '',
      StoragePossession: '',

      // Vehicle Association related
      VehicleAssociationStatus: '',
      InstallationDate: '',
      AssetUseAge: 0,
      DeinstallationDate: '',
      ReinstallationDate: '',
      BillingStartDate: '',
      BillingEndDate: '',

      // vehicle related properties
      VIN: '',
      TTNMAccount: '',
      TTNMGroup: '',
      VehicleStatus: '',
      BusNumber: '',
      LicensePlate: '',
      VehicleType: '',
      ModelYear: '',
      VehicleAge: '',
      SBCName: '',
      SBCCode: '',
      VehicleOwner: '',
      Garage: '',
      SeasonalSBCName: '',

      // asset related
      Notes: ''
    };
  }
}
