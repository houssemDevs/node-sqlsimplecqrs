import { IQuery, Query } from "node-simplecqrs";
import { ISqlFilterCriteria, ISqlSortCriteria } from "./criteria";

export interface ISqlQuery extends IQuery<string, ISqlFilterCriteria> {
  addSortCriteria(s: ISqlSortCriteria): void;
}

export class SqlSelectQuery extends Query<string, ISqlFilterCriteria> implements ISqlQuery {
  public static fromTableAndColumns(tableName: string, columns: string[]): SqlSelectQuery {
    return new SqlSelectQuery(` SELECT ${columns.length === 0 ? "" : columns.join(",")} FROM ${tableName} `);
  }
  public static fromSelectStatment(selectStmt: string): SqlSelectQuery {
    return new SqlSelectQuery(selectStmt);
  }
  private rootExpression: string;
  private sortCriteriaGroup: ISqlSortCriteria[];
  protected constructor(rootExpression: string) {
    super();
    this.rootExpression = rootExpression;
    this.sortCriteriaGroup = [];
  }
  public addSortCriteria(s: ISqlSortCriteria): void {
    this.sortCriteriaGroup.push(s);
  }
  public toExpression(): string {
    this.beginNewGroup();
    let whereClause = "";
    let sortByClause = "";
    this.criteriaGroups.forEach((grp) => {
      if (whereClause.length === 0) {
        whereClause += ` WHERE (${grp.map((c) => c.toExpression()).join(" AND ")})`;
      } else {
        whereClause += ` OR (${grp.map((c) => c.toExpression()).join(" AND ")})`;
      }
    });
    this.sortCriteriaGroup.forEach((sc) => {
      if (sortByClause.length === 0) {
        sortByClause += ` ORDER BY ${sc.toExpression()}`;
      } else {
        sortByClause += ` ,${sc.toExpression()}`;
      }
    });
    this._clearCriterias();
    return `${this.rootExpression} ${whereClause} ${sortByClause};`;
  }
  private _clearCriterias() {
    this.criteriaGroups = [];
    this.currentCriteriaGroup = [];
    this.sortCriteriaGroup = [];
  }
}
