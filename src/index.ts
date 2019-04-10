export { ISqlDataMapper } from "./sql/common/datamapper";
export { IConnectionPool, IPoolTask } from "./common/connectionpool";

export {
  ISqlFilterCriteria,
  ISqlSortCriteria,
  SqlFilterCriteria,
  SqlSortCriteria,
} from "./sql/read/criteria";
export { ISqlQuery, SqlSelectQuery } from "./sql/read/query";
export { ISqlQueryHandler } from "./sql/read/queryhandler";

/* #region  Tedious implementation */
import * as tds from "./tedious";
export const Tds = { ...tds };
/* #endregion */
