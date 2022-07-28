import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AUTH_FLOW_SVG } from "@app/utility";

@Injectable({
    providedIn : 'root'
})

export class SvgIconService {
    baseSvgPath = 'assets/images/svg-files/';
    iconExtension = '.svg'
    
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    }

    registerIcons() {
        AUTH_FLOW_SVG.forEach(icon => {
            this.addSvgIcon(icon);
        });
    }

    addSvgIcon = (icon: string) => {
        this.matIconRegistry.addSvgIcon(icon, 
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                `${this.baseSvgPath}${icon}${this.iconExtension}`
            )    
        )
    } 
}