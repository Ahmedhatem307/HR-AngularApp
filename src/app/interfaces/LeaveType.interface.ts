export interface LeaveType {
  id: number;
  name: string;
  description: string | null;
  maxDaysPerYear: number;
  isPaid: boolean;
  requiresApproval: boolean;
  requiresAttachment: boolean;
  isActive: boolean;
  createdBy: string;
  createdAt: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
}
