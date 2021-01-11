import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  usuariosUrl = 'http://localhost:8080/usuarios';

  //Injetanto o HTTPCLIENT
  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  //Obtem todos os usuarios
  getUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.usuariosUrl)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }


  //Obtem o usuario pelo ID
  getUsuarioById(id: number): Observable<User>{
    return this.http.get<User>(this.usuariosUrl+'/'+id )
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Salva um usuario
  saveUsuario(user: User): Observable<User>{
    return this.http.post<User>(this.usuariosUrl, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Atualiza usuario
  updateUsuario(user: User): Observable<User>{
    return this.http.put<User>(this.usuariosUrl+'/'+user.id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // Deleta um usuario
  deleteUsuario(user: User){
    return this.http.delete<User>(this.usuariosUrl+'/'+user.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

