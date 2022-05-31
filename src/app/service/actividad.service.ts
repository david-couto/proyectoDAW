import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  catchError,Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  actividadURL = environment.actividadURL;
  actividadId: Number;
  constructor(private httpClient: HttpClient) { }

  public getActividades(): Observable<Actividad[]> {
    return this.httpClient.get<Actividad[]>(this.actividadURL).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public getCategorias(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.actividadURL+"/categorias").pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public getDificultades(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.actividadURL+"/dificultades").pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public getActividadById(id: number): Observable<Actividad> {
    return this.httpClient.get<Actividad>(this.actividadURL + `/${id}`).pipe(
      catchError(e =>{
        console.log(e)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public getActividadByNombre(nombre: string): Observable<Actividad> {
    return this.httpClient.get<Actividad>(this.actividadURL + `/nombre/${nombre}`).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public save(actividad: Actividad): Observable<any> {
    return this.httpClient.post<any>(this.actividadURL, actividad).pipe(
      catchError(e =>{
        console.log(e)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public update(id: number, actividad: Actividad): Observable<any> {
    return this.httpClient.put<any>(this.actividadURL + `/${id}`, actividad).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public delete(id: Number): Observable<any> {
    return this.httpClient.delete<any>(this.actividadURL + `/${id}`).pipe(
      catchError(e =>{
        swal.fire("Error al eliminar la actividad","No puedes elminar una actividad sin eliminar antes sus clases ",'error')
        throw new Error(e);
      })
    );;
  }
}
