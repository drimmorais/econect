import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        console.log('Opaaa', textOrTpl)
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}