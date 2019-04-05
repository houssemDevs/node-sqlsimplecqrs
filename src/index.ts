export { ISqlDataMapper } from "./common/datamapper";
export { IConnectionPool, IPoolTask } from "./common/connectionpool";

export { ISqlCriteria, SqlCriteria } from "./read/criteria";
export { ISqlQuery, SqlQuery } from "./read/query";
export { ISqlQueryHandler } from "./read/queryhandler";

/* #region  Tedious implementation */
import * as tds from "./tedious";
export const Tds = { ...tds };
/* #endregion */
