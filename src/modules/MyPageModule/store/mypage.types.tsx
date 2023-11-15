export interface MoreInfoList {
  _id: string;
  organization: string;
  department: string[];
  labtype: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MoreInfoListState {
  isLoading: boolean;
  error: string;
  data: MoreInfoList[];
}

export interface MoreInfoUser {
  _id: string;
  email: string;
  userId: string;
  __v: number;
  activeStatus: boolean;
  createdAt: string;
  imageUrl: string;
  labtype: LabtypeEntity[];
  name: string;
  role: string;
  updatedAt: string;
  department?: any;
  firstname?: string;
  lastname?: string;
  organization?: any;
  userCounter?: string;
}
export interface LabtypeEntity {
  label: string;
  value: string;
}

export interface MoreInfoUserState {
  isLoading: boolean;
  error: string;
  data: MoreInfoUser;
}

export interface MoreInfoPayload {
  activeStatus: boolean;
  imageUrl: string;
  name?: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile?: string;
  organization: string;
  department: string;
  state?: string;
  country?: string;
  labtype: string[];
}

export interface MoreInfoUserUpdateState {
  isLoading: boolean;
  error: string;
}
