import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MockApiService {
	
	
	constructor(private httpClient: HttpClient) {
	}
	
	postRoute(inputOrigin: string, inputDestination: string): Observable<any> {
		const body = {
			origin: inputOrigin,
			destination: inputDestination
		};
		return this.httpClient.post(`${environment.api_path}/`, {});
	}
	
	getRoute(token: string): Observable<any> {
		return this.httpClient.get(`${environment.api_path}/${token}`);
	}
}
