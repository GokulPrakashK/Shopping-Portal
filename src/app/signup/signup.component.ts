import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public show:boolean=false;
  signUpForm: FormGroup;
  signUpURL: string ='http://localhost:8081/sign-up'
  private notificationConfig: {};

  constructor(private router :Router,
   private fb:FormBuilder,
   private apiService:ApiService,
   private authService:AuthService){
    this.notificationConfig = {
      enableHtml: true,
      closeButton: true,
      newestOnTop: true,
      timeOut: 10000,
      maxShown: 1
    };
  }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstName:['',[Validators.required]],
      lastName:[''],
      phoneNumber:['',[Validators.required]],
      email:['',[Validators.required]],
      password: ['',[Validators.minLength(10),Validators.required]],
      address:['',[Validators.required]]
    });
  }

  public signUp(){
    console.log(this.signUpForm);
    this.authService.signUpUser(this.signUpURL,this.signUpForm.value )
    .subscribe(response=>{
      if(response){
        this.router.navigate(['products'])
      }else{
        this.signUpForm.setErrors({'invalid':true})
      }
    });
  }
}
