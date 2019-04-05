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
  constructor(connectionPool: TdsConnectionPool, dataMapper: ITdsDataMapper<TEntity>) {
    this.connectionPool = connectionPool;
    this.dataMapper = dataMapper;
  }
  public get(query: ISqlQuery): Promise<TEntity[]> {
    return new Promise(async (res, rej) => {
      const matches: TEntity[] = [];
      this.connectionPool.use(
        (conn) =>
          new Promise((r) => {
            const req = new Request(query.toExpression(), (err) => {
              this.connectionPool.release(conn);
              if (err) {
                r(res([]));
              } else {
                r(res(matches));
              }
            });
            req.on("row", (row) => matches.push(this.dataMapper.toDomain(row)));
            conn.execSql(req);
          }),
      );
    });
  }
  public getStream(query: ISqlQuery): Readable<TEntity> {
    const rs = new EntityReadableStream<TEntity>();
    this.connectionPool.use(
      (conn) =>
        new Promise((res) => {
          const req = new Request(query.toExpression(), (err) => {
            rs.push(null);
            res();
          });
          req.on("row", (row) => rs.push(this.dataMapper.toDomain(row)));
          conn.execSql(req);
        }),
    );
    return rs;
  }
}
