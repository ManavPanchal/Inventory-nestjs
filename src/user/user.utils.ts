export enum USER_ROLE {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export const DEFAULT_USER_ATTRIBUTES = [
  'id',
  'name',
  'email',
  'phone',
  'role',
  'address',
];
