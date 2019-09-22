import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInputComponent } from './location-input.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { By } from '@angular/platform-browser';

describe('LocationInputComponent', () => {
	let component: LocationInputComponent;
	let fixture: ComponentFixture<LocationInputComponent>;
	let expectedPlaceHolder = 'Please input your origin';
	let expectedInputAddress = 'Hong Kong Airport, Terminal 1';
	let inputElement;
	(<any> window).google = {
		maps: {
			LatLng: function(lat, lng) {
				return {
					latitude: parseFloat(lat),
					longitude: parseFloat(lng),
					
					lat: function() {
						return this.latitude;
					},
					lng: function() {
						return this.longitude;
					}
				};
			},
			LatLngBounds: function(ne, sw) {
				return {
					getSouthWest: function() {
						return sw;
					},
					getNorthEast: function() {
						return ne;
					}
				};
			},
			OverlayView: function() {
				return {};
			},
			InfoWindow: function() {
				return {};
			},
			Marker: function() {
				return {};
			},
			MarkerImage: function() {
				return {};
			},
			Map: function() {
				return {};
			},
			Point: function() {
				return {};
			},
			Size: function() {
				return {};
			},
			places: {
				AutocompleteService: function() {
				
				},
				Autocomplete: function(obj) {
					return {
						setFields: function() {
							return {};
						},
						addListener: function() {
						
						}
					};
				},
				PlacesService: function(obj) {
					return {
						PlacesServiceStatus: {
							OK: true
						},
						textSearch: function(query) {
							return [];
						},
						nearbySearch: function(query) {
							return [];
						}
					};
				}
			}
		}
	};
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, NgZorroAntdModule],
			declarations: [LocationInputComponent]
		}).compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(LocationInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		inputElement = fixture.nativeElement.querySelector('input');//.query(By.css('#inputElement'));
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should set place holder', () => {
		component.placeHolder = expectedPlaceHolder;
		fixture.detectChanges();
		inputElement = fixture.debugElement.query(By.css('input'));
		expect(inputElement.properties.placeholder).toBe(expectedPlaceHolder);
	});
	
	it('should set address', async(() => {
		component.address = expectedInputAddress;
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			inputElement = fixture.debugElement.query(By.css('input'));
			expect(inputElement.properties.value).toBe(expectedInputAddress);
		});
		
	}));
});
