import { Component, OnInit } from '@angular/core';
import { ICollectPointInfo } from 'src/app/model/collectPoint/collectPoint.model';
import { CollectPointService } from '../../service/collect-point/collect-point.service';

@Component({
  selector: 'app-collect-point',
  templateUrl: './collect-point.component.html',
  styleUrls: ['./collect-point.component.scss']
})
export class CollectPointComponent implements OnInit {

  public allCollectPoints: ICollectPointInfo[];

  constructor(private collectPointService: CollectPointService) { }

  ngOnInit(): void {
    this.collectPointService.getAllCollectPoints()
    .subscribe((res: ICollectPointInfo[]) => this.allCollectPoints = res)
  }

}
