import tds from "tedious";
import { TdsConnectionPool } from "../src/tedious/tdsconnectionpool";

jest.mock("tedious");

describe("TdsConnectionPool", () => {
  beforeEach(() => {
    tds.Connection.mockClear();
  });
  test("acquire a connection", () => {
    const pool = new TdsConnectionPool({
      server: "192.168.0.1",
      authentication: {
        type: "default",
        options: {
          userName: "sa",
          password: "1.0.5.1dre2015",
        },
      },
    });
    expect(tds.Connection).toBeCalledTimes(4);
  });
});
