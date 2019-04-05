import { createPool, Factory, Pool } from "generic-pool";
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
    });
  },
  destroy: async (client) => {
    return client.close();
  },
  validate: async (client) => {
    return new Promise((res) => {
      const req = new Request("SELECT GETDATE();", (err) => {
        if (err) {
          res(false);
        }
      });
      req.once("done", () => res(true));
      req.once("error", (err) => res(false));
      client.execSql(req);
    });
  },
});

export class TdsConnectionPool implements IConnectionPool<Connection> {
  private pool: Pool<Connection>;
  constructor(config: TdsConnectionConfig) {
    this.pool = createPool<Connection>(TdsConnectionPoolFactory(config), {
      acquireTimeoutMillis: 3000,
      idleTimeoutMillis: 10000,
      min: 4,
      max: 16,
    });
  }
  public use(task: IPoolTask<Connection>): void {
    this.acquire().then((c) => {
      task(c).then(() => this.release(c));
    });
  }
  public terminate(): void {
    this.pool.drain();
  }
  public acquire(): PromiseLike<Connection> {
    return this.pool.acquire();
  }
  public release(c: Connection): void {
    this.pool.release(c);
  }
  public destroy(c: Connection): void {
    this.pool.destroy(c);
  }
}
