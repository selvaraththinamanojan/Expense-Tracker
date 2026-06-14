let transactions = [];
let savedData = localStorage.getItem('transactions');

if (savedData) {
    transactions = JSON.parse(savedData);
} else {
    transactions = [];
}

let totalIncomeAmount = 0;
let totalExpenseAmount = 0;

for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
        totalIncomeAmount += transactions[i].amount;
    } else {
        totalExpenseAmount += transactions[i].amount;
    }
}

let activeType = 'income';

const incomeBtn = document.getElementById("btn-income");
const expenseBtn = document.getElementById("btn-expense");
const addBtn = document.getElementById("add-btn");
const balance = document.getElementById("netBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");


function loadFromStorage() {
    const netBalance = totalIncomeAmount - totalExpenseAmount;
    totalIncome.textContent = 'Rs. ' + totalIncomeAmount.toFixed(2);
    totalExpense.textContent = 'Rs. ' + totalExpenseAmount.toFixed(2);
    balance.textContent = 'Rs. ' + netBalance.toFixed(2);
}

loadFromStorage(); // ← page load-ல call பண்ணு

function selectType(type) {
    activeType = type;

    if (type === 'income') {
        incomeBtn.classList.add('active-income');
        expenseBtn.classList.remove('active-expense');
        addBtn.textContent = '+ Add Income';
        addBtn.classList.remove('add-btn-expense');
        addBtn.classList.add('add-btn-income');
    } else {
        expenseBtn.classList.add('active-expense');
        incomeBtn.classList.remove('active-income');
        addBtn.textContent = '+ Add Expense';
        addBtn.classList.remove('add-btn-income');
        addBtn.classList.add('add-btn-expense');
    }
}

function addTransaction() {
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;

    document.getElementById("amount-empty").textContent = '';
    document.getElementById("description-empty").textContent = '';

    if (!amount && !description) {
        document.getElementById("amount-empty").textContent = "Enter your Amount First...";
        document.getElementById("description-empty").textContent = "Enter your description...";
        return;
    }

    if (!amount) {
        document.getElementById("amount-empty").textContent = "Enter your Amount First...";
        document.getElementById("description-empty").textContent = "";
        return;
    }

    if (!description) {
        document.getElementById("description-empty").textContent = "Enter your description...";
        document.getElementById("amount-empty").textContent = "";
        return;
    }

    if (amount <= 0) {
        document.getElementById("amount-empty").textContent = "Amount Must be Graterthan 0...";
        return;
    }

    //object create for Array
    const newTransaction = {
        id: Date.now(),
        type: activeType,
        amount: amount,
        description: description
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    if (activeType === 'income') {
        totalIncomeAmount += amount;
    } else {
        totalExpenseAmount += amount;
    }

    const netBalance = totalIncomeAmount - totalExpenseAmount;

    totalIncome.textContent = 'Rs. ' + totalIncomeAmount.toFixed(2);
    totalExpense.textContent = 'Rs. ' + totalExpenseAmount.toFixed(2);
    balance.textContent = 'Rs. ' + netBalance.toFixed(2);

    // input box clear
    document.getElementById("amount").value = '';
    document.getElementById("description").value = '';
}

// user profile
let loggedUser = localStorage.getItem('loggedUser');
document.getElementById('nav-username').textContent = loggedUser;

function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}