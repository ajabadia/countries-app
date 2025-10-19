// File: d:\desarrollos\countries2\frontend\src\app\features\public\home\home.component.spec.ts | New File

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LayoutService } from '@core/services/layout.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    // Creamos un mock del LayoutService con un spy en el método 'setPageTitle'
    mockLayoutService = jasmine.createSpyObj('LayoutService', ['setPageTitle']);

    await TestBed.configureTestingModule({
      // Importamos el componente standalone directamente
      imports: [HomeComponent],
      providers: [
        // Proveemos el mock en lugar del servicio real
        { provide: LayoutService, useValue: mockLayoutService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title to "Bienvenido" on init', () => {
    // Act: Disparamos el ciclo de vida ngOnInit
    fixture.detectChanges();

    // Assert: Verificamos que el método del servicio fue llamado con el argumento correcto
    expect(mockLayoutService.setPageTitle).toHaveBeenCalledWith('Bienvenido');
  });
});