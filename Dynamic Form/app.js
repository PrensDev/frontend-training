class DynamicForm {
  constructor(table) {
    this.table = table;
    this.tblBody;

    this.#initialize();
  }

  #initialize() {
    let tblBody = this.table.getElementByClassName('tbody');
    console.log(tblBody);
  }

  
}

let dmForm = new DynamicForm(document.querySelector('#myDynamicForm'));