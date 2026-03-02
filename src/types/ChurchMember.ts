export type ChurchMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipDate: Date | string;
  gender: 'male' | 'female' | 'other';
  roleInChurch: 'MEMBER' | 'ELDER' | 'DEACON' | 'PASTOR';
  isActive: boolean;
  familyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
