import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailsUploadComponent } from './details-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileService } from 'src/services/UploadFileService';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule
  ],
  declarations: [ DashboardComponent, DetailsUploadComponent ],
  providers: [UploadFileService]
})
export class DashboardModule { }
