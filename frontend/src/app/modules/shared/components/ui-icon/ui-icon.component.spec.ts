// ui-icon.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconComponent } from './ui-icon.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('UiIconComponent', () => {
  let component: UiIconComponent;
  let fixture: ComponentFixture<UiIconComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiIconComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UiIconComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería mostrar el SVG si existe', () => {
    component.icon = 'globe-world';
    component.type = 'system';
    fixture.detectChanges();

    const req = httpMock.expectOne('assets/icons/system/globe-world.svg');
    req.flush('<svg width="24" height="24"></svg>');

    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.ui-icon'));
    expect(el.nativeElement.innerHTML).toContain('<svg');
    httpMock.verify();
  });

  it('debería mostrar el fallback si el SVG no existe', () => {
    component.icon = 'no-existe';
    component.type = 'system';
    fixture.detectChanges();

    const req = httpMock.expectOne('assets/icons/system/no-existe.svg');
    req.error(new ErrorEvent('404'));

    fixture.detectChanges();
    const fallback = fixture.debugElement.query(By.css('.ui-icon.notfound'));
    expect(fallback).toBeTruthy();
    expect(fallback.nativeElement.innerHTML).toContain('?');
    httpMock.verify();
  });
});
