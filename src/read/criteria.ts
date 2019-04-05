import { ICriteria } from "node-simplecqrs";

export interface ISqlCriteria extends ICriteria<string> {}

export class SqlCriteria implements ISqlCriteria {
  public static eq(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, "=");
  }
  public static lt(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, "<");
  }
  public static lte(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, "<=");
  }
  public static gt(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, ">");
  }
  public static gte(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, ">=");
  }
  public static like(filedName: string, value: string): ISqlCriteria {
    return this.custom(filedName, value, "LIKE");
  }
  public static null(filedName: string): ISqlCriteria {
    return this.custom(filedName, "NULL", "IS");
  }
  public static notNull(filedName: string): ISqlCriteria {
    return this.custom(filedName, "NULL", "IS NOT");
  }
  public static in(filedName: string, value: string[]): ISqlCriteria {
    return this.custom(filedName, `(${value.join(",")})`, "IN");
  }
  public static custom(
    filedName: string,
    value: string,
    operator: string,
  ): ISqlCriteria {
    return new SqlCriteria(`${filedName} ${operator} ${value}`);
  }
  private expression: string;
  protected constructor(expression: string) {
    this.expression = expression;
  }
  public toExpression(): string {
    return this.expression;
  }
}
