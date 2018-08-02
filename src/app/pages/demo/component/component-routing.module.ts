import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecAuthGuard } from '@projects/decora/browser-lib-ui/src/public_api';

const routes: Routes = [
  { path: 'autocomplete', loadChildren: './decora-autocomplete-demo/decora-autocomplete-demo.module#DecoraAutocompleteDemoModule' },
  { path: 'autocomplete-account', loadChildren: './decora-autocomplete-account-demo/decora-autocomplete-account-demo.module#DecoraAutocompleteAccountDemoModule' },
  { path: 'autocomplete-company', loadChildren: './decora-autocomplete-company-demo/decora-autocomplete-company-demo.module#DecoraAutocompleteCompanyDemoModule' },
  { path: 'autocomplete-country', loadChildren: './decora-autocomplete-country-demo/decora-autocomplete-country-demo.module#DecoraAutocompleteCountryDemoModule' },
  { path: 'autocomplete-department', loadChildren: './decora-autocomplete-department-demo/decora-autocomplete-department-demo.module#DecoraAutocompleteDepartmentDemoModule' },
  { path: 'autocomplete-project', loadChildren: './decora-autocomplete-project-demo/decora-autocomplete-project-demo.module#DecoraAutocompleteProjectDemoModule' },
  { path: 'autocomplete-quote', loadChildren: './decora-autocomplete-quote-demo/decora-autocomplete-quote-demo.module#DecoraAutocompleteQuoteDemoModule' },
  { path: 'autocomplete-role', canActivate: [DecAuthGuard], loadChildren: './decora-autocomplete-role-demo/decora-autocomplete-role-demo.module#DecoraAutocompleteRoleDemoModule' },
  { path: 'breadcrumb', loadChildren: './decora-breadcrumb-demo/decora-breadcrumb-demo.module#DecoraBreadcrumbDemoModule' },
  { path: 'gallery', loadChildren: './decora-gallery-demo/decora-gallery-demo.module#DecoraGalleryDemoModule' },
  { path: 'list', loadChildren: './decora-list-demo/decora-list-demo.module#DecoraListDemoModule' },
  { path: 'page-forbiden', loadChildren: './decora-page-forbiden-demo/page-forbiden-demo.module#PageForbidenDemoModule' },
  { path: 'product-spin', loadChildren: './decora-product-spin-demo/decora-product-spin-demo.module#DecoraProductSpinDemoModule' },
  { path: 'sidenav', loadChildren: './decora-sidenav-demo/sidenav-demo.module#SidenavDemoModule' },
  { path: 'steps-list', loadChildren: './decora-steps-list-demo/decora-steps-list-demo.module#DecoraStepsListDemoModule' },
  { path: 'tabs', loadChildren: './decora-tabs-demo/decora-tabs-demo.module#DecoraTabsDemoModule' },
  { path: 'upload', loadChildren: './decora-upload-demo/decora-upload-demo.module#DecoraUploadDemoModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
