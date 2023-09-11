export class Task {
  constructor({title, completed = false}){
    this.title = title
    this.completed = completed
  }
}
export class User {
  constructor(size){
    this.table = new Array(size)
  }
  hash(key){
    let total = 0
    for(let i = 0; i < key.length; i++){
      total += key.charCodeAt(i)
    }
    total = total % this.table.length
    return total
  }
  addTask(key, boolean = false){
    const hash = this.hash(key)
    if(!this.table[hash]){
      this.table[hash] = []
    }
    this.table[hash].push([key, boolean])
  }
  addValue(key, value){
    const hash = this.hash(key)
    for(let i = 0; i < this.table[hash].length; i++){
      if(this.table[hash][i][0] === key){
        this.table[hash][i][1] = value
      }
    }
  }
  getKey(key){
    const hash = this.hash(key)
    if(this.table[hash]){
      for(let i = 0; i < this.table[hash].length; i++){
        if(this.table[hash][i][0] === key){
          return this.table[hash][i]
        }
      }
    }
    else{
      return false
    }
  }
  deleteKey(key){
    const hash = this.hash(key)
    delete this.table[hash]
  }
  getValue(boolean){
    for(let i = 0; i < this.table.length; i++){
      if(this.table[i]){
        for(let j = 0 ; j < this.table[i].length; j++){
          if(this.table[i][j][1] == boolean){
            return this.table[i][j][1]
          }
        }
      }
    }
    // return count
  }
}
