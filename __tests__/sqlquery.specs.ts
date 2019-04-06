import { SqlCriteria } from "../src/read/criteria";
import { SqlQuery } from "../src/read/query";

describe("SqlQuery", () => {
  let sqlquery: SqlQuery = new SqlQuery("");
  beforeEach(() => {
    sqlquery = new SqlQuery("select * from users");
  });
  test("no criteria", () => {
    expect(sqlquery.toExpression()).toMatch(/select [*] from users/);
  });
  test("equal criteria", () => {
    sqlquery.addCriteria(SqlCriteria.eq("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code = 12345/);
  });
  test("like criteria", () => {
    sqlquery.addCriteria(SqlCriteria.like("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code LIKE 12345/);
  });
  test("in criteria", () => {
    sqlquery.addCriteria(SqlCriteria.in("code", ["12345", "67890"]));
    expect(sqlquery.toExpression()).toMatch(/code IN \(12345,67890\)/);
  });
  test("lt criteria", () => {
    sqlquery.addCriteria(SqlCriteria.lt("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code < 12345/);
  });
  test("lte criteria", () => {
    sqlquery.addCriteria(SqlCriteria.lte("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code <= 12345/);
  });
  test("gt criteria", () => {
    sqlquery.addCriteria(SqlCriteria.gt("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code > 12345/);
  });
  test("gte criteria", () => {
    sqlquery.addCriteria(SqlCriteria.gte("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code >= 12345/);
  });
  test("null criteria", () => {
    sqlquery.addCriteria(SqlCriteria.null("code"));
    expect(sqlquery.toExpression()).toMatch(/code IS NULL/);
  });
  test("not null criteria", () => {
    sqlquery.addCriteria(SqlCriteria.notNull("code"));
    expect(sqlquery.toExpression()).toMatch(/code IS NOT NULL/);
  });
  test("custom criteria", () => {
    sqlquery.addCriteria(SqlCriteria.custom("code", "12345", "op"));
    expect(sqlquery.toExpression()).toMatch(/code op 12345/);
  });
  test("multiple criteria", () => {
    sqlquery
      .addCriteria(SqlCriteria.eq("code", "12345"))
      .addCriteria(SqlCriteria.gt("code", "'12000'"));
    expect(sqlquery.toExpression()).toMatch(/code = 12345 AND code > '12000'/);
  });
  test("multiple criteria groups", () => {
    sqlquery
      .addCriteria(SqlCriteria.eq("code", "12345"))
      .beginNewGroup()
      .addCriteria(SqlCriteria.eq("code", "67890"));
    expect(sqlquery.toExpression()).toMatch(
      /\(code = 12345\) OR \(code = 67890\)/,
    );
  });
});
