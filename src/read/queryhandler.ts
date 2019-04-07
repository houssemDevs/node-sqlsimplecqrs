import { IQueryHandler } from "node-simplecqrs";
import { ISqlQuery } from "./query";

export interface ISqlQueryHandler<TEntity>
  extends IQueryHandler<TEntity, ISqlQuery> {}
