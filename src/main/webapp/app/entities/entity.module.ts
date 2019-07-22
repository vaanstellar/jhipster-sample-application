import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'policy-details',
        loadChildren: './policy-details/policy-details.module#JhipsterSampleApplicationPolicyDetailsModule'
      },
      {
        path: 'user-details',
        loadChildren: './user-details/user-details.module#JhipsterSampleApplicationUserDetailsModule'
      },
      {
        path: 'policy-payment-details',
        loadChildren: './policy-payment-details/policy-payment-details.module#JhipsterSampleApplicationPolicyPaymentDetailsModule'
      },
      {
        path: 'derived-docs',
        loadChildren: './derived-docs/derived-docs.module#JhipsterSampleApplicationDerivedDocsModule'
      },
      {
        path: 'doc-type-reference',
        loadChildren: './doc-type-reference/doc-type-reference.module#JhipsterSampleApplicationDocTypeReferenceModule'
      },
      {
        path: 'policy-state-chart',
        loadChildren: './policy-state-chart/policy-state-chart.module#JhipsterSampleApplicationPolicyStateChartModule'
      },
      {
        path: 'user-suspension',
        loadChildren: './user-suspension/user-suspension.module#JhipsterSampleApplicationUserSuspensionModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
