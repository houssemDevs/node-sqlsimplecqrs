import { IQueryHandler } from "node-simplecqrs";
import { ISqlSortCriteria } from "./criteria";
import { ISqlQuery } from "./query";

export interface ISqlQueryHandler<TEntity>
  extends IQueryHandler<TEntity, ISqlQuery<ISqlSortCriteria>> {}
