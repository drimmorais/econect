import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
})


export class LayoutComponent {
    title = 'econect';

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('pt');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('pt');
    }
}
