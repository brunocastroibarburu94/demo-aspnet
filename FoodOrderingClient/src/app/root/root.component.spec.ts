import { TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'FoodOrderingClient' title`, () => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FoodOrderingClient');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RootComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, FoodOrderingClient');
  });
});





//////////////////////////////////////////////////////////////////

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RootComponent } from './root.component';

// describe('RootComponent', () => {
//   let component: RootComponent;
//   let fixture: ComponentFixture<RootComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RootComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(RootComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
