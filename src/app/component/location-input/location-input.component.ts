import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-location-input',
	templateUrl: './location-input.component.html',
	styleUrls: ['./location-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LocationInputComponent implements OnInit {
	
	@Input()
	address: string;
	@Output()
	addressChange = new EventEmitter<string>();
	
	options: Array<{ value: string; category: string; count: number }> = [];
	
	constructor() {
		// this.address
	}
	
	ngOnInit() {
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
