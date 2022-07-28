import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-help-video',
  templateUrl: './help-video.component.html',
  styleUrls: ['./help-video.component.scss']
})
export class HelpVideoComponent implements OnInit {

  videoUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoLink);
  }

}
