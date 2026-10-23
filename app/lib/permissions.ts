import { User } from "../generated/prisma/client";
import { UserRole } from "../generated/prisma/enums";

export enum Permission {
  VIEW_ORDERS = 'view_orders',
  MANAGE_ORDERS = 'manage_orders',
  VIEW_MEASUREMENTS = 'view_measurements',
  MANAGE_PRODUCTS = 'manage_products',
  MANAGE_INQUIRIES = 'manage_inquiries',
  MANAGE_CONTENT = 'manage_content',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_STAFF = 'manage_staff',
}

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.CUSTOMER]: [],
  [UserRole.STAFF]: [
    Permission.VIEW_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_MEASUREMENTS,
    Permission.MANAGE_INQUIRIES,
  ],
  [UserRole.ADMIN]: [
    Permission.VIEW_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_MEASUREMENTS,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_INQUIRIES,
    Permission.MANAGE_CONTENT,
    Permission.VIEW_ANALYTICS,
  ],
  [UserRole.SUPER_ADMIN]: [
    Permission.VIEW_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_MEASUREMENTS,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_INQUIRIES,
    Permission.MANAGE_CONTENT,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_STAFF,
  ],
};

export function hasPermission(user: User, permission: Permission): boolean {
  const permissions = rolePermissions[user.role] || [];
  return permissions.includes(permission);
}

export function requirePermission(user: User, permission: Permission): void {
  if (!hasPermission(user, permission)) {
    throw new Error('FORBIDDEN');
  }
}