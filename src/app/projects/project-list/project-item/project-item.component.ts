import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html'
})

export class ProjectItemComponent implements OnInit 
{
  @Input() pro: Project;
  @Input() index: number;

  ngOnInit() 
  {
  }
}
