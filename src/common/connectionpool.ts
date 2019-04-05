export type IPoolTask<TConnection> = (c: TConnection) => Promise<void>;

export interface IConnectionPool<TConnection> {
  acquire(): Promise<TConnection>;
  release(c: TConnection): void;
  destroy(c: TConnection): void;
  terminate(): void;
  use(task: IPoolTask<TConnection>): void;
}
