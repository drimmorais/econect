import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/model/auth/login.model';
import { User } from 'src/app/model/auth/user.model';
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public loginForm: FormGroup;
  public hide = true;
  public invalidPassword = false

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('econectToken');
    this.createForm();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e7ebea';
  }

  public createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  public login(params: Login): void {
    console.log('Cheguei no login', params)
    this.authService.postLogin(params)
      .subscribe(res => {
        console.log('Cheguei no subscribe: ', res)
        const usersInfo = {
          id: res.id,
          tag: res.type
        }
        localStorage.setItem('econectToken', JSON.stringify(res.token))
        localStorage.setItem('userInfo', JSON.stringify(usersInfo))
        this.router.navigate([atob(this.activatedRouter.snapshot.params.to || btoa('/dashboard'))]);
      },
        (err: HttpErrorResponse) => {
          err.error.erros[0] === 'Senha Invalida' ? this.invalidPassword = true : this.invalidPassword = false
          console.log('Erro -->', err)
        });

  }



}
