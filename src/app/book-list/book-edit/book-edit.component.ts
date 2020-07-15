import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Book } from '../../shared/Book.model';
import { BookShoppingListService } from '../bookshopping-list.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html'
})

export class BookEditComponent implements OnInit, OnDestroy 
{
  // Characteristcs of Class
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Book;

  // Constroctor with dependency injection
  constructor(private slService: BookShoppingListService) 
  { }

  // Gets call when component gets loaded
  ngOnInit() 
  {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getBook(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  // Gets called when component gets unloaded
  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) 
  {
    const value = form.value;
    // Create object of Book class to add new Book
    const newBook = new Book(value.name, value.amount);
    
    if (this.editMode) 
    {
      // Update existing book
      this.slService.updateBook(this.editedItemIndex, newBook);
    } 
    else 
    {
      // Add new Book
      this.slService.addBook(newBook);
    }
    this.editMode = false;
    form.reset();
  }

  // Listener of Clear Data button
  onClear() 
  {
    this.slForm.reset();
    this.editMode = false;
  }

  // Listener of Delete Book button
  onDelete() 
  {
    this.slService.deleteBook(this.editedItemIndex);
    this.onClear();
  }
}
