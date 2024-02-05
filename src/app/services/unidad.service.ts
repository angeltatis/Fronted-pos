import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Unidad } from "../interfaces/Unidad";

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = 'https://localhost:7194/api/v1/Unids';

  constructor(private http: HttpClient) { }

  obtenerUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.apiUrl);
  }

  obtenerUnidadPorId(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.apiUrl}/${id}`);
  }

  crearUnidad(descripcion: { desuni: any }): Observable<Unidad> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Unidad>(this.apiUrl, descripcion, { headers });
  }



  actualizarUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.put<Unidad>(`${this.apiUrl}/${unidad.coduni}`, unidad);
  }

  desactivarUnidad(coduni:  number): Observable<any> {
    return this.http.put(`${this.apiUrl}/des/${coduni}`,null);

  }
}
