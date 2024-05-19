import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of as observableOf } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpController: HttpTestingController;
  let authServiceSpy:jasmine.SpyObj<AuthService>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>(['validateUser'])
    routerSpy = jasmine.createSpyObj(Router, ['navigate'])

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    console.log('Created')
  });

  it('should navigate to dashboard', () => {
    const loginRequest={
      "userName":'admin',
      "password":'adminPass'
    }
    authServiceSpy.validateUser.and.returnValue(observableOf(true));
    component.loginForm.setValue({userName:'admin',passWord:'admin'});
    component.validateUser();
    fixture.detectChanges();
    expect(authServiceSpy.validateUser).toHaveBeenCalledWith(loginRequest);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard'])
    expect(component.loginForm.hasError('invalid')).toBeFalse()
  })

  it('should not navigate to dashboard', () => {
    authServiceSpy.validateUser.and.returnValue(observableOf(false));
    component.loginForm.setValue({userName:'admin',passWord:'admin'});
    component.validateUser();
    expect(component.loginForm.hasError('invalid')).toBe(true)
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['dashboard'])
  })
});
