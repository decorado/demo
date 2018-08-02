export class Permissions {

  // ADMIN USER CLIENT
  static admin_client_edit = 'admin.users.clienteditor.edituser';
  static admin_client_delete = 'admin.users.clienteditor.deleteuser';
  static admin_client_new = 'admin.users.clienteditor.newuser';
  static admin_client_view = 'admin.users.clienteditor.view';

  // ADMIN USER INTERNAL
  static admin_internal_edit = 'admin.users.usereditor.edituser';
  static admin_internal_delete = 'admin.users.usereditor.deleteuser';
  static admin_internal_new = 'admin.users.usereditor.newuser';
  static admin_internal_view = 'admin.users.usereditor.view';

  // ADMIN USER PROFESSIONAL
  static admin_professional_edit = 'admin.users.professionaleditor.edituser';
  static admin_professional_delete = 'admin.users.professionaleditor.deleteuser';
  static admin_professional_new = 'admin.users.professionaleditor.newuser';
  static admin_professional_view = 'admin.users.professionaleditor.view';

  // ADMIN USER
  static admin_user_view = [Permissions.admin_client_view, Permissions.admin_internal_view, Permissions.admin_professional_view];

  // ADMIN
  static admin_view = [...Permissions.admin_user_view];

}
