import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearProviderComponent } from './gear-provider.component';

describe('GearProviderComponent', () => {
  let component: GearProviderComponent;
  let fixture: ComponentFixture<GearProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
