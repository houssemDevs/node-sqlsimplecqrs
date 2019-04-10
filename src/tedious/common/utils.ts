import { Readable } from "stronger-typed-streams";

export class EntityReadableStream<TEntity> extends Readable<TEntity> {
  constructor(opts?: {}) {
    super({ ...opts, objectMode: true });
  }
  // tslint:disable-next-line: no-empty
  public _read(size: number) {}
}
