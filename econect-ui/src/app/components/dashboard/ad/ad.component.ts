import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { modalConfig } from 'src/app/config/modal.config';
import { adActive, INewAd } from 'src/app/model/ad/ad.model';
import { AdService } from '../../service/ad/ad.service';
import { AuthService } from '../../service/auth/auth.service';
import { CustomAdapter } from '../../service/datapicker/custom-adapter.service';
import { CustomDateParserFormatter } from '../../service/datapicker/custom-date-parser-formatter.service';
import { ScheduleService } from '../../service/schedule/schedule.service';
import { SnackBar } from '../../service/snack-bar/snack-bar.service';
import { ToastService } from '../../service/toast/toast.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AdComponent implements OnInit {
  public closeResult = '';
  public selectedTypeAd = '';
  public adForm: FormGroup;
  public scheduleForm: FormGroup;
  public typeAd = [{ label: 'Compra', value: true }, { label: 'Doação', value: false }];
  public isRecyclable = [{ label: 'Sim', value: true }, { label: 'Não', value: false }];
  public selectedIsRecyclable = '';
  public selectedTypeMaterial = '';
  public selectedTypeMaterialId = '';
  public typeMaterial = ['Metal', 'Papel', 'Plástico', 'Vidro'];
  public model2: NgbDateStruct;
  public adsActive: Array<adActive> = [];
  public tag: any;
  public viewButton = false;
  public modalReference1: NgbModalRef;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  public delivery_type: string
  public idCollectPonit: number
  public noHasAd = false;
  public materialSelected = [{ id: null, description: '', key_aux: '' }];
  public isRecyclableFlag = true;
  public completeMaterial = [{ id: null, description: '', key_aux: '' }];
  public adInfo: any;
  public scheduleRecyclable: boolean;
  public isAdm = false;
  public isCollectPoint = false;
  public isCitizen = false;

  constructor(
    private modalService: NgbModal,
    private adService: AdService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private scheduleService: ScheduleService,
    private snackBar: SnackBar) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllAd();
    let aux = this.authService.getUserInfos();
    this.tag = aux.tag;
    if (this.tag === 'collect point')
      this.isCollectPoint = true;
    else if (this.tag === 'citizen')
      this.isCitizen = true;
    else
      this.isAdm = true
  }

  getRecyclable() {
    let aux = this.adForm.value.isrecyclable.value
    if (aux) {
      this.adForm.get('type_material')?.enable()
      this.adForm.get('type_material_id')?.enable()
      this.isRecyclableFlag = true;
    } else {
      this.adForm.get('type_material')?.disable()
      this.adForm.get('type_material_id')?.disable()
      this.isRecyclableFlag = false;
    }
  }

  getTypeAd() {
    if (this.adForm.value.type && this.adForm.value.type.value !== undefined) {
      let aux = this.adForm.value.type.value
      if (aux) {
        this.adForm.get('price')?.enable()
      }
      else {
        this.adForm.controls['price']?.disable()
      }
    }
  }

  getMaterialById() {

    this.scheduleService.getMaterialByCategory(this.selectedTypeMaterial)
      .subscribe((q) => {
        this.materialSelected = q.lista.map((m: any) => m.description)
        this.completeMaterial = q.lista
        console.log(this.materialSelected)
      }, err => console.log(err))

  }

  openSuccess() {
    this._snackBar.open('Anúncio criado com sucesso!', 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
    });
  }

  openError() {
    this._snackBar.open('Anúncio não foi criado =(!', 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
    });
  }

  public getAllAd(): void {
    this.adService.getAllAd()
      .subscribe((ad: any) => {
        if (ad.length) {
          this.adsActive = ad
          this.noHasAd = false
        } else {
          this.noHasAd = true
        }
        console.log(this.adsActive)
      }, (err: HttpErrorResponse) => {
        console.log(err)
      })
  }

  public createForm(): void {
    this.adForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      closing_date: new FormControl(null, Validators.required),
      type_material: new FormControl(1, Validators.required),
      type_material_id: new FormControl(1, Validators.required),
      quantity: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      isrecyclable: new FormControl(null, Validators.required),
      minimum: new FormControl(null, Validators.required)
    })


    this.scheduleForm = new FormGroup({
      schedule_date: new FormControl(null, Validators.required),
      schedule_hours: new FormControl(null, Validators.required),
      collect_point_id: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      point_accumulated: new FormControl(null, Validators.required),
      delivery_type: new FormControl(null, Validators.required),
      isrecyclable: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      note: new FormControl('Essa coleta não tem especificações', Validators.required),
    })
  }

  public openModal(content: any, data?: any): void {
    console.log(content)
    data ? (this.idCollectPonit = data.collect_point_id, this.adInfo = data) : this.idCollectPonit = 0.0
    console.log('a', this.adInfo)
    if (this.adInfo.isrecyclable) {
      this.scheduleRecyclable = this.adInfo.isrecyclable;
    }
    this.modalReference1 = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  public openCreateAd(content: any): void {
    this.modalReference1 = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  public createAd(form: any): void {

    let id: any

    this.completeMaterial.map(m => {
      if (m.description === this.selectedTypeMaterialId) {
        id = m.id
      }
    })

    const formEdit = {
      title: form.title,
      type: form.type.label,
      closing_date: form.closing_date,
      type_material_id: id || null,
      quantity: form.quantity,
      price: form.price || 0,
      content: form.content,
      isrecyclable: form.isrecyclable.value,
      minimum: form.minimum
    }
    console.log(formEdit)

    this.adService.postAd(formEdit)
      .subscribe((res) => {
        console.log('Res:', res)
        this.getAllAd();
        this.openSuccess();
        this.adForm.reset();
        this.modalReference1.close()
      }, (err: HttpErrorResponse) => {
        console.log(err)
        this.openError();
      })
  }

  public sendSchedule() {


    let dateFormat = this.scheduleForm.value.schedule_date
    dateFormat = dateFormat.replace(/[\-]+/g, '/')

    const schedule = {
      ad_id: this.adInfo.id,
      weight: [this.scheduleForm.get('weight')?.value],
      point_accumulated: "14",
      note: this.scheduleForm.get('note')?.value,
      schedule_hours: this.scheduleForm.get('schedule_hours')?.value,
      schedule_date: dateFormat,
      delivery_type: this.delivery_type,
      isrecyclable: this.adInfo.isrecyclable,
      amount: this.scheduleForm.get('amount')?.value,
      collect_point_id: this.idCollectPonit,
      type_material_id: [this.adInfo.type_material_id],
      operation: "SCHEDULE",
    }
    console.log(schedule)

    this.adService.scheduleAd(schedule)
      .subscribe((res) => {
        this.snackBar.openSuccess('Agendamento realizado com sucesso');
        this.modalReference1.close()
        console.log('res', res)
      }, err => {
        console.log(err)
        this.snackBar.openError(err.error.erro)
      })
  }

  public selectDeliveryType(type: string) {
    this.delivery_type = type;
  }
}
