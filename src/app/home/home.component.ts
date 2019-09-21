import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  isSearching = false;
  startPoint: string;
  endPoint: string;

  // @ViewChild('map', {static: false}) map;

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
  }


  searchRoute() {
    this.isSearching = true;
  }

  resetSearch() {
    this.startPoint = '';
    this.endPoint = '';
    this.isSearching = false;
  }

  initMap() {
    // console.log('get map element', document.getElementById('myMap'));
    const map = new google.maps.Map(document.getElementById('myMap'), {
      center: {lat: 22.28552, lng: 114.15769},
      zoom: 13
    });

  }
}
