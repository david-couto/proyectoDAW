import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError,Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/Cliente';
import { Monitor } from '../models/Monitor';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL = environment.usuarioURL
  constructor(private http: HttpClient) { }

  public getMonitores(): Observable<Monitor[]>{
    return this.http.get<Monitor[]>(this.usuarioURL+"/monitores").pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.usuarioURL+"/clientes").pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public getMisDatos(nombreUsuario: String ):Observable<any>{
    return this.http.get<any>(this.usuarioURL+"/monitores/"+nombreUsuario).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error ",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }
  public delete(id:Number) :Observable<any>{
    return this.http.delete(this.usuarioURL+"/"+id).pipe(
      catchError(e =>{
       
        swal.fire("Error al eliminar Usuario ","No puedes elminar un usuario sin eliminar antes sus clases ",'error')
        throw new Error(e);
      })
    );;
  }
  
}
