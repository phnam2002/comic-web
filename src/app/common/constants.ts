export class Constants {
  public static OK = 'OK';
  public static ERROR = 'ERROR';
}

export enum FwError {
  THANHCONG = 'THANHCONG',
  KHONGTHANHCONG = 'KHONGTHANHCONG',
  DLKHONGTONTAI = 'DLKHONGTONTAI',
  DLDATONTAI = 'DLDATONTAI',
}
export enum FwAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DETAIL = 'DETAIL',
  SEARCH = 'SEARCH',
  HISTORY = 'HISTORY',
}

export enum RolesGroupTypeEnum {
  USER = 1,
  CHUCDANH = 2,
}

export enum StatusEnum {
  Y = '1',
  N = '0',
}
export enum PublicEnum {
  Y = '1',
  N = '2',
}
export enum PositionEnum {

  QUANLY='1',
  LAPLENH='2',
  DUYETLENH='3'
}


