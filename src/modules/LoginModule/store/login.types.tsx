export interface signUpReducerState {
  isLoading: boolean;
  error: string;
}

export interface AuthMe {
  _id: string;
  name: string;
  email: string;
  firebaseId: string;
  timeZone: string;
  role: string;
  created_at: string;
  updated_at: string;
  __v: number;
  firstuse: boolean;
  activeStatus: boolean;
  imageUrl: string;
  firstname: string;
  lastname: string;
}

export interface AuthMeReducerState {
  isLoading: boolean;
  error: string;
  data: AuthMe;
}

export interface UploadReducerState {
  isLoading: boolean;
  error: string;
  imageUrl: string;
}
