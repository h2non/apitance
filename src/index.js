require('./traceur-runtime')
const { Cucumber } = require('cucumber')

export class Apitance {
  constructor() {
    this.cucumber = new Cucumber
  }
}
