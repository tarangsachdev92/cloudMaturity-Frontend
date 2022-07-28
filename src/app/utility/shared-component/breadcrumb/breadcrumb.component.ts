import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '@app/core/services/breadcrumb.service';
import { UtilityService } from '@app/utility/services';
import { Breadcrumb, displayDataModel } from './breadcrumb.interface';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    breadcrumbs: Breadcrumb[];

    constructor(private breadcrumbService: BreadcrumbService,
        private router: Router,
        private utilityService: UtilityService) {
        this.breadcrumbService.breadcrumbChanged.subscribe(
            (crumbs: Breadcrumb[]) => {
                this.onBreadcrumbChange(crumbs);
            }
        );
    }

    private onBreadcrumbChange(crumbs: Breadcrumb[]) {
        this.breadcrumbs = crumbs.filter(e => e.displayData.title);
    }

    onClickBreadCrumb = (displayData: displayDataModel) => {
        if (displayData.routerLink) {
            this.router.navigate([displayData.routerLink]);
        }

        if (displayData.modelTab || displayData.modelTab === 0) {
            this.utilityService.setModelDetailTabIndex(displayData.modelTab);
        }
    }

}
