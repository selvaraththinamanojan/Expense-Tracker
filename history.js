let transactions = [];
let savedData = localStorage.getItem('transactions');

if (savedData) {
    transactions = JSON.parse(savedData);
} else {
    transactions = [];
}

let currentFilter = 'all';


function renderTransactions() {
    const list = document.getElementById("transactionList");
    const emptyState = document.getElementById("emptyState");
    const count = document.getElementById("transactionCount");

    // filter 
    let filtered = [];

    for (let i = 0; i < transactions.length; i++) {
        if (currentFilter === 'all') {
            filtered.push(transactions[i]);
        } else if (transactions[i].type === currentFilter) {
            filtered.push(transactions[i]);
        }
    }

    // count update
    count.textContent = filtered.length;

    
    if (filtered.length === 0) {
        emptyState.style.display = 'block';
        list.innerHTML = '';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    
    list.innerHTML = '';

    for (let i = 0; i < filtered.length; i++) {
        const t = filtered[i];

        const li = document.createElement('li');
        li.className = 'transaction-item ' + t.type;

        li.innerHTML = 
            '<span class="t-description">' + t.description + '</span>' +
            '<span class="t-amount">Rs. ' + t.amount.toFixed(2) + '</span>' +
            '<button class="t-delete" onclick="deleteTransaction(' + t.id + ')">✕</button>';

        list.appendChild(li);
    }
}

// filter buttons
function filterTransactions(type) {
    currentFilter = type;

    // active button style
    document.getElementById("btn-all").classList.remove('filter-active');
    document.getElementById("btn-income").classList.remove('filter-active');
    document.getElementById("btn-expense").classList.remove('filter-active');

    if (type === 'all') {
        document.getElementById("btn-all").classList.add('filter-active');
    } else if (type === 'income') {
        document.getElementById("btn-income").classList.add('filter-active');
    } else {
        document.getElementById("btn-expense").classList.add('filter-active');
    }

    renderTransactions();
}

// delete 
function deleteTransaction(id) {
    let newTransactions = [];

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id !== id) {
            newTransactions.push(transactions[i]);
        }
    }

    transactions = newTransactions;
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}

//clear All
function clearAll() {
    transactions = [];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}

// page load
renderTransactions();

// user profile
let loggedUser = localStorage.getItem('loggedUser');
document.getElementById('nav-username').textContent = loggedUser;

function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
}