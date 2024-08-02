import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryClientComponent } from './query-client.component';

describe('QueryClientComponent', () => {
  let component: QueryClientComponent;
  let fixture: ComponentFixture<QueryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
