// import { Observable, of } from 'rxjs';
// import { PreloadingStrategy, Route } from '@angular/router';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomPreloadingService implements PreloadingStrategy {
//   preload(route: Route, fn: () => Observable<any>): Observable<any> {
//     if (route.data && route.data['preload']) {
//       return fn();
//     } else {
//       return of(null);
//     }
//   }
//   constructor() {}
// }
