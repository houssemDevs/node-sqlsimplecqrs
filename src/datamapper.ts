import { DataMapper } from "node-simplecqrs";
import { ColumnValue } from "tedious";

export class TdsDataMapper extends DataMapper<ColumnValue[], {}> {
  public toDomain(s: ColumnValue[]): {} {
    return s.reduce((red, v) => ({ ...red, [v.metadata.colName]: v.value }), {});
  }
  public toStore(d: {}): ColumnValue[] {
    throw new Error("Method not implemented.");
  }
}
