import { ColumnValue } from "tedious";

import { ISqlDataMapper } from "../../sql/common/datamapper";

export interface ITdsDataMapper<TDomainEntity>
  extends ISqlDataMapper<ColumnValue[], TDomainEntity> {}

export class TdsDataMapper implements ITdsDataMapper<{}> {
  public toDomain(s: ColumnValue[]): {} {
    return s.reduce(
      (red, c) => ({ ...red, [c.metadata.colName]: c.value }),
      {},
    );
  }
  public toStore(d: {}): ColumnValue[] {
    throw new Error("Not implemented yet");
  }
}
