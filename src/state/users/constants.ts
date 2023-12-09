export interface IGetUsersParams {
  page: number;
  per_page: number;
  maskEmail: boolean;
}

export const GetUsersDefaultParams: IGetUsersParams = {
  page: 1,
  per_page: 6,
  maskEmail: false,
};
