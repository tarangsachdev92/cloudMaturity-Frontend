import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/api";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NodeService {
  constructor(private http: HttpClient) {}

  getFilesystem() {
    return of({
      data: [
        {
          data: {
            checkbox: '',
            srNo: 1,
            elementName: "AC1",
            description: "Access Control(AC)",
            subElement: "4",
            weight: 1,
            action: ''
          },
          expanded: true,
          children: [
            {
              data: {
                checkbox: '',
                srNo: 2,
                elementName: "AC1.1",
                description: "Access Control(AC)",
                subElement: "4",
                weight: 1,
                action: ''
              },
            },
            {
              data: {
                checkbox: '',
                srNo: 3,
                elementName: "AC1.2",
                description: "Access Control(AC)",
                subElement: "4",
                weight: 1,
                action: ''
              },
            },
          ],
        },
        {
          data: {
            checkbox: '',
            srNo: 1,
            elementName: "AC1",
            description: "Access Control(AC)",
            subElement: "4",
            weight: 1,
            action: ''
          },
          expanded: true,
          children: [
            {
              data: {
                checkbox: '',
                srNo: 2,
                elementName: "AC1.1",
                description: "Access Control(AC)",
                subElement: "4",
                weight: 1,
                action: ''
              },
            },
            {
              data: {
                checkbox: '',
                srNo: 3,
                elementName: "AC1.2",
                description: "Access Control(AC)",
                subElement: "4",
                weight: 1,
                action: ''
              },
            },
          ],
        },
      ],
    })
      .toPromise()
      .then((res) => <TreeNode[]>res.data);
  }

  getLazyFilesystem() {
    return this.http
      .get<any>("assets/filesystem-lazy.json")
      .toPromise()
      .then((res) => <TreeNode[]>res.data);
  }
}
