import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {
  url="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=11";
  key=environment.key;

  constructor(private http:HttpClient) { }

  fetchResult(query:string){
    return this.http.get(this.url+"&q="+query+"&key="+this.key);
  }

  


}
