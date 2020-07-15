import { Directive, HostListener, HostBinding } from '@angular/core';

// User defined directive
@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective 
{
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() 
  {
    this.isOpen = !this.isOpen;
  }
}