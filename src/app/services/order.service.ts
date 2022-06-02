import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ENDPOINT = environment.apiEndpoint + 'wp/v2/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  createOrder(param: any = {}): Observable<any> {
    return this._httpClient.post(ENDPOINT, param);
  }

  loadOrders(filter: any = {}): Observable<any> {
    return this._httpClient.get(ENDPOINT);
  }

  retrieveOrder(id: any): Observable<any> {
    return this._httpClient.get(ENDPOINT + '/' + id);
  }

  updateOrder(param: any = {}, id: any): Observable<any> {
    return this._httpClient.post(ENDPOINT + '/' + id, param);
  }

}
