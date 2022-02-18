import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/core/header/header.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



import { LibrosComponent } from './modules/libros/libros.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AutoresComponent } from './modules/autores/autores.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {KnobModule} from 'primeng/knob';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';

import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption, TitleComponent, TooltipComponent } from 'echarts/components';
import { BarChart, BarSeriesOption, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsModule } from 'ngx-echarts';
import marcaron from './marcaron';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CustomerService } from './customerservice';
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer,BarChart]
);
echarts.registerTheme('macarons', marcaron);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LibrosComponent,
    DashboardComponent,
    AutoresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),NgxEchartsModule.forRoot({ echarts }),ReactiveFormsModule,ToastModule,
    AngularFireModule.initializeApp(environment.firebase),AngularFireAnalyticsModule,AngularFirestoreModule,ButtonModule,CheckboxModule,AutoCompleteModule,DialogModule,InputTextModule,
    SidebarModule,BrowserAnimationsModule,KnobModule,FormsModule,TableModule,MultiSelectModule,DropdownModule,SliderModule,ProgressBarModule,HttpClientModule,CardModule,InputTextareaModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }


