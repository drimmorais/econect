import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { modalConfig } from 'src/app/config/modal.config';
import { ICollectPointInfo } from 'src/app/model/collectPoint/collectPoint.model';
import { MaterialAndQuatity, QuantityMaterial } from 'src/app/model/quantityMaterial/quantityMaterial.model';
import { CustomAdapter } from '../../service/datapicker/custom-adapter.service';
import { CustomDateParserFormatter } from '../../service/datapicker/custom-date-parser-formatter.service';
import { ScheduleService } from '../../service/schedule/schedule.service';
import { SnackBar } from '../../service/snack-bar/snack-bar.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbTimepickerConfig }
  ]
})
export class ScheduleComponent implements OnInit {

  public modalReference1: NgbModalRef;
  public model2: NgbDateStruct;
  public plastic = { label: 'PLASTIC', value: 'plástico' };
  public paper = { label: 'PAPER', value: 'papel' };
  public glass = { label: 'GLASS', value: 'vidro' };
  public metal = { label: 'METAL', value: 'metal' };
  public materialSelected = [{ id: null, description: '', key_aux: '' }];
  public collectPoints: ICollectPointInfo[];
  public time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  public scheduleForm: FormGroup;
  public materialsAndQuatity: MaterialAndQuatity[] = [];
  private aux: string
  public category: string[] = []
  private idCollectPonit: number
  public materialsForm: FormGroup;
  public step2 = false;
  public step3 = false;
  public delivery_type: string
  public materialSelection: any[]

  constructor(
    private modalService: NgbModal,
    private scheduleService: ScheduleService,
    private snack: SnackBar,
    ) { }

  ngOnInit(): void {
    console.log(this.materialsAndQuatity)
    this.createForms()
  }

  public createForms() {

    this.scheduleForm = new FormGroup({
      schedule_date: new FormControl(null, null),
      schedule_hours: new FormControl(null, null),
      point_accumulated: new FormControl(null, null),
      collect_point_id: new FormControl(null, null),
      type_material_id: new FormControl(null, null),
      weight: new FormControl(null, null),
      note: new FormControl(null, null),
    })

    this.materialsForm = new FormGroup({
      CoposPlastico: new FormControl(null, null),
      GarrafasPlastico: new FormControl(null, null),
      SacosESacolas: new FormControl(null, null),
      FrascosDeProdutos: new FormControl(null, null),
      Tampas: new FormControl(null, null),
      Potes: new FormControl(null, null),
      CanosETubosDePVC: new FormControl(null, null),
      PET: new FormControl(null, null),
      EmbalagemDeAlimentos: new FormControl(null, null),

      JornaisERevistas: new FormControl(null, null),
      ListasTelefonicas: new FormControl(null, null),
      Papel: new FormControl(null, null),
      Caixas: new FormControl(null, null),
      EmbalagemLongaVida: new FormControl(null, null),
      Envelope: new FormControl(null, null),
      Rascunhos: new FormControl(null, null),

      TampaDeGarrafa: new FormControl(null, null),
      Latas: new FormControl(null, null),
      PanelasSemCabo: new FormControl(null, null),
      Ferragens: new FormControl(null, null),
      Arames: new FormControl(null, null),
      ChapasDeAçoEAlumínio: new FormControl(null, null),
      Canos: new FormControl(null, null),
      Pregos: new FormControl(null, null),
      Cobre: new FormControl(null, null),

      GarrafasVidro: new FormControl(null, null),
      FrascosDeRemedio: new FormControl(null, null),
      CoposVidro: new FormControl(null, null),
      Cacos: new FormControl(null, null),
      ParaBrisas: new FormControl(null, null),
      PotesVidro: new FormControl(null, null),
      FrascosDeProdutosVidro: new FormControl(null, null),
    })
  }

  public openModal(content?: any, type?: string): void {
    type ? this.aux = type : this.aux = ''
    type = type?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log(type)
    this.scheduleService.getMaterialByCategory(type)
      .subscribe((q) => {
        this.materialSelected = q.lista
      }
        , err => console.log(err))
    this.modalReference1 = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  public addQuantity(id: any, quantity: any, key: any, description: any) {
    this.materialsForm.get(key)?.setValue(quantity)
    let aux = {
      id: id,
      key: key,
      description: description,
      weight: quantity
    }
    this.scheduleForm.reset();
    this.materialsAndQuatity.push(aux);
    if (this.category && !this.category.includes(this.aux)) {
      this.category.push(this.aux)
    }
  }

  public addCollectPoint(id: number) {
    this.step3 = true;
    this.idCollectPonit = id
    console.log(this.idCollectPonit)
  }

  public sendSchedule() {
    let id: number[] = [], key: string[] = [], weigth: number[] = []

    this.materialsAndQuatity.map((m: any) => {
      key.push(m.key)
      id.push(m.id)
    })

    key.map(k => {
      weigth.push(this.materialsForm.get(k)?.value)
    })

    let dateFormat = this.scheduleForm.value.schedule_date
    dateFormat = dateFormat.replace(/[\-]+/g, '/')

    console.log('type', this.delivery_type)

    let idAux = this.materialsAndQuatity.map((m: any) => m.id)
    let weightAux = this.materialsAndQuatity.map((m: any) => m.weight)

    const schedule = {
      weight: weightAux, //weigth,
      note: "Esse material não há especificações",
      operation: "SCHEDULE",
      schedule_hours: this.scheduleForm.value.schedule_hours,
      schedule_date: dateFormat,
      point_accumulated: "14",
      collect_point_id: this.idCollectPonit,
      type_material_id: idAux,//id
      delivery_type: this.delivery_type,
      isrecyclable: true,
      amount: null,
    }

    console.log('schedule', schedule)

    this.scheduleService.postSchedule(schedule)
      .subscribe(res => {
        console.log(res)
        if(res.created){
          this.snack.openSuccess('Agendamento realizado com sucesso!')
          this.modalReference1.close()
        }else{
          this.snack.openError(res.msg)
        }
        this.step2 = false;
        this.step3 = false;
        this.category = [];
        this.materialsAndQuatity = [];
      }, err => {
        console.log(err)
        this.snack.openError(err)})
  }

  public continue() {
    this.step2 = true;
    this.scheduleService.getCollectPointAll(this.category)
      .subscribe((res: ICollectPointInfo[]) => {
        this.collectPoints = res
        console.log(res)
        console.log(this.collectPoints)
      }, (err) => console.log(err))
  }

  public selectDeliveryType(type: string) {
    this.delivery_type = type;
    console.log(this.delivery_type)
  }

}
