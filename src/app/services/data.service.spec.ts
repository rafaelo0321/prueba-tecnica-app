import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:9000/api/v1/client/show/for';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchClient', () => {
    it('should return an Observable<any>', () => {
      const typoDocument = 'CC';
      const numberDocument = '98765432';
      const mockResponse = { id: 1, name: 'Maria' };

      service.searchClient(typoDocument, numberDocument).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/${typoDocument}/${numberDocument}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('setClientData', () => {
    it('should set client data', () => {
      const mockClientData = { id: 1, name: 'Maria' };
      service.setClientData(mockClientData);
      service.client$.subscribe(data => {
        expect(data).toEqual(mockClientData);
      });
    });
  });
});

