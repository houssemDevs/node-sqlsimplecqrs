export type IPoolTask<TConnection> = (c: TConnection) => PromiseLike<void>;

export interface IConnectionPool<TConnection> {
  acquire(): PromiseLike<TConnection>;
  release(c: TConnection): void;
  destroy(c: TConnection): void;
  terminate(): void;
  use(task: IPoolTask<TConnection>): void;
}
