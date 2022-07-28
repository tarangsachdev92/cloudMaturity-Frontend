import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpVideoComponent } from '../help-video/help-video.component';

@Component({
  selector: 'app-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.scss']
})
export class HelpListComponent implements OnInit {

  helpVideo = [
    {
      name: 'Create Maturity Model',
      img: 'video1',
      link: 'https://www.youtube.com/embed/pSvxQV1c-kc?autoplay=1',
      time: '00:44'
    },
    {
      name: 'Create Model from a Reference',
      img: 'video1',
      link: 'https://www.youtube.com/embed/7XDTKekoD6U?autoplay=1',
      time: '00:45'
    },  
    {
      name: 'Add Domains to Model',
      img: 'video2',
      link: 'https://www.youtube.com/embed/Ok3G1OVFLFQ?autoplay=1',
      time: '00:44'
    },
    {
      name: 'Add Practices',
      img: 'video3',
      link: 'https://www.youtube.com/embed/-ymxeasl99E?autoplay=1',
      time: '00:59'
    },
    {
      name: 'Assessment Dashboard',
      img: 'video4',
      link: 'https://www.youtube.com/embed/zEx8Tf-6j3o?autoplay=1',
      time: '00:49'
    },
    {
      name: 'Create Assessment',
      img: 'video5',
      link: 'https://www.youtube.com/embed/UXCHeQj4if8?autoplay=1',
      time: '00:57'
    },
    {
      name: 'Assessment Plan',
      img: 'video6',
      link: 'https://www.youtube.com/embed/xUCqFrGB7h0?autoplay=1',
      time: '01:22'
    },
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onPlayVideo = (link) => {
    const dialogRef = this.dialog.open(HelpVideoComponent, {
      width: '1000px',
      data: {
        videoLink: link
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
