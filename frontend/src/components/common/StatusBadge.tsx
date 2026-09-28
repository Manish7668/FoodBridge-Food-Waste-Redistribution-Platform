import type { DonationStatus } from '../../types';

const labels: Record<DonationStatus, string> = {
  DRAFT: 'Draft',
  AVAILABLE: 'Available',
  PENDING_CLAIM: 'Pending claim',
  CLAIMED: 'Claimed',
  PICKUP_SCHEDULED: 'Pickup scheduled',
  PICKED_UP: 'Picked up',
  IN_TRANSIT: 'In transit',
  DELIVERED: 'Delivered',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
  DISPUTED: 'Disputed',
};

export function StatusBadge({ status }: { status: DonationStatus }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{labels[status] || status}</span>;
}
