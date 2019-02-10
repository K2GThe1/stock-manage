import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { MatCardModule, MatToolbarModule, MatToolbar, MatButtonModule, MatButton , MatMenuModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users.service';
import { TokenInterceptor } from './token-interceptor';
import { RestApiService } from 'src/services/rest-api.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { AdminHeaderComponent } from './app-admin-header/admin-header';
import { StocksComponent } from './stocks/stocks.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    StorageServiceModule,
    FormsModule,
    MatCardModule, MatToolbarModule, MatButtonModule, MatMenuModule,
    BrowserAnimationsModule
  ],
  exports: [
    BrowserModule,
    MatCardModule, MatToolbarModule, MatButtonModule, MatMenuModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    UsersComponent,
    AdminHeaderComponent,
    StocksComponent,
    ProductComponent,
    AddProductComponent
  ],
  providers: [AuthGuard, RestApiService, LocalStorageService, UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
