import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { TotalPnlCardComponent } from './components/total-pnl-card/total-pnl-card.component';
import { ReferralCardComponent } from './components/referral-card/referral-card.component';
import { ReferralCardEnComponent } from './components/referral-card-en/referral-card-en.component';
import { OpenTradesComponent } from './components/open-trades/open-trades.component';
import { TotalPnlCardEnComponent } from './components/total-pnl-card-en/total-pnl-card-en.component';
import { OpenTradesEnComponent } from './components/open-trades-en/open-trades-en.component';
import { AccountComponent } from './components/account/account.component';
import { OpenTradesTpslComponent } from './components/open-trades-tpsl/open-trades-tpsl.component';
import { MexcOpenTradesComponent } from './components/mexc-open-trades/mexc-open-trades.component';
import { MexcReferralCardComponent } from './components/mexc-referral-card/mexc-referral-card.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
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
  },
  {
    path: 'card4',
    component: OpenTradesComponent
  },
  {
    path: 'card6',
    component: OpenTradesEnComponent
  },
  {
    path: 'card5',
    component: TotalPnlCardEnComponent
  },
  {
    path: 'card7',
    component: AccountComponent
  },
  {
    path: 'card8',
    component: OpenTradesTpslComponent
  },
  {
    path: 'card9',
    component: MexcOpenTradesComponent
  },
  {
    path: 'card10',
    component: MexcReferralCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
