export class Database {
  #database = {}

  select (table) {
    const date = this.#database[table] ?? []

    return date
  }

  insert (table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    
    return data;
  }

}