import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecopoints',
  templateUrl: './ecopoints.component.html',
  styleUrls: ['./ecopoints.component.scss']
})
export class EcopointsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#326700';

  }

}
