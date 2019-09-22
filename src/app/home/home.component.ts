import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../service/mock-api.service';
import { Subscription, timer } from 'rxjs';
import { delayWhen, map, retryWhen, tap } from 'rxjs/operators';
import { error } from 'util';

declare var google;

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
	
	isSearching = false;
	startPoint: string = '';
	endPoint: string = '';
	map: any;
	routePath: any;
	startMarker: any;
	endMarker;
	startErrorMsg: string = '';
	endErrorMsg: string = '';
	searchErrorMsg: string = '';
	totalDistance: any;
	totalTime: any;
	myPostSubscription: Subscription;
	myGetSubscription: Subscription;
	
	// @ViewChild('map', {static: false}) map;
	
	constructor(private mockApiService: MockApiService) {
	}
	
	ngOnInit(): void {
		this.initMap();
	}
	
	stopSearch() {
		if (this.myPostSubscription) {
			this.myPostSubscription.unsubscribe();
		}
		if (this.myGetSubscription) {
			this.myGetSubscription.unsubscribe();
		}
	}
	
	searchRoute() {
		if (!this.startPoint) {
			this.startErrorMsg = 'Please input your origin';
		}
		if (!this.endPoint) {
			this.endErrorMsg = 'Please input your destination';
		}
		if (!this.startPoint || !this.endPoint) {
			return;
		}
		this.isSearching = true;
		this.clearMap();
		console.log(`search route from ${this.startPoint} to ${this.endPoint}`);
		
		// TODO: set maximum retry times ?
		this.myPostSubscription = this.mockApiService.postRoute(this.startPoint, this.endPoint).pipe(
			map(data => {
				if (!data.token) {
					console.log('on error', data);
					this.searchErrorMsg = data.error;
					if (data.status === 'in progress') {
						throw error(data);
					}
					// return data;
					
				}
				return data;
			}),
			retryWhen(errors =>
				errors.pipe(
					tap(val => {
						console.log(`post route error`, val);
						
					}),
					// retry after 1000 ms
					delayWhen(val => timer(1000))
				)
			)).subscribe(data => {
			console.log('post route response', data);
			if (data && data.token) {
				this.myGetSubscription = this.mockApiService.getRoute(data.token).pipe(
					map(data => {
						if (data.status !== 'success') {
							console.log('on error', data);
							this.searchErrorMsg = data.error;
							if (data.status === 'in progress') {
								throw error(data);
							}
							// return;
						}
						return data;
					}),
					retryWhen(errors =>
						errors.pipe(
							tap(val => console.log(`get route error`, val)),
							// retry after 1000 ms
							delayWhen(val => timer(1000))
						)
					)).subscribe(response => {
					console.log('get route response', response);
					if (response['status'] === 'success') {
						console.log('route plan done');
						this.isSearching = false;
						this.drawRoute(response);
					} else {
						this.isSearching = false;
						this.searchErrorMsg = response.error;
					}
				});
			}
		});
	}
	
	resetSearch() {
		this.startPoint = '';
		this.endPoint = '';
		this.startErrorMsg = '';
		this.endErrorMsg = '';
		this.searchErrorMsg = '';
		this.isSearching = false;
		this.clearMap();
	}
	
	initMap() {
		// console.log('get map element', document.getElementById('myMap'));
		this.map = new google.maps.Map(document.getElementById('myMap'), {
			// somewhere in HKI
			streetViewControl: false,
			center: {lat: 22.28552, lng: 114.15769},
			zoom: 13
		});
	}
	
	clearMap() {
		if (this.routePath) {
			this.routePath.setMap(null);
		}
		if (this.startMarker) {
			this.startMarker.setMap(null);
		}
		if (this.endMarker) {
			this.endMarker.setMap(null);
		}
		this.totalDistance = '';
		this.totalTime = '';
		this.searchErrorMsg = '';
	}
	
	drawRoute(response: any) {
		const routeCoordinates = [];
		this.clearMap();
		if (response.path && response.path.length > 0) {
			for (let point of response.path) {
				routeCoordinates.push({lat: Number.parseFloat(point[0]), lng: Number.parseFloat(point[1])});
			}
			
			const startLatLng = new google.maps.LatLng(Number.parseFloat(response.path[0][0]), Number.parseFloat(response.path[0][1]));
			const endLatLng = new google.maps.LatLng(Number.parseFloat(response.path[response.path.length - 1][0]), Number.parseFloat(response.path[response.path.length - 1][1]));
			this.startMarker = new google.maps.Marker({
				position: startLatLng,
				map: this.map,
				title: 'Origin'
			});
			
			this.endMarker = new google.maps.Marker({
				position: endLatLng,
				map: this.map,
				title: 'Destination'
			});
			this.routePath = new google.maps.Polyline({
				path: routeCoordinates,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			
			this.routePath.setMap(this.map);
			this.totalDistance = response.total_distance;
			this.totalTime = response.total_time;
		} else {
			console.warn('invalid points to draw lines', response);
		}
		
		
		// TODO: move the route to the center of the map, adjust the zoom
		
	}
}
