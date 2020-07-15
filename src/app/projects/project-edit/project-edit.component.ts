import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit 
{
  id: number;
  editMode = false;
  proForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() 
  {
    if (this.editMode) 
    {
      this.projectService.updateProject(this.id, this.proForm.value);
    }
    else 
    {
      this.projectService.addProject(this.proForm.value);
    }
    
    this.onCancel();
  }

  onAddBook() 
  {
    (<FormArray>this.proForm.get('Books')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteBook(index: number) 
  {
    (<FormArray>this.proForm.get('Books')).removeAt(index);
  }

  onCancel() 
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() 
  {
    let proName = '';
    let proImagePath = '';
    let proDescription = '';
    let proBooks = new FormArray([]);

    if (this.editMode) 
    {
      const pro = this.projectService.getProject(this.id);
      proName = pro.name;
      proImagePath = pro.imagePath;
      proDescription = pro.description;
      if (pro['Books']) {
        for (let Book of pro.Books) {
          proBooks.push(
            new FormGroup({
              'name': new FormControl(Book.name, Validators.required),
              'amount': new FormControl(Book.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.proForm = new FormGroup({
      'name': new FormControl(proName, Validators.required),
      'imagePath': new FormControl(proImagePath, Validators.required),
      'description': new FormControl(proDescription, Validators.required),
      'Books': proBooks
    });
  }
}
