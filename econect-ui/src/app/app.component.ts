import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'econect';

  constructor(translate: TranslateService, 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt');

    this.matIconRegistry.addSvgIcon(
      "plastic",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/plastic-pollution (1).svg"),
    );
    
    this.matIconRegistry.addSvgIcon(
      "paper",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/milk.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "bottle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/wine-bottle.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "battery",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/eco-battery.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "light",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/light-bulb.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "milk",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/milk.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "oil",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/oil-barrel.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "tin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/mat-icons/can.svg")
    )

  }
}
