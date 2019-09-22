import { TestBed } from '@angular/core/testing';

import { MockApiService } from './mock-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MockApiService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule],
		// providers: [HttpClient]
	}));
	
	it('should be created', () => {
		const service: MockApiService = TestBed.get(MockApiService);
		expect(service).toBeTruthy();
	});
	
});
