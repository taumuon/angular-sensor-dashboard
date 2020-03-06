import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardWidgetValueComponent } from './dashboard-widget-value/dashboard-widget-value.component';
import { DashboardWidgetChartComponent } from './dashboard-widget-chart/dashboard-widget-chart.component';
import { DashboardMinMaxComponent } from './dashboard-min-max/dashboard-min-max.component';
import { ConfigurationNewItemComponent } from './configuration-new-item/configuration-new-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,
    ConfigurationComponent,
    DashboardWidgetValueComponent,
    DashboardWidgetChartComponent,
    DashboardMinMaxComponent,
    ConfigurationNewItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
    ]),
      AppRoutingModule,
      BrowserAnimationsModule,
      HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
