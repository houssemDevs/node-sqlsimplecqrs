import { TdsFilterCriteria } from "../src/tedious";

describe("TdsFilterCriteria", () => {
  test("Date equality criteria", () => {
    const d = new Date();
    const c = TdsFilterCriteria.dateEq("date", d);
    expect(c.toExpression()).toMatch(
      `date = DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date less than criteria", () => {
    const d = new Date();
    const c = TdsFilterCriteria.dateLt("date", d);
    expect(c.toExpression()).toMatch(
      `date < DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date less than or equal criteria", () => {
    const d = new Date();
    const c = TdsFilterCriteria.dateLte("date", d);
    expect(c.toExpression()).toMatch(
      `date <= DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date greater than criteria", () => {
    const d = new Date();
    const c = TdsFilterCriteria.dateGt("date", d);
    expect(c.toExpression()).toMatch(
      `date > DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date greater than or equal criteria", () => {
    const d = new Date();
    const c = TdsFilterCriteria.dateGte("date", d);
    expect(c.toExpression()).toMatch(
      `date >= DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
});
