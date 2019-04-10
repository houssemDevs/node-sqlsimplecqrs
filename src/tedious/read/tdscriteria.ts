import { ISqlFilterCriteria, SqlFilterCriteria } from "../../sql/read/criteria";

export class TdsFilterCriteria extends SqlFilterCriteria {
  public static dateEq(filedName: string, value: Date): ISqlFilterCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "=",
    );
  }
  public static dateLt(filedName: string, value: Date): ISqlFilterCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "<",
    );
  }
  public static dateLte(filedName: string, value: Date): ISqlFilterCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      "<=",
    );
  }
  public static dateGt(filedName: string, value: Date): ISqlFilterCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      ">",
    );
  }
  public static dateGte(filedName: string, value: Date): ISqlFilterCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() +
        1},${value.getDate()})`,
      ">=",
    );
  }
}
