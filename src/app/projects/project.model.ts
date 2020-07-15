import { Book } from '../shared/Book.model';

export class Project 
{
  // Informaion of projects
  public name: string;
  public description: string;
  public imagePath: string;
  public Books: Book[];

  constructor(name: string, desc: string, imagePath: string, Books: Book[]) 
  {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.Books = Books;
  }
}
