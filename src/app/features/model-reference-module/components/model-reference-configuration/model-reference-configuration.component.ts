import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-model-reference-configuration',
  templateUrl: './model-reference-configuration.component.html',
  styleUrls: ['./model-reference-configuration.component.scss']
})
export class ModelReferenceConfigurationComponent implements OnInit {

  // State variables
  isHideModelLeftNav = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }
}
