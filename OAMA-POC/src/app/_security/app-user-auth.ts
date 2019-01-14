export class AppUserAuth {
  userName = '';
  token = '';
  isAuthenticated: boolean;
  isAdmin: boolean;
  userRole = 'other';
  accessLevel = 'read';

  canAccessInventory = false;
  canAccessAssets = false;
  canAccessNotifications = false;

  canSaveInventory = false;
  canSaveAssets = false;
  canSaveNotifications = false;
}
