import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {BehaviorSubject, Subject, throwError}  from 'rxjs';
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

interface LoginResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}



@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router){}
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expireToken = new Date(userData._tokenExpirationDate).getTime()  - new Date().getTime();
            this.autoLogout(expireToken);
        }
    }

    autoLogout(expirationDuration: number){
        console.log(expirationDuration);
      this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }


    signup(email: string, password: string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUGLXyKRDX0xFL6_wGITzSi4BRI1ffXag',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError( errorRes => {
            let errorMessage = 'Unknown error occurred!!!'
            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage)
            }
            errorMessage = errorRes.error.error.message;
            return throwError(errorMessage);
        }), 
        tap( responseData => {
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
            const user = new User(responseData.email,
                 responseData.localId,
                  responseData.idToken,
                   expirationDate);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogout(expirationDate.getTime() - new Date().getTime())
        }));
    }

    login(email: string, password: string){
       return this.http.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUGLXyKRDX0xFL6_wGITzSi4BRI1ffXag',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError( errorRes => {
            let errorMessage = 'Unknown error occurred!!!'
            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage)
            }
            errorMessage = errorRes.error.error.message;
            return throwError(errorMessage);
        }), 
        tap( responseData => {
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
            const user = new User(responseData.email,
                 responseData.localId,
                  responseData.idToken,
                   expirationDate);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogout(expirationDate.getTime() - new Date().getTime())
        }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


}