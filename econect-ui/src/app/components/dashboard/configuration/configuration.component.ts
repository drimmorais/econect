import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbToastConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { modalConfig } from 'src/app/config/modal.config';
import { AuthService } from '../../service/auth/auth.service';
import { UpdatePasswordService } from '../../service/recover-password/update-password.service';
import { ToastService } from '../../service/toast/toast.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public closeResult = '';
  public show = true;
  public passwordForm: FormGroup;
  public selectedSimpleItem = 'Ativo';
  public simpleItems = ['Ativo', 'Desativo'];
  public tag: any;
  public modalReference: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private updateService: UpdatePasswordService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.simpleItems = ['Ativo', 'Desativo'];
    this.createFormPassword();
    let aux = this.authService.getUserInfos();
    this.tag = aux.tag;
    console.log(this.tag)
  }

  public createFormPassword(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, Validators.required),
    });
  }

  public changePassword(form: any) {
    console.log(form, this.tag)
    if (this.tag === 'collect point') {
      this.updateService.updatePasswordCollectPoint(form)
        .subscribe((res: any) => {
          console.log(res)
          this.modalReference.close()
        }, (err: HttpErrorResponse) => {
          console.log(err)
        });
    } else if ((this.tag === 'citizen')) {
      this.updateService.updatePasswordCitizen(form)
        .subscribe((res: any) => {
          console.log(res)
          this.modalReference.close()
        }, (err: HttpErrorResponse) => {
          console.log(err)
        });
    }
  }

  public openModal(content: any): void {
    this.modalReference = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 3000 });
  }

  showDanger(dangerTpl: any) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
}

