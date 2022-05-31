import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { catchError, Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from './../../environments/environment';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error en el Registro",e.error.mensaje,'error')
        throw new Error(e);
      })
    );;
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire("Error En el login",e.error.details[0],'error')
        throw new Error(e);
      })
    );;
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto).pipe(
      catchError(e =>{
        console.log(e.error)
        swal.fire(e.error.mensaje,e.error.error,'error')
        throw new Error(e);
      })
    );
  }
}
