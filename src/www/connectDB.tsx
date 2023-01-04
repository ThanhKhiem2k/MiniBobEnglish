import {Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  CauHoi,
  BoDe,
  HocKy,
  ChuDeTQ,
  ChuDeCT,
  NDTuVung,
  NDCauTAGT,
  ScoreRank,
} from '../model/dbModel';
const db = openDatabase({name: 'DB_SACHCANHDIEU.db', createFromLocation: 1});

export const deleteBookmark = async (TuVung: String) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'DELETE FROM Bookmark WHERE TuVung = ?;',
        [TuVung],
        (_tx: any) => {
          console.log('Deleted');
        },
        (e: Error) => {
          console.log("Can't get Bookmark", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const addBookmark = async (obj: NDTuVung) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'INSERT INTO Bookmark ("TuVung", "PAVD", "Nghia") VALUES (?, ?, ?);',
        [obj.TuVung, obj.PAVD, obj.Nghia],
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Đã thêm từ "' + obj.TuVung + '" vào danh sách ghi nhớ',
            );
          } else {
            console.log('Failed....');
          }
        },
        (e: Error) => {
          Alert.alert('Từ "' + obj.TuVung + '" đã có trong danh sách ghi nhớ');
          console.log("Can't get Bookmark", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getBookmark = async (callback: Function) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM Bookmark',
        [],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: NDTuVung[] = [];
          const item: NDTuVung = {};
          raws.forEach((i: any) => {
            item.id = i.ID;
            item.TuVung = i.TuVung;
            item.PAVD = i.PAVD;
            item.Nghia = i.Nghia;
            result.push({...item});
          });
          callback(result);
        },
        (e: Error) => {
          console.log("Can't get Bookmark", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const updateScoreRankPerseverance = async (update: string) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'UPDATE ScoreRank SET perseverancePoint = ?  WHERE idFirebaseUser = 0',
        [update],
        (_tx: any, _results: any) => {},
        (e: Error) => {
          console.log("Can't set question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};
export const updateScoreRankRating = async (update: string) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'UPDATE ScoreRank SET ratingPoints = ?  WHERE idFirebaseUser = 0',
        [update],
        (_tx: any, _results: any) => {},
        (e: Error) => {
          console.log("Can't set question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getScoreRank = async (
  callback: Function,
  idFirebaseUser: string,
) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM ScoreRank WHERE idFirebaseUser = ?',
        [idFirebaseUser],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: ScoreRank[] = [];
          const question: ScoreRank = {};
          raws.forEach((item: any) => {
            question.id = item.id;
            question.ratingPoints = item.ratingPoints;
            question.perseverancePoint = item.perseverancePoint;
            question.idFirebaseUser = item.idFirebaseUser;
            result.push({...question});
            // console.log(item);
          });
          callback(result[0]);
        },
        (e: Error) => {
          console.log("Can't get question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getQuestions = async (callback: Function, id: number) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM CauHoi WHERE idBoDe = ?',
        [id],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: CauHoi[] = [];
          const question: CauHoi = {};
          raws.forEach((item: any) => {
            question.id = item.id;
            question.cauHoi = item.cauHoi;
            question.idBoDe = item.idBoDe;
            question.chonDapAn = item.chonDapAn;
            question.image = item.image;
            question.type = item.type;
            question.chonDapAn = item.chonDapAn;
            question.traLoi = item.traLoi;
            question.DapAn = [item.dapAnA, item.dapAnB];
            if (item.words != null) {
              question.words = item.words.split('/');
            }
            result.push({...question});
          });
          callback([...result]);
        },
        (e: Error) => {
          console.log("Can't get question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getTopicsTQ = async (callback: Function) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM TAChuDeTQ',
        [],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: ChuDeTQ[] = [];
          const item: ChuDeTQ = {};
          raws.forEach((i: ChuDeTQ) => {
            item.id = i.id;
            item.Name = i.Name;
            result.push({...item});
          });
          callback(result);
        },
        (e: Error) => {
          console.log("Can't get Topis", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};
export const getTopicsCT = async (callback: Function, idTATQ: String) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM TAChuDeCT Where idTATQ = ? ',
        [idTATQ],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: ChuDeCT[] = [];
          const item: ChuDeCT = {};
          raws.forEach((i: any) => {
            item.id = i.idTACT;
            item.Name = i.TenChuDeTACT;
            item.SoLuongTN = i.SoLuongTN;
            result.push({...item});
          });
          callback(result);
        },
        (e: Error) => {
          console.log("Can't get Topis", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};
export const getTopicsND = async (callback: Function, idTACT: String) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM TAChuDeND Where idTACT = ? ',
        [idTACT],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: NDTuVung[] = [];
          const item: NDTuVung = {};
          raws.forEach((i: any) => {
            item.id = i.idTAND;
            item.TuVung = i.TuVung;
            item.PAVD = i.PAVD;
            item.Nghia = i.Nghia;
            result.push({...item});
          });
          callback(result);
        },
        (e: Error) => {
          console.log("Can't get Topis", e);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getCommonVocabulary = async (
  callback: Function,
  idGroup: number,
) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM TAThongDung WHERE ? <= Stt AND Stt <= ?',
        [idGroup * 100 - 99, idGroup * 100],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: NDTuVung[] = [];
          const item: NDTuVung = {};
          raws.forEach((i: any) => {
            item.id = i.Stt;
            item.TuVung = i.TuVung;
            item.PAVD = i.PAVD;
            item.Nghia = i.Nghia;
            result.push({...item});
          });
          callback(result);
        },
        (_e: Error) => {
          console.log("Can't get Topis");
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getEnglishSentences = async (
  callback: Function,
  idGroup: number,
  indexItem: number,
) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM CauTAGT WHERE ? <= Stt AND Stt <= ?',
        [
          idGroup * 2000 - 2000 + (indexItem * 100 - 99),
          idGroup * 2000 - 2000 + indexItem * 100,
        ],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: NDCauTAGT[] = [];
          const item: NDCauTAGT = {};
          raws.forEach((i: any) => {
            item.id = i.Stt;
            item.TuVung = i.CauGT;
            item.Nghia = i.DichNghia;
            result.push({...item});
          });
          callback(result);
        },
        (_e: Error) => {
          console.log("Can't get Topis");
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getTopics = async (callback: Function, idHK: number) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM BoDe WHERE idHocKy = ?',
        [idHK],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: BoDe[] = [];
          const item: BoDe = {};
          raws.forEach((i: BoDe) => {
            item.id = i.id;
            item.idHocKy = i.idHocKy;
            item.soCau = i.soCau;
            item.soDiem = i.soDiem;
            item.soPhut = i.soPhut;
            item.tenBoDe = i.tenBoDe;
            result.push({...item});
          });
          callback(result);
        },
        (_e: Error) => {
          console.log("Can't get Topis");
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const getSemesters = async (callback: Function) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'SELECT * FROM HOCKY',
        [],
        (_tx: any, results: any) => {
          const raws = results.rows.raw();
          const result: HocKy[] = [];
          const item: HocKy = {};
          raws.forEach((i: HocKy) => {
            item.id = i.id;
            item.tenHocKy = i.tenHocKy;
            result.push({...item});
          });

          callback(result);
        },
        (e: Error) => {
          console.log("Can't get Semester" + e.message);
        },
      );
    });
  } catch (e) {
    console.log("Can't load database" + e);
  }
};

export const updateQuestions = async (id: number, dapAn: string) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'UPDATE CauHoi SET chonDapAn = ?  WHERE id = ?',
        [dapAn.trim(), id],
        (_tx: any, _results: any) => {},
        (e: Error) => {
          console.log("Can't set question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};

export const updateScore = async (idBoDe: number, soDiem: string) => {
  // @ts-ignore
  await db.transaction(async (tx: any) => {
    await tx.executeSql(
      'UPDATE BoDe SET soDiem = ? WHERE id = ?',
      [soDiem, idBoDe],
      (_tx: any, _results: any) => {},
      (e: Error) => {
        console.log('Not get questions', e.message);
      },
    );
  });
};

export const updateSelectedAnswer = async (idBoDe: number) => {
  try {
    (await db).transaction(async (tx: any) => {
      await tx.executeSql(
        'UPDATE CauHoi SET chonDapAn = ?  WHERE idBoDe = ?',
        ['', idBoDe],
        (_tx: any, _results: any) => {},
        (e: Error) => {
          console.log("Can't set question: " + e.message);
        },
      );
    });
  } catch (err) {
    console.log("Don't connect database ", err);
  }
};
