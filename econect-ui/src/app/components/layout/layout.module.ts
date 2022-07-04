import { NgModule } from "@angular/core";
import { NavComponent } from './nav/nav.component';
import { GreenNavComponent } from './green-nav/green-nav.component';
import { RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbCollapseModule, NgbDropdownToggle } from "@ng-bootstrap/ng-bootstrap";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { LayoutModule } from '@angular/cdk/layout';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    MatSidenavModule,
    NgbCollapseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LayoutModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    NavComponent,
    GreenNavComponent,
  ],
  exports: [NavComponent, GreenNavComponent, RouterModule]
})
export class LayoutsModule { }
