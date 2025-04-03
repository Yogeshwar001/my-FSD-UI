import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService } from 'src/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Calendar } from '@fullcalendar/angular';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let httpMock:HttpTestingController
  let commonService:CommonService
  let calendarRenderSpy: jasmine.Spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [CommonService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    calendarRenderSpy = spyOn(Calendar.prototype, 'render').and.callThrough();
    httpMock = TestBed.inject(HttpTestingController);
    commonService = TestBed.inject(CommonService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Fullcalendar'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Fullcalendar');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.titleHeader').textContent).toContain('Hello');
  });

  it('should fetch data and update the data property on fetchServer()', () => {
    const mockResponse = 'Tejas';  // The mock response from the server
    spyOn(console, 'log');  // Spy on console.log to check if data is logged

    // Call the fetchServer method
    component.fetchServer();

    // Expect an HTTP GET request to /api/hello
    const req = httpMock.expectOne('/api/hello');
    expect(req.request.method).toBe('GET');
    
    // Mock the response with the mock data
    req.flush(mockResponse);

    // Check if the component's data property is updated correctly
    expect(component.data).toBe(mockResponse);

    // Check if the console.log was called with the correct data
    expect(console.log).toHaveBeenCalledWith(mockResponse);
  });

  it('should log error on server error in fetchServer()', () => {
    const mockErrorResponse = new HttpErrorResponse({
      error: 'Error occurred',
      status: 500,
      statusText: 'Server Error',
      url: '/api/hello'
    });
  
    // Spy on console.error to check if errors are logged
    spyOn(console, 'error');
  
    // Call the fetchServer method
    component.fetchServer();
  
    // Expect an HTTP GET request to /api/hello
    const req = httpMock.expectOne('/api/hello');
    expect(req.request.method).toBe('GET');
    
    // Simulate an error response with an HttpErrorResponse
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  
    // Check if the console.error was called with the HttpErrorResponse
    expect(console.error).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 500,
      statusText: 'Server Error',
      url: '/api/hello'
    }));
  });
  
  it('should set the name property when getName() is called and the service returns a response', () => {
    const mockName = 'Tejas';
    const mockResponse = `"Hello, Tejas!"`; // Mock response

    // Call the getName method
    component.getName(mockName);

    // Expect an HTTP GET request to /api/Tejas
    const req = httpMock.expectOne(`/api/${mockName}`);
    expect(req.request.method).toBe('GET');

    // Simulate the response from the service
    req.flush(mockResponse);

    // Verify that the component's 'name' property is updated
    expect(component.name).toBe(mockResponse);
  });

  xit('should handle errors correctly when getName() is called and the service fails', () => {
    const mockName = 'Tejas';
    const mockErrorMessage = 'Error occurred';

    // Spy on console.error to check if errors are logged
    spyOn(console, 'error');

    // Call the getName method
    component.getName(mockName);

    // Expect an HTTP GET request to /api/Tejas
    const req = httpMock.expectOne(`/api/${mockName}`);
    expect(req.request.method).toBe('GET');

    // Simulate an error response
    req.flush(mockErrorMessage, { status: 500, statusText: 'Server Error' });

    // Verify that the component's 'name' property is updated with the error message
    expect(component.name).toBe(mockErrorMessage);

    // Check if console.error was called with the correct error message
    expect(console.error).toHaveBeenCalledWith(mockErrorMessage);
  });

  
  it('should set the name property when getUserDetails() is called and the service returns a response', () => {
    const mockUserDetails = [
      { name: 'Ram', age: 20, city: 'Hyd', salary: 201000 },
      { name: 'Manoj', age: 30, city: 'BLR', salary: 120000 },
      { name: 'Ashok', age: 40, city: 'Pune', salary: 230000 },
    ];
    // Call the getName method
    component.getUserDetails();

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');

    // Simulate the response from the service
    req.flush(mockUserDetails);
  });


});
