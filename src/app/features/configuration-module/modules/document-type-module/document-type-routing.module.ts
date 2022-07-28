import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { DocumentTypeDetailsComponent, DocumentTypeListComponent } from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.DOCUMENT_TYPE_LIST_ROUTE,
        component: DocumentTypeListComponent,
        data: {
          breadcrumb: []
        }
      },
      {
        path: AssessmentRouteConstants.ADD_DOCUMENT_TYPE_ROUTE,
        component: DocumentTypeDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_DOCUMENT_TYPE_ROUTE}/:id`,
        component: DocumentTypeDetailsComponent,
        data: {
          breadcrumb: [{ title: "Edit" }],
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRoutingModule { }
