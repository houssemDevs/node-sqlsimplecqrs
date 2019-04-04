import { IQuery, Query } from "node-simplecqrs";
import { ITdsCriteria } from "./criteria";

export interface ITdsQuery extends IQuery<ITdsCriteria, string> {}

export class TdsQuery extends Query<ITdsCriteria, string> implements ITdsQuery {
  private rootExpression: string;
  constructor(rootExpression: string) {
    super();
    this.rootExpression = rootExpression;
  }
  public toExpression(): string {
    this.beginNewGroup();
    let whereClause = "";
    this.criteriaGroups.forEach((grp) => {
      if (whereClause.length === 0) {
        whereClause += ` WHERE (${grp.map((c) => c.toExpression()).join(" AND ")})`;
      } else {
        whereClause += ` OR (${grp.map((c) => c.toExpression()).join(" AND ")})`;
      }
    });
    return `${this.rootExpression} ${whereClause};`;
  }
}
