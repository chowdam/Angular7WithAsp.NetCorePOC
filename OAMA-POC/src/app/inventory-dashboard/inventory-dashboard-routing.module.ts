
import { AssetResolverService } from './asset-resolver.service';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryPrimengComponent } from './inventory-primeng/inventory-primeng.component';
import { InventoryAgGridComponent } from './inventory-ag-grid/inventory-ag-grid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_security/auth.guard';
import { InventoryResolverService } from './inventory-resolver.service';

const routes: Routes = [
  {
    path: 'inventory',
    component: InventoryListComponent,
    resolve: { inventory: InventoryResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'primeng',
    component: InventoryPrimengComponent,
    resolve: { inventory: InventoryResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'aggrid',
    component: InventoryAgGridComponent,
    resolve: { inventory: InventoryResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'asset/:id',
    component: AssetDetailComponent,
    resolve: { asset: AssetResolverService },
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/inventory', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDashboardRoutingModule {}
