import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
  {
    userName: 'admin',
    token: 'abi393kdkd9393ikd',
    isAuthenticated: true,
    isAdmin: true,
    userRole: 'admin',
    accessLevel: 'write',

    canAccessInventory: true,
    canAccessAssets: true,
    canAccessNotifications: true,

    canSaveInventory: true,
    canSaveAssets: true,
    canSaveNotifications: true
  },
  {
    userName: 'other',
    token: 'sd9f923k3kdmcjkhd',
    isAuthenticated: true,
    isAdmin: false,
    userRole: 'other',
    accessLevel: 'read',

    canAccessInventory: false,
    canAccessAssets: false,
    canAccessNotifications: false,

    canSaveInventory: false,
    canSaveAssets: false,
    canSaveNotifications: false
  },
  {
    userName: 'sbc',
    token: 'sd9f923k3kdmcjkhd',
    isAuthenticated: true,
    isAdmin: false,
    userRole: 'other',
    accessLevel: 'read',

    canAccessInventory: true,
    canAccessAssets: false,
    canAccessNotifications: false,

    canSaveInventory: false,
    canSaveAssets: false,
    canSaveNotifications: false
  }
];
