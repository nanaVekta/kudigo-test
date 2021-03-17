import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const homeModule = () => import('./home/home.module').then(x => x.HomeModule);

const routes: Routes = [
  { path: 'home', loadChildren: homeModule, canActivate: [AuthGuard]},
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home'},
  { path: '', redirectTo: 'home/feed', pathMatch: 'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
