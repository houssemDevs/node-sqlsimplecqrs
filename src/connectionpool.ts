import { createPool, Factory, Pool } from "generic-pool";
import { Connection, ConnectionConfig, ConnectionError, Request } from "tedious";

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

const TdsConnectionPoolFactory = (config: TdsConnectionConfig): Factory<Connection> => ({
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

export const TdsConnectionPool = (config: TdsConnectionConfig): Pool<Connection> =>
  createPool<Connection>(TdsConnectionPoolFactory(config), {
    acquireTimeoutMillis: 3000,
    idleTimeoutMillis: 30000,
    min: 4,
    max: 16,
  });
