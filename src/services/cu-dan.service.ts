import { Injectable } from '@angular/core';
import { CuDan } from 'src/models/cu-dan';
import { CanHo } from 'src/models/can-ho';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuDanService {
  baseApiUrl: string = "https://localhost:7224";

  constructor(private http: HttpClient) { }

  getAllCuDan(): Observable<CuDan[]>{
    return this.http.get<CuDan[]>(this.baseApiUrl + '/api/CuDan');
  }

  getCuDans(){
    return Promise.resolve(this.getAllCuDan());
  }

  getCuDansMini(){
    return this.getAllCuDan().pipe(map(cuDans => cuDans.slice(0, 5)));
  }

  getCuDansSmall(){
    return this.getAllCuDan().pipe(map(cuDans => cuDans.slice(0, 10)));
  }

  addCuDan(newCuDan: CuDan): Observable<CuDan>{
    newCuDan.id=0;
    return this.http.post<CuDan>(this.baseApiUrl + "/api/CuDan", newCuDan);
  }

  getCuDan(id: string): Observable<CuDan>{
    return this.http.get<CuDan>(this.baseApiUrl + '/api/CuDan/' + id);
  }

  updateCuDan(id: number, cuDanRequest: CuDan): Observable<CuDan>{
    return this.http.put<CuDan>(this.baseApiUrl + '/api/CuDan/' + id, cuDanRequest);
  }

  deleteCuDan(id: number):Observable<CuDan>{
    return this.http.delete<CuDan>(this.baseApiUrl + '/api/CuDan/' + id);
  }

  getCanHoByCuDan(id: number): Observable<CanHo[]>{
    return this.http.get<CanHo[]>(this.baseApiUrl + '/api/CuDan/CanHo/' + id);
  }

  addCuDanForCanHo(cuDanId: number, canHoId: number): Observable<void>{
    return this.http.post<void>(this.baseApiUrl + '/api/CuDan/' + cuDanId + '?canHoId=' + canHoId , '');
  }
}
