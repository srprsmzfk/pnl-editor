import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { TotalPnlCardComponent } from './components/total-pnl-card/total-pnl-card.component';
import { ReferralCardComponent } from './components/referral-card/referral-card.component';
import { ReferralCardEnComponent } from './components/referral-card-en/referral-card-en.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'card1',
    component: TotalPnlCardComponent
  },
  {
    path: 'card2',
    component: ReferralCardComponent
  },
  {
    path: 'card3',
    component: ReferralCardEnComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
