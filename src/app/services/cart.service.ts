import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ENDPOINT = environment.apiEndpoint + 'wp/v2/carts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  loadCarts(param: any = {}): Observable<any> {
    // building filter
    let params = new HttpParams();
    const meta_query = param?.meta_query;

    if (meta_query) {
      if (meta_query?.relation) {
        params = params.set('filter[meta_query][relation]', meta_query?.relation);
      }

      for (let [index, meta] of meta_query['values'].entries()) {
        params = params.set(`filter[meta_query][${index}][key]`, meta['key']);
        params = params.set(`filter[meta_query][${index}][value]`, meta['value']);
        params = params.set(`filter[meta_query][${index}][compare]`, meta['compare']);
      }
    }

    return this._httpClient.get(ENDPOINT, {params: params});
  }

  retrieveCart(id: any): Observable<any> {
    return this._httpClient.get(ENDPOINT + '/' + id);
  }

  createCart(param: any = {}): Observable<any> {
    return this._httpClient.post(ENDPOINT, param);
  }

  addItemToCart(param: any = {}, id: number): Observable<any> {
    return this._httpClient.post(ENDPOINT + '/' + id, param);
  }
  
}
