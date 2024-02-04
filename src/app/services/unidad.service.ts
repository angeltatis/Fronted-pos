import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
    return this.http.post<Unidad>(this.apiUrl, {desuni: descripcion});
  }

  actualizarUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.put<Unidad>(`${this.apiUrl}/${unidad.coduni}`, unidad);
  }

  desactivarUnidad(coduni:  number): Observable<any> {
    return this.http.put(`${this.apiUrl}/des/${coduni}`,null);

  }
}
