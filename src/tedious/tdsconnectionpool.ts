import { createPool, Factory, Options, Pool } from "generic-pool";
import {
  Connection,
  ConnectionConfig,
  ConnectionError,
  Request,
} from "tedious";
import { IConnectionPool, IPoolTask } from "../common/connectionpool";

// tslint:disable-next-line: interface-name
export interface TdsConnectionConfig extends ConnectionConfig {
  authentication: {
    type: string;
    options: {
      userName: string;
      password: string;
      domain?: string;
    };
  };
}

const TdsConnectionPoolFactory = (
  config: TdsConnectionConfig,
): Factory<Connection> => ({
  create: () => {
    return new Promise((res, rej) => {
      const cnn = new Connection(config);
      cnn.once("connect", (err: ConnectionError) => {
        if (err) {
          rej(err);
        } else {
          res(cnn);
        }
      });
      cnn.once("error", (err) => rej(err));
    });
  },
  destroy: (client) => {
    return new Promise((res) => res(client.close()));
  },
  validate: (client) => {
    return new Promise((res) => {
      const req = new Request("SELECT GETDATE();", (err) => {
        if (err) {
          res(false);
        } else {
          res(true);
        }
      });
      req.once("error", () => res(false));
      client.execSql(req);
    });
  },
});

export class TdsConnectionPool implements IConnectionPool<Connection> {
  private pool: Pool<Connection>;
  constructor(config: TdsConnectionConfig, opts?: Options) {
    this.pool = createPool<Connection>(TdsConnectionPoolFactory(config), {
      acquireTimeoutMillis: 6000,
      idleTimeoutMillis: 10000,
      min: 4,
      max: 16,
      ...opts,
    });
  }
  public use(task: IPoolTask<Connection>): void {
    this.pool.use(task);
  }
  public terminate(): void {
    this.pool.drain();
  }
  public acquire(): Promise<Connection> {
    return new Promise((res, rej) => {
      try {
        this.pool.acquire().then((c) => res(c));
      } catch (err) {
        rej(err);
      }
    });
  }
  public release(c: Connection): void {
    this.pool.release(c);
  }
  public destroy(c: Connection): void {
    this.pool.destroy(c);
  }
}
