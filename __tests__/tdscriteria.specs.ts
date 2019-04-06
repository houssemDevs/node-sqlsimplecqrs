import { TdsCriteria } from "../src/tedious";

describe("TdsCriteria", () => {
  test("Date equality criteria", () => {
    const d = new Date();
    const c = TdsCriteria.dateEq("date", d);
    expect(c.toExpression()).toMatch(
      `date = DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date less than criteria", () => {
    const d = new Date();
    const c = TdsCriteria.dateLt("date", d);
    expect(c.toExpression()).toMatch(
      `date < DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date less than or equal criteria", () => {
    const d = new Date();
    const c = TdsCriteria.dateLte("date", d);
    expect(c.toExpression()).toMatch(
      `date <= DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date greater than criteria", () => {
    const d = new Date();
    const c = TdsCriteria.dateGt("date", d);
    expect(c.toExpression()).toMatch(
      `date > DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
  test("Date greater than or equal criteria", () => {
    const d = new Date();
    const c = TdsCriteria.dateGte("date", d);
    expect(c.toExpression()).toMatch(
      `date >= DATEFROMPARTS(${d.getFullYear()},${d.getMonth() +
        1},${d.getDate()})`,
    );
  });
});
