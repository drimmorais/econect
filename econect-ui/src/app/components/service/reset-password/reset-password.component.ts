import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../recover-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPassword: FormGroup

  constructor(
    private elementRef: ElementRef,
    private resetService: ResetPasswordService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirm_password: new FormControl(null, Validators.required)
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e7ebea';
  }

  public resetSuccess(form: any): void {
    this.resetService.resetPassword(form)
      .subscribe((res) => {
        console.log(res)
        this.router.navigate([atob(this.activatedRouter.snapshot.params.to || btoa('/login'))]);
      }, (err: HttpErrorResponse) => {
        console.log(err)
      })
  }
}
