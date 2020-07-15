import { Book } from '../shared/Book.model';
import { Subject } from 'rxjs/Subject';

// User defined service to maintain Book list
export class BookShoppingListService 
{
  BooksChanged = new Subject<Book[]>();
  startedEditing = new Subject<number>();

  // List of books which displays always
  private Books: Book[] = 
  [
    new Book('Practical Approach in C - Ajay Mittal', 580),
    new Book('Linux System Programming - Robert Love', 710),
    new Book('Windows Internals - Soloman', 1150),
    new Book('Programming Windows- Petzold', 980),
    new Book('Computer Architecture - V. Rajaraman', 410),
  ];

  // Returns all books
  getBooks() 
  {
    return this.Books.slice();
  }

  // Return specific book
  getBook(index: number) 
  {
    return this.Books[index];
  }

  // Add new book
  addBook(Book: Book) 
  {
    this.Books.push(Book);
    this.BooksChanged.next(this.Books.slice());
  }

  // Add multiple books
  addBooks(Books: Book[]) 
  {
    this.Books.push(...Books);
    this.BooksChanged.next(this.Books.slice());
  }

  // Update book record
  updateBook(index: number, newBook: Book) 
  {
    this.Books[index] = newBook;
    this.BooksChanged.next(this.Books.slice());
  }

  // Delete existing book
  deleteBook(index: number) 
  {
    this.Books.splice(index, 1);
    this.BooksChanged.next(this.Books.slice());
  }
}
