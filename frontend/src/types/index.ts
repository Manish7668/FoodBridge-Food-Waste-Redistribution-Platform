export type Role = 'DONOR' | 'NGO' | 'VOLUNTEER' | 'ADMIN';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type DonationStatus =
  | 'DRAFT'
  | 'AVAILABLE'
  | 'PENDING_CLAIM'
  | 'CLAIMED'
  | 'PICKUP_SCHEDULED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'DISPUTED';

export type Donation = {
  _id: string;
  donorId?: string;
  organizationId?: string;
  claimedBy?: string;
  volunteerId?: string;
  title: string;
  description?: string;
  category: string;
  foodType: 'VEGETARIAN' | 'NON_VEGETARIAN' | 'VEGAN';
  quantity: number;
  unit: string;
  servings: number;
  preparationTime: string;
  consumeBy: string;
  storageCondition: string;
  temperature?: number;
  allergens?: string[];
  packaging?: string;
  pickupLocation?: { coordinates: [number, number]; label?: string };
  pickupWindow?: { start?: string; end?: string };
  status: DonationStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type DonationListResponse = {
  items: Donation[];
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type DashboardStats = {
  totalDonations: number;
  activeDonations: number;
  deliveredDonations: number;
  mealsShared: number;
  foodRescued: number;
};
