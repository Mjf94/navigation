import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../service/mock-api.service';
import { timer } from 'rxjs';
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
	
	// @ViewChild('map', {static: false}) map;
	
	constructor(private mockApiService: MockApiService) {
	}
	
	ngOnInit(): void {
		this.initMap();
	}
	
	
	searchRoute() {
		if (!this.startPoint) {
			return;
		}
		if (!this.endPoint) {
			return;
		}
		this.isSearching = true;
		console.log(`search route from ${this.startPoint} to ${this.endPoint}`);
		this.mockApiService.postRoute(this.startPoint, this.endPoint).pipe(
			map(data => {
				if (data.status !== 'success') {
					console.log('on error');
					throw error(data);
				}
				return data;
			}),
			retryWhen(errors =>
				errors.pipe(
					// 输出错误信息
					tap(val => console.log(`Value ${val} was too high!`)),
					// 5秒后重启
					delayWhen(val => timer(1000))
				)
			)).subscribe(data => {
			console.log('get response', data);
			if (data && data.token) {
				this.mockApiService.getRoute(data.token).pipe(
					map(data => {
						if (data.status !== 'success') {
							console.log('on error');
							throw error(data);
						}
						return data;
					}),
					retryWhen(errors =>
						errors.pipe(
							// 输出错误信息
							tap(val => console.log(`Value ${val} was too high!`)),
							// 5秒后重启
							delayWhen(val => timer(1000))
						)
					)).subscribe(response => {
					console.log('get route response', response);
					if (response['status'] === 'success') {
						console.log('route plan done');
						this.isSearching = false;
						this.drawRoute(response);
					} else {
						throw error();
					}
				});
			}
			
		});
	}
	
	resetSearch() {
		this.startPoint = '';
		this.endPoint = '';
		this.isSearching = false;
	}
	
	initMap() {
		// console.log('get map element', document.getElementById('myMap'));
		this.map = new google.maps.Map(document.getElementById('myMap'), {
			center: {lat: 22.28552, lng: 114.15769},
			zoom: 13
		});
	}
	
	drawRoute(response: any) {
		const routeCoordinates = [];
		if (response.path && response.path.length > 0) {
			for (let point of response.path) {
				routeCoordinates.push({lat: Number.parseFloat(point[0]), lng: Number.parseFloat(point[1])});
			}
		}
		const routePath = new google.maps.Polyline({
			path: routeCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		
		routePath.setMap(this.map);
		
		// TODO: move the route to the center of the map, adjust the zoom
	}
}
