import { ColumnMetaData, ColumnType, ColumnValue } from "tedious";
import { TdsDataMapper } from "../src/tedious";

class ColType implements ColumnType {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// tslint:disable-next-line: max-classes-per-file
class ColMetadata implements ColumnMetaData {
  public colName: string;
  public type: ColType;
  public precision?: number;
  public scale?: number;
  public dataLength?: number;
  constructor(name: string, type: string) {
    this.colName = name;
    this.type = new ColType(type);
  }
}

// tslint:disable-next-line: max-classes-per-file
class Cols implements ColumnValue {
  public metadata: ColMetadata;
  public value: any;
  constructor(name: string, type: string, value: any) {
    this.metadata = new ColMetadata(name, type);
    this.value = value;
  }
}

describe("TdsDataMapper", () => {
  let storeObjects: Cols[];
  let domainObjects: any[];
  const mapper = new TdsDataMapper();
  beforeEach(() => {
    storeObjects = [
      new Cols("code", "Int", 3),
      new Cols("name", "Text", "houssem"),
    ];
    domainObjects = [{ ["code"]: 3 }, { ["name"]: "houssem" }];
  });
  test("should return domain object", () => {
    const result = mapper.toDomain(storeObjects);
    expect(result).toEqual({ ["code"]: 3, ["name"]: "houssem" });
  });
});
