import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRouteConstants } from '@app/utility';
import { MaturityLevelSchemaListComponent, MaturityLevelSchemaDetailsComponent } from './components';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_LIST_ROUTE,
        component: MaturityLevelSchemaListComponent,
        data: {
          breadcrumb: []
        }
      },
      {
        path: AssessmentRouteConstants.ADD_MATURITY_SCHEMA_LEVEL_ROUTE,
        component: MaturityLevelSchemaDetailsComponent,
        data: {
          breadcrumb: [{ title: "Add" }],
        }
      },
      {
        path: `${AssessmentRouteConstants.EDIT_MATURITY_SCHEMA_LEVEL_ROUTE}/:id`,
        component: MaturityLevelSchemaDetailsComponent,
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
export class MaturityLevelSchemaRoutingModule { }
