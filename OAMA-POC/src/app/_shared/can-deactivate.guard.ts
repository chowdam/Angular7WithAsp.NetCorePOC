// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   CanDeactivate
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ComponentCanDeactivate } from './ComponentCanDeactivate';

// @Injectable({
//   providedIn: 'root'
// })
// export class CanDeactivateGuard
//   implements CanDeactivate<ComponentCanDeactivate> {
//   canDeactivate(
//     component: ComponentCanDeactivate,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const url: string = state.url;
//     console.log('Url: ' + url);

//     if (!component.canDeactivate()) {
//       if (
//         confirm(
//           'You have unsaved changes! If you leave, your changes will be lost.'
//         )
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     }

//     return true;
//   }
// }
