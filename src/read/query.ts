import { IQuery, Query } from "node-simplecqrs";
import { ISqlCriteria } from "./criteria";

export interface ISqlQuery extends IQuery<ISqlCriteria, string> {}

export class SqlQuery extends Query<ISqlCriteria, string> implements ISqlQuery {
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
        whereClause += ` WHERE (${grp
          .map((c) => c.toExpression())
          .join(" AND ")})`;
      } else {
        whereClause += ` OR (${grp.map((c) => c.toExpression()).join(" AND ")})`;
      }
    });
    this._clearCriterias();
    return `${this.rootExpression} ${whereClause};`;
  }
  private _clearCriterias() {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
  }
}
