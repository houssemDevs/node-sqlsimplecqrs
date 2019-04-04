import { IQueryHandler, QueryHandler } from "node-simplecqrs";
import { ITdsQuery } from "./query";

interface ITdsQueryHandler<TEntity> extends IQueryHandler<TEntity, ITdsQuery> {}
