import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface User {
  userName: string,
  password: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public curentUserName: string;
  userRole: string;
  public isAuthenticated: Observable<boolean>;
  loginURL: string = 'http://localhost:8081/auth/login'
  private notificationConfig: {};


  userList: User[];
  constructor(private apiService: ApiService,
    private toastr: ToastrService) {
    this.notificationConfig = {
      enableHtml: true,
      closeButton: true,
      newestOnTop: true,
      timeOut: 10000,
      maxShown: 1
    };
  }

  public signUpUser(signupURL: string, request: any) {
    console.log("Request: " + JSON.stringify(request) + "SignUpURL" + signupURL);
    return this.apiService.post(signupURL, request).pipe(
      map((response: any) => {
        console.log(response.data.accessToken);
        const accessToken = response.data.accessToken;
        this.toastr.success('Successfully signed in', 'Success', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        // this.isAuthenticated = accessToken != null;
        return this.isAuthenticated;
      }),
      catchError((error: any) => {
        console.log(error);
        this.toastr.info(error.error.error, 'Error', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        throw new Error('An error occurred while making the request.');
      })
    );
  }

  public validateUser(request: any): Observable<boolean> {
    if (request.password === 'Test123456' && request.userName === 'Consumer') {
      this.curentUserName = 'TestUser';
      this.toastr.success('Successfully logged in', 'Success', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
      this.isAuthenticated = of(true);
      return this.isAuthenticated;
    } else {
      this.toastr.info('ERROR', 'Invalid Credentials', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
      throw new Error('An error occurred while making the request.');
    }

    //   this.apiService.post(this.loginURL, request).pipe(
    //     map((response: any) => {
    //       console.log(response.data.accessToken);
    //       const accessToken = response.data.accessToken;
    //       this.curentUserName = response.data.userName;
    //       this.toastr.success('Successfully logged in', 'Success', {
    //         timeOut: 3000,
    //         closeButton: true,
    //         positionClass: 'toast-top-right',
    //       });
    //       this.isAuthenticated = accessToken !== null;
    //       return this.isAuthenticated;
    //     }),
    //     catchError((error: any) => {
    //       this.toastr.info(error.error.error, 'Invalid Credentials', {
    //         timeOut: 3000,
    //         closeButton: true,
    //         positionClass: 'toast-top-right',
    //       });
    //       throw new Error('An error occurred while making the request.');
    //     })
    //   );
  }
}
