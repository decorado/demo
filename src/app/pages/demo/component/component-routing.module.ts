import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecAuthGuard } from '@projects/decora/browser-lib-ui/src/public_api';

const routes: Routes = [
  { path: 'autocomplete', loadChildren: './decora-autocomplete-demo/decora-autocomplete-demo.module#DecoraAutocompleteDemoModule' },
  { path: 'autocomplete-account', loadChildren: './decora-autocomplete-account-demo/decora-autocomplete-account-demo.module#DecoraAutocompleteAccountDemoModule' },
  { path: 'autocomplete-company', loadChildren: './decora-autocomplete-company-demo/decora-autocomplete-company-demo.module#DecoraAutocompleteCompanyDemoModule' },
  { path: 'autocomplete-complexity', loadChildren: './decora-autocomplete-complexity-demo/decora-autocomplete-complexity-demo.module#DecoraAutocompleteComplexityDemoModule' },
  { path: 'autocomplete-country', loadChildren: './decora-autocomplete-country-demo/decora-autocomplete-country-demo.module#DecoraAutocompleteCountryDemoModule' },
  { path: 'autocomplete-department', loadChildren: './decora-autocomplete-department-demo/decora-autocomplete-department-demo.module#DecoraAutocompleteDepartmentDemoModule' },
  { path: 'autocomplete-product', loadChildren: './decora-autocomplete-product-demo/decora-autocomplete-product-demo.module#DecoraAutocompleteProductDemoModule' },
  { path: 'autocomplete-project', loadChildren: './decora-autocomplete-project-demo/decora-autocomplete-project-demo.module#DecoraAutocompleteProjectDemoModule' },
  { path: 'autocomplete-quote', loadChildren: './decora-autocomplete-quote-demo/decora-autocomplete-quote-demo.module#DecoraAutocompleteQuoteDemoModule' },
  { path: 'autocomplete-role', canActivate: [DecAuthGuard], loadChildren: './decora-autocomplete-role-demo/decora-autocomplete-role-demo.module#DecoraAutocompleteRoleDemoModule' },
  { path: 'autocomplete-squads', loadChildren: './decora-autocomplete-squads-demo/decora-autocomplete-squads-demo.module#DecoraAutocompleteSquadsDemoModule' },
  { path: 'autocomplete-tags', loadChildren: './decora-autocomplete-tags-demo/decora-autocomplete-tags-demo.module#DecoraAutocompleteTagsDemoModule' },
  { path: 'breadcrumb', loadChildren: './decora-breadcrumb-demo/decora-breadcrumb-demo.module#DecoraBreadcrumbDemoModule' },
  { path: 'carousel', loadChildren: './decora-carousel-demo/decora-carousel-demo.module#DecoraCarouselDemoModule' },
  { path: 'color-picker', loadChildren: './decora-color-picker-demo/decora-color-picker-demo.module#DecoraColorPickerDemoModule' },
  { path: 'date-picker', loadChildren: './decora-date-picker-demo/decora-date-picker-demo.module#DecoraDatePickerDemoModule' },
  { path: 'events-list', loadChildren: './decora-events-list-demo/decora-events-list-demo.module#DecoraEventsListDemoModule' },
  { path: 'gallery', loadChildren: './decora-gallery-demo/decora-gallery-demo.module#DecoraGalleryDemoModule' },
  { path: 'grid', loadChildren: './decora-grid-demo/decora-grid-demo.module#DecoraGridDemoModule' },
  { path: 'icon', loadChildren: './decora-icon-demo/decora-icon-demo.module#DecoraIconDemoModule' },
  { path: 'image-marks', loadChildren: './decora-image-marks-demo/decora-image-marks-demo.module#DecoraImageMarksDemoModule' },
  { path: 'job-details', loadChildren: './decora-job-details-demo/decora-job-details-demo.module#DecoraJobDetailsDemoModule' },
  { path: 'job-round', loadChildren: './decora-job-round-demo/dec-job-round-demo.module#DecJobRoundDemoModule' },
  { path: 'zoom-area', loadChildren: './decora-zoom-area-demo/decora-zoom-area-demo.module#DecoraZoomAreaDemoModule' },
  { path: 'zoom-marks', loadChildren: './decora-zoom-marks-demo/decora-zoom-marks-demo.module#DecoraZoomMarksDemoModule' },
  { path: 'image-zoom', loadChildren: './decora-image-zoom-demo/decora-image-zoom-demo.module#DecoraImageZoomDemoModule' },
  { path: 'label', loadChildren: './decora-label-demo/decora-label-demo.module#DecoraLabelDemoModule' },
  { path: 'list', loadChildren: './decora-list-demo/decora-list-demo.module#DecoraListDemoModule' },
  { path: 'markdowns-comment', loadChildren: './decora-markdowns-comment-demo/decora-markdowns-comment-demo.module#DecoraMarkdownsCommentDemoModule' },
  { path: 'markdowns-zoom-area', loadChildren: './decora-markdowns-zoom-area-demo/decora-markdowns-zoom-area-demo.module#DecoraMarkdownsZoomAreaDemoModule' },
  { path: 'page-forbiden', loadChildren: './decora-page-forbiden-demo/page-forbiden-demo.module#PageForbidenDemoModule' },
  { path: 'product-briefing', loadChildren: './decora-product-briefing-demo/decora-product-briefing-demo.module#DecoraProductBriefingDemoModule' },
  { path: 'product-features', loadChildren: './decora-products-features-demo/decora-products-features-demo.module#DecoraProductsFeaturesDemoModule' },
  { path: 'product-measures', loadChildren: './decora-product-measures-comparison-demo/decora-product-measures-comparison-demo.module#DecoraProductMeasuresComparisonDemoModule' },
  { path: 'product-spin', loadChildren: './decora-product-spin-demo/decora-product-spin-demo.module#DecoraProductSpinDemoModule' },
  { path: 'sidenav', loadChildren: './decora-sidenav-demo/sidenav-demo.module#SidenavDemoModule' },
  { path: 'sketchfab', loadChildren: './decora-dec-sketchfab-demo/dec-sketchfab-demo.module#DecSketchfabDemoModule' },
  { path: 'sketchfab-view', loadChildren: './decora-sketchfab-view-demo/decora-sketchfab-view-demo.module#DecoraSketchfabViewDemoModule' },
  { path: 'steps-list', loadChildren: './decora-steps-list-demo/decora-steps-list-demo.module#DecoraStepsListDemoModule' },
  { path: 'tabs', loadChildren: './decora-tabs-demo/decora-tabs-demo.module#DecoraTabsDemoModule' },
  { path: 'upload', loadChildren: './decora-upload-demo/decora-upload-demo.module#DecoraUploadDemoModule' },
  { path: 'render-comment', loadChildren: './decora-render-comment/decora-render-comment.module#DecoraRenderCommentModule' },
  { path: 'card-similar-product', loadChildren: './decora-card-similar-product/decora-card-similar-product.module#DecoraCardSimilarProductModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
