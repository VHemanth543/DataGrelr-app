import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient)  {
   
   }

   /* CONNECTING ANGULAR TO NODE JS BACKEND */

  setData(data : any) : Observable<any>{
    let headers = new HttpHeaders();
        headers.append('Content-Type' , 'application/json');
        return this.http.post("http://localhost:8000/add" , data , {headers : headers});
  }

  
}
