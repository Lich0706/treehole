export enum BackendEnvT {
  LOCAL,
  PROD,
  DEV,
}

export const BACKEND_ENV: BackendEnvT = BackendEnvT.LOCAL;

const apiBaseURL = {
  [BackendEnvT.LOCAL]: 'http://localhost:8000/api/v1',
  [BackendEnvT.PROD]: 'http://localhost:8000/api/v1',
  [BackendEnvT.DEV]: 'http://localhost:8000/api/v1',
};
export const API_BASE_URL = apiBaseURL[BACKEND_ENV];
