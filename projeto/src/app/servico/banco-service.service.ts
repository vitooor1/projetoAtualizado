import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class BancoServiceService {

  readonly API = 'http://localhost:3000/produtos/';

  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getItem() {
    return this.http.get<Produtos[]>(this.API);
  }
  postItem(produtos: any) {
    return this.http.post(this.API, JSON.stringify(produtos), this.HttpOptions).subscribe();
  }



  deleteItem(id: number) {

    return this.http.delete(this.API + id).subscribe();

  }


}
