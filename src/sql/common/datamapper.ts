import { IDateMapper } from "node-simplecqrs";

export interface ISqlDataMapper<TStoreEntity, TDomainEntity>
  extends IDateMapper<TStoreEntity, TDomainEntity> {}
