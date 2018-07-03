import {TypevaccinAddComponent} from './app/components/typevaccin-add/typevaccin-add.component';
import {TypevaccinEditComponent} from './app/components/typevaccin-edit/typevaccin-edit.component';
import {TypevaccinListsComponent} from './app/components/typevaccin-lists/typevaccin-lists.component';
import {VaccinAddComponent} from './app/components/vaccin-add/vaccin-add.component';
import {HopitalAddComponent} from './app/components/hopital-add/hopital-add.component';
import {MaladieAddComponent} from './app/components/maladie-add/maladie-add.component';
import {AllergieAddComponent} from './app/components/allergie-add/allergie-add.component';
import {MedecinAddComponent} from './app/components/medecin-add/medecin-add.component';
import {HopitalEditComponent} from './app/components/hopital-edit/hopital-edit.component';
import {HopitalListsComponent} from './app/components/hopital-lists/hopital-lists.component';
import {VaccinEditComponent} from './app/components/vaccin-edit/vaccin-edit.component';
import {AllergieEditComponent} from './app/components/allergie-edit/allergie-edit.component';
import {MaladieEditComponent} from './app/components/maladie-edit/maladie-edit.component';
import {VaccinListsComponent} from './app/components/vaccin-lists/vaccin-lists.component';
import {AllergieListsComponent} from './app/components/allergie-lists/allergie-lists.component';
import {MaladieListsComponent} from './app/components/maladie-lists/maladie-lists.component';
import {MedecinListsComponent} from './app/components/medecin-lists/medecin-lists.component';
import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
import { WidgetsComponent } from './app/components/widgets/widgets.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'

angular.module('app.components')
	.component('typevaccinAdd', TypevaccinAddComponent)
	.component('typevaccinEdit', TypevaccinEditComponent)
	.component('typevaccinLists', TypevaccinListsComponent)
	.component('vaccinAdd', VaccinAddComponent)
	.component('hopitalAdd', HopitalAddComponent)
	.component('maladieAdd', MaladieAddComponent)
	.component('allergieAdd', AllergieAddComponent)
	.component('medecinAdd', MedecinAddComponent)
	.component('hopitalEdit', HopitalEditComponent)
	.component('hopitalLists', HopitalListsComponent)
	.component('vaccinEdit', VaccinEditComponent)
	.component('allergieEdit', AllergieEditComponent)
	.component('maladieEdit', MaladieEditComponent)
	.component('vaccinLists', VaccinListsComponent)
	.component('allergieLists', AllergieListsComponent)
	.component('maladieLists', MaladieListsComponent)
	.component('medecinLists', MedecinListsComponent)
  .component('tablesSimple', TablesSimpleComponent)
  .component('uiModal', UiModalComponent)
  .component('uiTimeline', UiTimelineComponent)
  .component('uiButtons', UiButtonsComponent)
  .component('uiIcons', UiIconsComponent)
  .component('uiGeneral', UiGeneralComponent)
  .component('formsGeneral', FormsGeneralComponent)
  .component('chartsChartjs', ChartsChartjsComponent)
  .component('widgets', WidgetsComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('comingSoon', ComingSoonComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
