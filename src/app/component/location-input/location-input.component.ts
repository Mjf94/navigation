import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';

declare var google;

@Component({
	selector: 'app-location-input',
	templateUrl: './location-input.component.html',
	styleUrls: ['./location-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LocationInputComponent implements AfterViewInit {
	
	@Input()
	address: string;
	@Output()
	addressChange = new EventEmitter<string>();
	
	@Input()
	placeHolder: string;
	
	@ViewChild('inputElement', {static: false}) myInput: ElementRef;
	@ViewChild('autoHint', {static: false}) autoHint: ElementRef;
	
	options: Array<{ value: string; category: string; count: number }> = [];
	infoWindow;
	infowindowContent;
	
	constructor() {
		// this.address
	}
	
	ngAfterViewInit() {
		let autocomplete = new google.maps.places.Autocomplete(this.myInput.nativeElement);
		autocomplete.setFields(['name']);
		
		autocomplete.addListener('place_changed', () => {
			let place = autocomplete.getPlace();
			console.log('place changed', place);
			
			if (place) {
				this.address = place.name;
				this.addressChange.emit(this.address);
				console.log('overwrite address', this.address);
			}
		});
	}
	
	onChange(event): void {
		// this.options = new Array(this.getRandomInt(15, 5)).join('.').split('.').map((_item, idx) => ({
		//   value,
		//   category: `${value}${idx}`,
		//   count: this.getRandomInt(200, 100)
		// }));
		this.addressChange.emit(this.address);
	}
	
	private getRandomInt(max: number, min: number = 0): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
}
