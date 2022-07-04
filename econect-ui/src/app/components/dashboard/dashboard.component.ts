import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../service/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  permission: string;
  class: string;
}
export const ROUTES_MENU: RouteInfo[] = [
  { path: '/dashboard/eco-blog', title: 'INÍCIO', permission: 'all', class: '' },
  { path: '/dashboard/schedule', title: 'AGENDAR', permission: 'citizen', class: '' },
  { path: '/dashboard/collect-point', title: 'PONTOS DE COLETA', permission: 'citizen', class: '' },
  { path: '/dashboard/ad', title: 'ANÚNCIO', permission: 'duo', class: '' },
  { path: '/dashboard/ecopoints', title: 'MEUS ECOPOINTS', permission: 'citizen', class: '' },
  { path: '/dashboard', title: 'TROCAS DISPONÍVEIS', permission: 'citizen', class: '' },
  { path: '/dashboard/scheduling', title: 'AGENDAMENTOS', permission: 'duo', class: '' },
  { path: '/dashboard/validation', title: 'VALIDAÇÃO ', permission: 'adm', class: '' },
  { path: '/dashboard', title: 'SOBRE NÓS', permission: 'duo', class: 'active-pro' },
  { path: '/dashboard', title: 'CONTATO', permission: 'duo', class: 'active-pro' },
];

export const ROUTES_DROP: RouteInfo[] = [
  { path: '/dashboard/profile', title: 'MEU PERFIL', permission: 'content_paste', class: '' },
  { path: '/dashboard/profile', title: 'MEU PERFIL', permission: 'content_paste', class: '' },
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public menuItems: any[];
  public dropItems: any[];
  public permission: string;
  public tag: string;

  constructor(private observer: BreakpointObserver, private elementRef: ElementRef, private authService: AuthService,) { }

  ngOnInit() {

    let aux = this.authService.getUserInfos();
    this.tag = aux.tag;
    if (this.tag === 'collect point')
      this.permission = 'collect';
    else if (this.tag === 'citizen')
      this.permission = 'citizen';
    else
      this.permission = 'adm'

    this.menuItems = ROUTES_MENU.filter(menuItem => menuItem);
    this.dropItems = ROUTES_DROP.filter(dropItem => dropItem);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#acbf60';

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
