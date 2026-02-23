export enum UserRole {
  CAMPER = 'CAMPER',
  GEAR_PROVIDER = 'GEAR_PROVIDER',
  CAMPSITE_OWNER = 'CAMPSITE_OWNER',
  WILD_CAMPSITE_ADMIN = 'WILD_CAMPSITE_ADMIN',
  SPONSOR = 'SPONSOR',
  DELIVERY_PERSONNEL = 'DELIVERY_PERSONNEL',
  FORUM_MODERATOR = 'FORUM_MODERATOR',
  ADMIN = 'ADMIN',
  GUIDE = 'GUIDE',
  EVENT_ORGANIZER = 'EVENT_ORGANIZER'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
}
