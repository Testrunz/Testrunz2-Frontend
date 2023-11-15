export interface RunzReducerState {
  isLoading: boolean;
  error: string;
  data: any;
}

export interface GetRunzListDetails {
  experiment: Experiment;
  meta?: Meta;
}
export interface Experiment {
  _id: string;
  procedureId: string;
  procedurename: string;
  testobjective: string;
  dueDate: string;
  status: string;
  datas: string;
  organization: string;
  department: string;
  labType: string;
  createdBy: string;
  assignTo?: AssignToEntity[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  remark?: string;
  expresult?: string;
  table?: any[];
}
export interface AssignToEntity {
  userId: string;
  date: string;
  _id: string;
}
export interface Meta {
  _id: string;
  email: string;
  userId: string;
  __v: number;
  createdAt: string;
  department?: string[];
  experimentIds?: string[];
  labtype?: string[];
  name: string;
  organization: string;
  role: string;
  updatedAt: string;
  userCounter: string;
}

export interface RunzDetailsReducerState {
  isLoading: boolean;
  error: string;
  data: GetRunzListDetails;
}

export interface RunzList {
  _id: string;
  procedureId: string;
  procedurename: string;
  testobjective: string;
  dueDate: string;
  status: string;
  datas: string;
  organization: string;
  department: string;
  labType: string;
  createdBy: string;
  assignTo?: AssignToEntity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AssignToEntity {
  userId: string;
  date: string;
  _id: string;
}

export interface RunzListReducerState {
  isLoading: boolean;
  error: string;
  data?: RunzList[];
}
