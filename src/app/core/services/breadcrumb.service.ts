import { Injectable, EventEmitter } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    Event,
    NavigationEnd
} from '@angular/router';
import { Breadcrumb } from '@app/utility/shared-component/breadcrumb/breadcrumb.interface';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    breadcrumbChanged = new EventEmitter<Breadcrumb[]>(false);

    private breadcrumbs = new Array<Breadcrumb>();

    constructor(private router: Router) {
        this.router.events.subscribe((routeEvent) => {
            this.onRouteEvent(routeEvent);
        });
    }

    private onRouteEvent(routeEvent: Event) {
        if (!(routeEvent instanceof NavigationEnd)) {
            return;
        }

        let route = this.router.routerState.root.snapshot;
        let url = '';

        var breadCrumbIndex = 0;
        var newCrumbs = [];

        while (route.firstChild != null) {
            route = route.firstChild;

            if (route.routeConfig === null) {
                continue;
            }
            if (!route.routeConfig.path) {
                continue;
            }

            url += `/${this.createUrl(route)}`;

            if (!route.data['breadcrumb']) {
                continue;
            }
            const { breadcrumb = [] } = route.data

            if (Array.isArray(breadcrumb)) {
                breadcrumb.forEach((bc, i) => {
                    let newCrumb = this.createBreadcrumbFromArray(route, url, i);
                    const { title = "", routerLink = "", routerLinks = [] } = bc;
                    if (title.includes('{{') && title.includes('}}')) {
                        const keys = title.replace('{{', '').replace('}}', '').split('.');
                        let value = route.data;
                        for (let key of keys) {
                            value = value && value[key];
                        }
                        newCrumb.displayData.title = (value as unknown) as string;
                    }
                    if (routerLinks.length) {
                        let routerLink = ``;
                        routerLinks.forEach(rl => {
                            if (rl.includes('{{') && rl.includes('}}')) {
                                const keys = rl.replace('{{', '').replace('}}', '').split('.');
                                let value = route.data;
                                for (let key of keys) {
                                    value = value && value[key];
                                }
                                routerLink += value
                            } else {
                                routerLink += rl;
                            }
                        });
                        newCrumb.displayData.routerLink = (routerLink as unknown) as string;

                    }

                    if (breadCrumbIndex < this.breadcrumbs.length) {
                        var existing = this.breadcrumbs[breadCrumbIndex++];

                        if (existing && existing.route == route.routeConfig) {
                            newCrumb.displayData = existing.displayData;
                        }
                    }
                    newCrumbs.push(newCrumb);
                });
            }
        }
        this.breadcrumbs = newCrumbs;
        this.breadcrumbChanged.emit(this.breadcrumbs);
    }

    private createBreadcrumbFromArray(
        route: ActivatedRouteSnapshot,
        url: string,
        index: number
    ): Breadcrumb {
        return {
            displayData: { ...route.data['breadcrumb'][index] },
            terminal: this.isTerminal(route),
            url: url,
            route: route.routeConfig
        };
    }

    private isTerminal(route: ActivatedRouteSnapshot) {
        return (
            route.firstChild === null ||
            route.firstChild.routeConfig === null ||
            !route.firstChild.routeConfig.path
        );
    }

    public getCurrentBreadCrumbs = () => {
        return this.breadcrumbs;
    }

    private createUrl(route: ActivatedRouteSnapshot) {
        return route.url
            .map(function (s) {
                return s.toString();
            })
            .join('/');
    }
}
