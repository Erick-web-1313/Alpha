import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Token } from "../models/token";
import { LoginDTO } from "../models/LoginDTO.model";

@Injectable({
    providedIn: 'root',
  })
  export class LoginDtoService{
    readonly urlApi = environment.urlApi;
    readonly urlProductApi = environment;
    constructor(private http: HttpClient) { }

    public login(loginDTOModel: LoginDTO): Observable<Token> {
        return this.http.post<Token>(`${this.urlApi}auth/login`, loginDTOModel);
    }
  }