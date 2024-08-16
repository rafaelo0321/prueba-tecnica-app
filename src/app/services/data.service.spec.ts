import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8090/api/v1/client/show/for';

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      const typoDocument = 'P';
      const numberDocument = '12345678';
      const mockResponse = { id: 1, name: 'Juanito Gómez' };

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
      const mockClientData = { id: 1, name: 'John Doe' };
      service.setClientData(mockClientData);
      service.client$.subscribe(data => {
        expect(data).toEqual(mockClientData);
      });
    });
  });
});
