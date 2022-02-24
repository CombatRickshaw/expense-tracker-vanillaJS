const balance = document.querySelector('.balance');
const expense = document.querySelector('#expense');
const income = document.querySelector('#income');
const transDesc = document.querySelector('#trans-desc-input');
const transAmount = document.querySelector('#transaction-amount');
const addButton = document.querySelector('#add-transaction-btn');
const transactionList = document.querySelector('.transaction-list');

//event listerner

let transactions = JSON.parse(localStorage.getItem('transactions'));

if (transactions == null) {
    transactions = [];
} else {
    initialize(transactions);
}


function initialize(transactions) {
    transactions.forEach((transaction) => {
        writeToDOM(transaction);
        updateBalance(transaction.amount);
    });
}

let transactionCount = 0;
let transactionzzz = [];

addButton.addEventListener('click', (event) => {

    event.preventDefault();
    //check the input fields
    const returnedObject = checkInputFields();
    const check = returnedObject[0];
    const transaction = returnedObject[1];
    transactionzzz.push(transaction);
    transactionCount++;

    if (check) {
        writeToDOM(transaction);
        updateBalance(transaction.amount);
        updateLocalStorage(transactionzzz);

    }
});

function checkInputFields() {

    if (transDesc.value !== "" & transAmount.value !== "") {
        //returning the transaction object
        let transaction = {
            text: transDesc.value,
            amount: Number(transAmount.value),
            transID: randomID(),
        }
        return [true, transaction]
    } else {
        if (transDesc.value === "") {
            transDesc.setAttribute('placeholder', 'Please input the Description');
        }
        if (transAmount.value === "") {
            transAmount.setAttribute('placeholder', 'Please input the Amount');
        }

        return [false, null]
    }
}

function randomID() {
    return Math.floor(Math.random() * 10000000)
}

function writeToDOM(transaction) {

    const listItem = document.createElement('li');
    listItem.classList.add('transaction-list-item');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    const img = document.createElement('img');
    img.setAttribute('src', './img/delete-icon.svg');
    deleteButton.append(img);
    const transDescInList = document.createElement('p');
    transDescInList.classList.add('transaction-desc');
    const amountInList = document.createElement('p');
    amountInList.classList.add('amount-list');
    //onclick="removeTransaction(${transaction.id})
    transDescInList.textContent = transaction.text;
    amountInList.textContent = transaction.amount;
    listItem.setAttribute('id', transaction.transID);

    listItem.append(deleteButton);
    listItem.append(transDescInList);
    listItem.append(amountInList);

    listItem.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');

    transactionList.append(listItem);
}

function updateBalance(amount) {

    let currExpenseVal = Number(expense.textContent);
    let currIncomeVal = Number(income.textContent);

    if (amount >= 0) {
        income.textContent = Math.round((currIncomeVal + amount) * 100) / 100;
        currIncomeVal = Number(income.textContent)
    } else {
        expense.textContent = Math.round((currExpenseVal + amount) * 100) / 100;
        currExpenseVal = Number(expense.textContent);
    }

    balance.textContent = (currExpenseVal + currIncomeVal);
}

function updateLocalStorage(transactionzzz) {
    localStorage.setItem('transactions', JSON.stringify(transactionzzz));
}

// transactionList.addEventListener('click', (event) => {

//             const targetItem = event.target;
//             console.log(targetItem.className)
//             if (targetItem.className === 'delete-btn') {
//                 targetItem.remove()

//             })

transactionList.addEventListener('click', (event) => {

    const targetItem = event.target;
    console.log(targetItem)
    targetItem.parentElement.remove();

})