import { Readable } from "stronger-typed-streams";
import { Request } from "tedious";

import { ISqlQuery } from "../read/query";
import { ISqlQueryHandler } from "../read/queryhandler";
import { TdsConnectionPool } from "./tdsconnectionpool";
import { ITdsDataMapper } from "./tdsdatamapper";
import { EntityReadableStream } from "./utils";

export class TdsQueryHandler<TEntity> implements ISqlQueryHandler<TEntity> {
  protected connectionPool: TdsConnectionPool;
  protected dataMapper: ITdsDataMapper<TEntity>;
  constructor(
    connectionPool: TdsConnectionPool,
    dataMapper: ITdsDataMapper<TEntity>,
  ) {
    this.connectionPool = connectionPool;
    this.dataMapper = dataMapper;
  }
  public get(query: ISqlQuery): Promise<TEntity[]> {
    return new Promise(async (res, rej) => {
      const matches: TEntity[] = [];
      const conn = await this.connectionPool.acquire();
      const req = new Request(query.toExpression(), (err) => {
        this.connectionPool.release(conn);
        if (err) {
          res([]);
        } else {
          res(matches);
        }
      });
      req.on("row", (row) => matches.push(this.dataMapper.toDomain(row)));
      conn.execSql(req);
    });
  }
  public getStream(query: ISqlQuery): Readable<TEntity> {
    const rs = new EntityReadableStream<TEntity>();
    this.connectionPool.acquire().then((conn) => {
      const req = new Request(query.toExpression(), (err) => {
        // TODO: handle errors.
        this.connectionPool.release(conn);
        rs.push(null);
      });
      req.on("row", (row) => rs.push(this.dataMapper.toDomain(row)));
      conn.execSql(req);
    });
    return rs;
  }
}
