export interface Word {
  id: number;
  word: string;
}
export interface BoDe {
  id?: number;
  tenBoDe?: string;
  idHocKy?: number;
  soCau?: string;
  soPhut?: string;
  soDiem?: string;
}
export interface HocKy {
  id?: number;
  tenHocKy?: string;
}
export interface CauHoi {
  id?: number;
  cauHoi?: string;
  words?: string[];
  image?: string | null;
  chonDapAn?: string | null;
  traLoi?: string;
  type?: number;
  idBoDe?: number;
  DapAn?: string[];
}
export interface ChuDeTQ {
  id?: string;
  Name?: string;
}

export interface ChuDeCT {
  id?: string;
  Name?: string;
  SoLuongTN?: number;
}

export interface NDTuVung {
  id?: string;
  TuVung?: string;
  PAVD?: string;
  Nghia?: string;
}
export interface NDCauTAGT {
  id?: string;
  TuVung?: string;
  Nghia?: string;
}
export interface TestTV {
  question?: string;
  correctAnswer?: string;
  arrAnswer?: object;
}

export interface UserInfo {
  id?: string;
  name?: string;
  picture?: string;
}

export interface ScoreRank {
  id?: string;
  ratingPoints?: string;
  perseverancePoint?: string;
  idFirebaseUser?: string;
}