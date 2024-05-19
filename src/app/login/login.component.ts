import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public show:boolean=false;
  loginForm: FormGroup;
  public accessToken: string; 
  private notificationConfig: {};

  constructor(private router :Router,
   private authService:AuthService,
   private fb:FormBuilder,
   private apiService:ApiService){
    this.notificationConfig = {
      enableHtml: true,
      closeButton: true,
      newestOnTop: true,
      timeOut: 10000,
      maxShown: 1
    };
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      userName:['',[Validators.required]],
      passWord: ['',[Validators.minLength(10),Validators.required]]
    });
  }
  
  public validateUser(){
    const userName=this.loginForm.get('userName')?.value;
    const passWord=this.loginForm.get('passWord')?.value;
    let isValidUser:boolean=true;
    this.loginUser(userName,passWord)
    .subscribe(response=>{
      isValidUser=response;
      if(isValidUser){
        this.router.navigate(['products'])
      }else{
        this.loginForm.setErrors({'invalid':true})
      }
    });    
  }

  public loginUser(userName: any,passWord: any):Observable<boolean>{
    const loginRequest={
      "userName":userName,
      "password":passWord
    }
    let isValid:boolean=false;
    return this.authService.validateUser(loginRequest);
  }
}
