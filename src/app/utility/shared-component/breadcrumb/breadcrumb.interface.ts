import { Route } from '@angular/router';

export interface displayDataModel {
    title: string;
    routerLink?: string
    modelTab?: number;
}
export class Breadcrumb {
    displayName?: string;
    displayData: displayDataModel;
    terminal: boolean;
    url: string;
    route: Route | null;
}
