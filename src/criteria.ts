import { Criteria, ICriteria } from "node-simplecqrs";

export interface ITdsCriteria extends ICriteria<string> {}

export class TdsCriteria extends Criteria<string> implements ITdsCriteria {
  public static eq(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, "=");
  }
  public static lt(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, "<");
  }
  public static lte(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, "<=");
  }
  public static gt(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, ">");
  }
  public static gte(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, ">=");
  }
  public static like(filedName: string, value: string): ITdsCriteria {
    return this.custom(filedName, value, "LIKE");
  }
  public static null(filedName: string): ITdsCriteria {
    return this.custom(filedName, "NULL", "IS");
  }
  public static notNull(filedName: string): ITdsCriteria {
    return this.custom(filedName, "NULL", "IS NOT");
  }
  public static in(filedName: string, value: string[]): ITdsCriteria {
    return this.custom(filedName, `(${value.join(",")})`, "IN");
  }
  public static dateEq(filedName: string, value: Date): ITdsCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() + 1},${value.getDate()})`,
      "=",
    );
  }
  public static dateLt(filedName: string, value: Date): ITdsCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() + 1},${value.getDate()})`,
      "<",
    );
  }
  public static dateLte(filedName: string, value: Date): ITdsCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() + 1},${value.getDate()})`,
      "<=",
    );
  }
  public static dateGt(filedName: string, value: Date): ITdsCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() + 1},${value.getDate()})`,
      ">",
    );
  }
  public static dateGte(filedName: string, value: Date): ITdsCriteria {
    return this.custom(
      filedName,
      `DATEFROMPARTS(${value.getFullYear()},${value.getMonth() + 1},${value.getDate()})`,
      ">=",
    );
  }
  public static custom(filedName: string, value: string, operator: string): ITdsCriteria {
    return new TdsCriteria(`${filedName} ${operator} ${value}`);
  }
  private expression: string;
  private constructor(expression: string) {
    super();
    this.expression = expression;
  }
  public toExpression(): string {
    return this.expression;
  }
}
