import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-configuration',
  templateUrl: './model-configuration.component.html',
  styleUrls: ['./model-configuration.component.scss']
})
export class ModelConfigurationComponent implements OnInit {

  // State variables
  isHideModelLeftNav = true;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/dashboard/model/add') {
      this.isHideModelLeftNav = false;
    } else {
      this.isHideModelLeftNav = true;
    }
  }
}
