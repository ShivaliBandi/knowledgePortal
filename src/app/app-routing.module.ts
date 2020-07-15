// File useed for routing

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import the components required for the routing
import { ProjectsComponent } from './projects/projects.component';
import { BookListComponent } from './book-list/book-list.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import {AboutusComponent} from './aboutus/aboutus.component';

// Routes array for routing
const appRoutes: Routes = [
  { path: '', redirectTo: '/aboutus', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, children: [
    { path: '', component: ProjectStartComponent }, // Wildcard routing
    { path: 'new', component: ProjectEditComponent },
    { path: ':id', component: ProjectDetailComponent },
    { path: ':id/edit', component: ProjectEditComponent },
  ] },
  { path: 'book-list', component: BookListComponent },
  { path: 'aboutus', component: AboutusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{

}
