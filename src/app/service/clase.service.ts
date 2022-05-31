import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  catchError,Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import { Cliente } from '../models/Cliente';
import { Clase } from '../models/Clase';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  public getMisClasesImpartidas(username: string): Observable<Clase[]>{
    return this.http.get<Clase[]>(`${this.claseUrl}/monitor/${username}`);
  }

  claseUrl = environment.claseURL
  constructor(private http: HttpClient) { }
  public getClasesCalendar(username : String): Observable<any[]>{
    return this.http.get<any[]>(`${this.claseUrl}/calendarDTO/${username}`).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public getClasesFuturas():Observable<Clase[]>{
    return this.http.get<Clase[]>(this.claseUrl+"/futuras").pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;;
  }
  public getMisClases(username: string): Observable<Clase[]>{
    return this.http.get<Clase[]>(`${this.claseUrl}/user/${username}`).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;;
  }
  public getClaseById(id: Number): Observable<Clase>{
    return this.http.get<Clase>(`${this.claseUrl}/${id}`).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;;
  }
  public save(clase: Clase): Observable<any> {
    return this.http.post<any>(this.claseUrl, clase).pipe(
      catchError(e =>{
        console.log(e)
        swal.fire("Error ","El monitor tiene alguna clase asignada en esas horas ",'error')
        throw new Error(e);
      })
    );;;
  }
  public update(id: Number, clase: Clase): Observable<any> {
    return this.http.put<any>(this.claseUrl + `/${id}`, clase)
    
  }
  public updateAsistente(id: Number, usuario: string): Observable<any>{
    console.log(id)
    return this.http.put<any>(`${this.claseUrl}/asistentes/${id}`,usuario)
    
  }
  public delete(id: Number) :Observable<any>{
    return this.http.delete<any>(`${this.claseUrl}/${id}`).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
}
