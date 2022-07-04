import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'rxjs/operators';
import { modalConfig } from 'src/app/config/modal.config';
import { AuthService } from '../../service/auth/auth.service';
import { CalendarService } from '../../service/calendar/calendar.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  public schedulings: any
  bsInlineValue = new Date(2021,9,21);
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  public color = 'green';
  public tag: any;
  public operation_id: number;
  public dateFormate: string;
  colorTwo: string;
  public operation_id_aux: number;
  public modalReference: NgbModalRef;
  public view = false
  infos: any;


  constructor(public calendarService: CalendarService, private authService: AuthService, private modalService: NgbModal) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    console.log(this.bsInlineValue)
  }

  ngOnInit(): void {

    this.tag = this.authService.getUserInfos();

    let date = new Date(2021,9,21)
    this.dateFormate = date.toISOString().split('T')[0].replace(/[\/]+/g, '-')
    console.log('------------------', Object.keys(this.tag))

    this.getList()
    

  }

  public sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  public getList() {
    if (this.tag.tag === 'citizen') {
      console.log('opa')
      this.getCalendarCitizen();
    } else {
      this.view = true;
      this.getCalendarCollectPoint();
    }
  }

  public getCalendarCitizen() {
    this.calendarService.getCalendarCitizen(this.dateFormate)
      .subscribe((res) => {
        this.schedulings = res
        console.log(this.schedulings)
      }, err => console.log(err))
  }

  public getCalendarCollectPoint() {
    this.calendarService.getCalendarCollectPoint(this.dateFormate)
      .subscribe((res) => {
        this.schedulings = res
        console.log(this.schedulings)
      }, err => console.log(err))
  }

  public inProgress(operation_id: number, id: number) {
    this.calendarService.inProgress(operation_id)
      .subscribe(((res) => {
        console.log(res)
        this.getList()
      }))
  }

  public openModal(content: any, operation_id?: number) {
    this.operation_id_aux = operation_id || 0
    this.modalReference = this.modalService.open(content, { ...modalConfig, size: 'xl' });
  }

  public openInfo(content: any, infos: any) {
    this.infos = infos;
    console.log(infos)
    this.modalReference = this.modalService.open(content, { ...modalConfig, size: 'lg' });
  }

  public refuseScheduling(operation_id: any) {
    this.calendarService.refuseScheduling(operation_id)
      .subscribe((res) => {
        console.log(res)
        this.getList()
      })
  }

  public cancelScheduling(operation_id: any) {
    this.calendarService.cancelScheduling(operation_id)
      .subscribe((res) => {
        console.log(res)
        this.getList()
      })
  }

  public concludedScheduling(operation_id: any) {
    this.calendarService.concludedScheduling(operation_id)
      .subscribe((res) => {
        console.log(res)
        this.getList()
      })
  }

  public deliveredScheduling(operation_id: any) {
    this.calendarService.deliveredScheduling(operation_id)
      .subscribe((res) => {
        console.log(res)
        this.getList()
      })
  }

}
