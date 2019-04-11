import { IFilterCriteria, ISortCriteria } from "node-simplecqrs";

export interface ISqlFilterCriteria extends IFilterCriteria<string> {}

export interface ISqlSortCriteria extends ISortCriteria<string> {}

export class SqlFilterCriteria implements ISqlFilterCriteria {
  public static eq(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, "=");
  }
  public static lt(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, "<");
  }
  public static lte(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, "<=");
  }
  public static gt(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, ">");
  }
  public static gte(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, ">=");
  }
  public static like(filedName: string, value: string): ISqlFilterCriteria {
    return this.custom(filedName, value, "LIKE");
  }
  public static null(filedName: string): ISqlFilterCriteria {
    return this.custom(filedName, "NULL", "IS");
  }
  public static notNull(filedName: string): ISqlFilterCriteria {
    return this.custom(filedName, "NULL", "IS NOT");
  }
  public static in(filedName: string, value: string[]): ISqlFilterCriteria {
    return this.custom(filedName, `(${value.join(",")})`, "IN");
  }
  public static custom(filedName: string, value: string, operator: string): ISqlFilterCriteria {
    return new SqlFilterCriteria(`${filedName} ${operator} ${value}`);
  }
  private expression: string;
  protected constructor(expression: string) {
    this.expression = expression;
  }
  public toExpression(): string {
    return this.expression;
  }
}
// tslint:disable-next-line: max-classes-per-file
export class SqlSortCriteria implements ISqlSortCriteria {
  public static Ascendent(column: string): SqlSortCriteria {
    return new SqlSortCriteria(`${column} ASC`);
  }
  public static Descendent(column: string): SqlSortCriteria {
    return new SqlSortCriteria(`${column} DESC`);
  }
  private expression: string;
  protected constructor(expression: string) {
    this.expression = expression;
  }
  public toExpression(): string {
    return this.expression;
  }
}
