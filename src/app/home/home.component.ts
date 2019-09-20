import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  
  isCollapsed = false;
  isSearching = false;
  startPoint: string;
  endPoint: string;
  
  constructor() {
  
  }
  
  searchRoute() {
    this.isSearching = true;
  }
}
