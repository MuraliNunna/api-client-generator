import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { APIClient, APIClientModule } from '../api';

describe('APIClientModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        APIClientModule.forRoot({
          httpOptions: {
            headers: {
              'testHeader': '42',
            }
          }
        }),
      ],
    });
  });

  it('should provide APIClient', inject([APIClient], (apiClient: APIClient) => {
    expect(apiClient).toBeTruthy();
  }));

  it('should have domain set to current hostname and port', inject([APIClient], (apiClient: APIClient) => {
    expect(apiClient.domain).toBe(`//${window.location.hostname}${window.location.port ? ':'+window.location.port : ''}`);
  }));

  it('should have header set', inject([APIClient], (apiClient: APIClient) => {
    expect(apiClient.options.headers.getAll('testHeader')).toEqual(['42']);
  }));

  it('should not have params set', inject([APIClient], (apiClient: APIClient) => {
    // if params are not set they equal to new empty http params
    expect(apiClient.options.params).toEqual(new HttpParams());
  }));
});
