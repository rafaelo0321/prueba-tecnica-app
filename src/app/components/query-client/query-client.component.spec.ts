import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { QueryClientComponent } from './query-client.component';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('QueryClientComponent', () => {
  let component: QueryClientComponent;
  let fixture: ComponentFixture<QueryClientComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;
  let fb: FormBuilder;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['searchClient', 'setClientData']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [QueryClientComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fb = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required validators', () => {
    expect(component.documentoForm).toBeDefined();
    expect(component.documentoForm.controls['typoDocument'].valid).toBeFalsy();
    expect(component.documentoForm.controls['numberDocument'].valid).toBeFalsy();

    component.documentoForm.controls['typoDocument'].setValue('CC');
    component.documentoForm.controls['numberDocument'].setValue('12345678');

    expect(component.documentoForm.controls['typoDocument'].valid).toBeTruthy();
    expect(component.documentoForm.controls['numberDocument'].valid).toBeTruthy();
  });

  it('should call searchDocument and navigate to client page on success', () => {
    const mockResponse = { id: 1, name: 'John Doe' };
    dataService.searchClient.and.returnValue(of(mockResponse));
    dataService.setClientData.and.callThrough();

    component.documentoForm.controls['typoDocument'].setValue('CC');
    component.documentoForm.controls['numberDocument'].setValue('12345678');
    fixture.detectChanges();

    component.searchDocument();

    expect(dataService.searchClient).toHaveBeenCalledWith('CC', '12345678');
    expect(dataService.setClientData).toHaveBeenCalledWith(mockResponse);
    expect(router.navigate).toHaveBeenCalledWith(['/client']);
  });

  it('should handle error response in searchDocument', () => {
    const errorResponse = { error: { message: 'Client not found' } };
    dataService.searchClient.and.returnValue(throwError(errorResponse));

    component.documentoForm.controls['typoDocument'].setValue('CC');
    component.documentoForm.controls['numberDocument'].setValue('12345678');
    fixture.detectChanges();

    spyOn(window, 'alert');

    component.searchDocument();

    expect(component.error).toBe('Client not found');
    expect(window.alert).toHaveBeenCalledWith('Client not found');
  });

  it('should call volver method and navigate to root', () => {
    component.client = { id: 1, name: 'Juan Gómez' };
    component.error = 'An error occurred';

    component.volver();

    expect(component.client).toBeNull();
    expect(component.error).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();

    component.documentoForm.controls['typoDocument'].setValue('CC');
    component.documentoForm.controls['numberDocument'].setValue('12345678');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

});
