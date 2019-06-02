import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './Shared/components/nav-menu/nav-menu.component';
import {HomeComponent} from './View/home/home.component';
import {MarketComponent} from './View/market/market.component';
import {AdminComponent} from './View/admin/admin.component';
import {ProductComponent} from './Shared/components/product/product.component';
import { PaginationComponent } from './Shared/components/pagination/pagination.component';

import {SuiModule} from 'ng2-semantic-ui';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MarketComponent,
    AdminComponent,
    ProductComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'market', component: MarketComponent},
      {path: 'admin', component: AdminComponent},
    ]),
    SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
