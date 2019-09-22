import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MockApiService } from '../service/mock-api.service';
import { LocationInputComponent } from '../component/location-input/location-input.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let mockApiService: MockApiService;
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
	beforeEach(fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, HttpClientTestingModule, NgZorroAntdModule],
			declarations: [HomeComponent, LocationInputComponent],
			providers: [HomeComponent, LocationInputComponent, MockApiService]
			
		}).compileComponents();
		
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		mockApiService = TestBed.get(MockApiService);
		fixture.detectChanges();
	}));
	
	it('should compile', () => {
		expect(component).toBeTruthy();
	});
	
	it('should init complete', () => {
		component.ngOnInit();
		expect(component.totalTime).toBeUndefined();
		expect(component.totalDistance).toBeUndefined();
		expect(component.searchErrorMsg).toBe('');
		expect(component.startErrorMsg).toBe('');
		expect(component.endErrorMsg).toBe('');
	});
	
	it('should reset', () => {
		let resetButton = fixture.debugElement.query(By.css('.reset-button'));
		resetButton.triggerEventHandler('click', null);
		expect(component.totalTime).toBe('');
		expect(component.totalDistance).toBe('');
		expect(component.searchErrorMsg).toBe('');
		expect(component.startErrorMsg).toBe('');
		expect(component.endErrorMsg).toBe('');
		expect(component.isSearching).not.toBeTruthy();
		expect(component.startPoint).toBe('');
		expect(component.endPoint).toBe('');
	});
	
	
});
