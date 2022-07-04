import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApproveCollectPointService } from 'src/app/components/service/approve-collect-point/approve-collect-point.service';
import { AuthService } from 'src/app/components/service/auth/auth.service';
import { SnackBar } from 'src/app/components/service/snack-bar/snack-bar.service';
import { modalConfig } from 'src/app/config/modal.config';
import { ApprovesCollectPointModel } from 'src/app/model/approvesCollectPoint/approves-collect-point.model';

@Component({
  selector: 'app-approve-collect-point',
  templateUrl: './approve-collect-point.component.html',
  styleUrls: ['./approve-collect-point.component.scss']
})
export class ApproveCollectPointComponent implements OnInit {

  public columns: any
  public dataSource: any
  public displayedColumns: any
  public tableValidation: ApprovesCollectPointModel[] = [];
  public modalReference: NgbModalRef;
  public infoUpdate: any;
  public view = false;


  constructor(private approveCollectPointService: ApproveCollectPointService,
     private modalService: NgbModal,
     private snackBar: SnackBar) { }

  ngOnInit(): void {
    this.getInfosOfCollectPoints();
  }

  public openModal(content: any): void {
    this.modalReference = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  public getInfosOfCollectPoints() {
    this.tableValidation = []
    this.approveCollectPointService.getAllApperoves()
      .subscribe((res: any) => {
        for(let cont = 0; cont < res.length; cont++){
          const aux = {
            position: cont,
            name: res[cont].social_reason,
            type: 'NEW_COLLECT_POINT',
            cnpj: res[cont].cnpj
          }
          this.view = true;
          this.tableValidation.push(aux)
        }
        this.approveCollectPointService.getUpdatesPending()
          .subscribe((res: any) => {
            for(let cont = 0; cont < res.length; cont++){
              const aux = {
                position: cont,
                name: res.map((r: any) => r.social_reason).toString(),
                type: 'UPDATE_COLLECT_POINT',
                cnpj: res[cont].cnpj
              }
              this.tableValidation.push(aux)
            }
          })
      })
  }

  public infosApproveCollectPoint(content:any, type: string, cnpj: string) {
    this.modalReference = this.modalService.open(content, { ...modalConfig, size: 'lg' });
    if (type === 'NEW_COLLECT_POINT') {
      this.approveCollectPointService.getInfosOfPending(cnpj)
        .subscribe((res: any) => {
          this.infoUpdate = res[0]
          this.view = true;
        })
    } else {
      this.approveCollectPointService.getInfosOfUpdatesPending(cnpj)
        .subscribe((res: any) => {
          this.infoUpdate = res[0]
          this.view = false;
        })
    }
  }

  public approvesCollectPoint(type: string, cnpj: string) {
    if (type === 'NEW_COLLECT_POINT') {
      this.approveCollectPointService.putApproveCollectPoint(cnpj)
        .subscribe((res: any) => {
          this.getInfosOfCollectPoints()
          this.snackBar.openSuccess('Ponto de coleta aprovado')
        }, err => this.snackBar.openError('Ponto de coleta não foi aprovado, tente novamente mais tarde!'))
    }else{
      this.approveCollectPointService.putApproveUpdates(cnpj)
      .subscribe((res: any) => {
        this.getInfosOfCollectPoints()
        this.snackBar.openSuccess('Alteração do ponto de coleta aprovada')
      }, err => this.snackBar.openError('A alteração do ponto de coleta não foi aprovado, tente novamente mais tarde!'))
    }
  }

  public disapprovedUpdates(cnpj: string) {
    this.approveCollectPointService.putDisapprovedUpdates(cnpj)
    .subscribe((res) => {
      this.getInfosOfCollectPoints();
      this.snackBar.openSuccess('As alterações foram desaprovadas')
    }, err => this.snackBar.openError('As alterações não foram desaprovadas, tente novamente mais tarde!'))
  }

  public disapprovedNewCollectPoint(cnpj: string) {
    this.approveCollectPointService.putDisapprovedNewCollectPoint(cnpj)
    .subscribe((res) => {
      this.getInfosOfCollectPoints();
      this.snackBar.openSuccess('O ponto de coleta foi recusado')
    }, err => this.snackBar.openError('A recusa do ponto de coleta não foi concluída, tente novamente mais tarde!'))
  }
}
