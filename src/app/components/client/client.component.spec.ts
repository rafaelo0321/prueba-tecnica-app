import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ClientComponent } from './client.component';
import { DataService } from '../../services/data.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['client$']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ClientComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to client$ and update client property', () => {
    const mockClient = {
      lastName: 'Doe',
      secondLastName: 'Smith',
      firstName: 'John',
      middleName: 'Michael',
      phone: '123456789',
      address: '123 Elm Street',
      cityOfResidence: 'Springfield'
    };

    dataService.client$ = of(mockClient); // Simula el observable con un valor

    component.ngOnInit(); // Ejecuta ngOnInit para suscribirse al observable
    fixture.detectChanges(); // Actualiza la vista

    expect(component.client).toEqual(mockClient);
  });

  it('should call volver method and navigate to root', () => {
    component.client = { lastName: 'Doe' };
    component.error = 'An error occurred';

    component.volver();

    expect(component.client).toBeNull();
    expect(component.error).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display client information in the template', () => {
    const mockClient = {
      lastName: 'Gómez',
      secondLastName: 'Albela',
      firstName: 'Juan',
      middleName: 'Antonio',
      phone: '123456789',
      address: '123 Elm Street',
      cityOfResidence: 'Springfield'
    };

    component.client = mockClient;
    fixture.detectChanges();

    const clientInfo = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(clientInfo[0].nativeElement.textContent).toContain('Last Name: Gómez');
    expect(clientInfo[1].nativeElement.textContent).toContain('Secund Last Name: Albela');
    expect(clientInfo[2].nativeElement.textContent).toContain('First Name: Juan');
    expect(clientInfo[3].nativeElement.textContent).toContain('Middle Name: Antonio');
    expect(clientInfo[4].nativeElement.textContent).toContain('Phone: 123456789');
    expect(clientInfo[5].nativeElement.textContent).toContain('Address: 123 Elm Street');
    expect(clientInfo[6].nativeElement.textContent).toContain('City: Springfield');
  });

});
