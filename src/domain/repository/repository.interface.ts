export interface FindAllResult<T> {
  count: number;
  data: T[];
}

export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findOne(id: string): Promise<T>;
  findAll(pageSize: number, page: number): Promise<FindAllResult<T>>;
}
