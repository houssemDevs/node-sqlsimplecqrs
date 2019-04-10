import { SqlFilterCriteria } from "../src/sql/read/criteria";
import { SqlSelectQuery } from "../src/sql/read/query";

describe("SqlQuery", () => {
  let sqlquery: SqlSelectQuery;
  beforeEach(() => {
    sqlquery = SqlSelectQuery.fromSelectStatment("select * from users");
  });
  test("no criteria", () => {
    expect(sqlquery.toExpression()).toMatch(/select [*] from users/);
  });
  test("equal criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.eq("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code = 12345/);
  });
  test("like criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.like("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code LIKE 12345/);
  });
  test("in criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.in("code", ["12345", "67890"]));
    expect(sqlquery.toExpression()).toMatch(/code IN \(12345,67890\)/);
  });
  test("lt criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.lt("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code < 12345/);
  });
  test("lte criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.lte("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code <= 12345/);
  });
  test("gt criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.gt("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code > 12345/);
  });
  test("gte criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.gte("code", "12345"));
    expect(sqlquery.toExpression()).toMatch(/code >= 12345/);
  });
  test("null criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.null("code"));
    expect(sqlquery.toExpression()).toMatch(/code IS NULL/);
  });
  test("not null criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.notNull("code"));
    expect(sqlquery.toExpression()).toMatch(/code IS NOT NULL/);
  });
  test("custom criteria", () => {
    sqlquery.addCriteria(SqlFilterCriteria.custom("code", "12345", "op"));
    expect(sqlquery.toExpression()).toMatch(/code op 12345/);
  });
  test("multiple criteria", () => {
    sqlquery
      .addCriteria(SqlFilterCriteria.eq("code", "12345"))
      .addCriteria(SqlFilterCriteria.gt("code", "'12000'"));
    expect(sqlquery.toExpression()).toMatch(/code = 12345 AND code > '12000'/);
  });
  test("multiple criteria groups", () => {
    sqlquery
      .addCriteria(SqlFilterCriteria.eq("code", "12345"))
      .beginNewGroup()
      .addCriteria(SqlFilterCriteria.eq("code", "67890"));
    expect(sqlquery.toExpression()).toMatch(
      /\(code = 12345\) OR \(code = 67890\)/,
    );
  });
});
