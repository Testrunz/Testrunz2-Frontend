export interface RunzReducerState {
  isLoading: boolean;
  error: string;
  data: any;
}

export interface AssetsPaylod {
  name: string;
  type?: string;
  staticip?: string;
  description?: string;
  imageUrl: string;
  modelNo?: string;
  serialNo?: string;
  purchasedate: string;
  guarantywaranty: string;
  organisation: string;
  department: string;
  laboratory: string;
  status?: any;
  availability?: any;
}
