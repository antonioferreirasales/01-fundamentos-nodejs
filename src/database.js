import fs from 'node:fs/promises'
const databasePath = new URL('db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

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
    this.#persist()
    return data;
  }

  update(table, user) {
    const rowIndex = this.#database[table].findIndex(row => row.id === user.id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = user
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

}