import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent 
{
  loadedFeature = 'project';

  onNavigate(feature: string) 
  {
    this.loadedFeature = feature;
  }
}
