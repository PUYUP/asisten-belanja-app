import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ENDPOINT = environment.apiEndpoint + 'wp/v2/posts';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private _httpClient: HttpClient) { }
  
  loadPosts() {
    return this._httpClient.get(ENDPOINT);
  }

}
