import { ISqlCriteria, SqlCriteria } from "../read/criteria";

export class TdsCriteria extends SqlCriteria {
  public static dateEq(filedName: string, value: Date): ISqlCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "=",
    );
  }
  public static dateLt(filedName: string, value: Date): ISqlCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "<",
    );
  }
  public static dateLte(filedName: string, value: Date): ISqlCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "<=",
    );
  }
  public static dateGt(filedName: string, value: Date): ISqlCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      ">",
    );
  }
  public static dateGte(filedName: string, value: Date): ISqlCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      ">=",
    );
  }
}
