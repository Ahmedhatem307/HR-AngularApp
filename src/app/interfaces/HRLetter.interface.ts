export interface HRLetter {
  id: number;
  sentTo: string;
  reason: string;
  extraDetails: string | null;
  attachment: string | null;
  status: string;
  createdOn: string;
  firstApproveId: number;
  secondApproveId: number | null;
}
