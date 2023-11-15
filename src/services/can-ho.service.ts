import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanHo } from 'src/models/can-ho';
import { CuDan } from 'src/models/cu-dan';

@Injectable({
  providedIn: 'root'
})
export class CanHoService {
  baseApiUrl: string = "https://localhost:7224";

  constructor(private http: HttpClient) { };

  getAllCanHo(): Observable<CanHo[]>{
    return this.http.get<CanHo[]>(this.baseApiUrl + '/api/CanHo');
  }

  addCanHo(newCanHo: CanHo): Observable<CanHo>{
    newCanHo.id=0;
    return this.http.post<CanHo>(this.baseApiUrl + "/api/CanHo", newCanHo);
  }

  updateCanHo(id: number, canHoRequest: CanHo): Observable<CanHo>{
    return this.http.put<CanHo>(this.baseApiUrl + '/api/CanHo/' + id, canHoRequest);
  }

  deleteCanHo(id: number): Observable<CanHo>{
    return this.http.delete<CanHo>(this.baseApiUrl + '/api/CanHo/' + id);
  }

  getCuDanByCanHo(id: number): Observable<CuDan[]>{
    return this.http.get<CuDan[]>(this.baseApiUrl + '/api/CanHo/CuDan/' + id);
  }
}
