export interface IUserInfo {
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone: string;
}

export interface IUserInfoFields {
  phone: string;
  last_name: string;
  login: string;
  display_name: string;
  first_name: string;
  email: string;
}

export interface IUserInfoProps {
  userinfo: IUserInfo;
  edit: boolean;
  editPass: boolean;
}
