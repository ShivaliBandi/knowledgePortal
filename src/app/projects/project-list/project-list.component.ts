import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})

export class ProjectListComponent implements OnInit, OnDestroy 
{
  pro: Project[];
  subscription: Subscription;

  // Constructor with dependency injection
  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) 
              {
              }

  // When component gets loaded
  ngOnInit() 
  {
    this.subscription = this.projectService.projectChanged
      .subscribe(
        (recipes: Project[]) => {
          this.pro = recipes;
        }
      );
    this.pro = this.projectService.getProjects();
  }

  // When component gets unloaded
  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }

  // Listener to add new project
  onNewProject() 
  {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

 
}
