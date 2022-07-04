import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../service/recover-password/forgot-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit, AfterViewInit {

  public recoverForm: FormGroup
  public viewSuccess: boolean = false;
  public messageError = false;

  constructor(
    private elementRef: ElementRef,
    private forgotService: ForgotPasswordService
  ) { }

  ngOnInit(): void {
    this.recoverForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e7ebea';
  }

  public recoverSuccess(email: string) {
    this.forgotService.forgotPassword(email)
      .subscribe((res) => {
        console.log(res)
        localStorage.setItem('resetToken', JSON.stringify(res.token))
        this.viewSuccess = true
      },
        (err: HttpErrorResponse) => {
          console.log('Deu ruim', err.error)
          this.messageError = true
          this.viewSuccess = false
        });

  }

}
