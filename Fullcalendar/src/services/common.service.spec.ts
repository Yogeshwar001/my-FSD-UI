import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('CommonService', () => {
  let service: CommonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request and return a greeting message when greetUser() is called', () => {
    const mockName = 'Tejas';
    const mockResponse = `"Hello, Tejas!"`; // Mock response from the server

    // Call the greetUser method
    service.greetUser(mockName).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    // Expect an HTTP GET request to /api/Tejas
    const req = httpMock.expectOne(`/api/${mockName}`);
    expect(req.request.method).toBe('GET');
    
    // Respond with the mock data
    req.flush(mockResponse);
  });

  it('should send a GET request and return a greeting message when getUserList() is called', () => {
    const mockUserList = [
      { name: 'Ram', age: 20, city: 'Hyd', salary: 201000 },
      { name: 'Manoj', age: 30, city: 'BLR', salary: 120000 },
      { name: 'Ashok', age: 40, city: 'Pune', salary: 230000 },
    ];
    // Call the greetUser method
    service.getUserList().subscribe((response) => {
      expect(response).toBe(mockUserList);
    });

    // Expect an HTTP GET request to /api/Tejas
    const req = httpMock.expectOne(`/api/users`);
    expect(req.request.method).toBe('GET');
    
    // Respond with the mock data
    req.flush(mockUserList);
  });
});
