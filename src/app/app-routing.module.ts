import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AutoresComponent } from './modules/autores/autores.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LibrosComponent } from './modules/libros/libros.component';

const routes: Routes = [];


export const AppRoutes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    data:{
      heading: 'app'
    }
  },
  {
    path: '',
    component: AutoresComponent,
    data:{
      heading: 'autores'
    }
  },
  {
    path: 'libros',
    component: LibrosComponent,
    data:{
      heading: 'libros'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data:
    {
      heading: 'dashboard'
    }
  }
]
