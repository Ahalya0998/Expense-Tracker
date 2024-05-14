document.addEventListener('DOMContentLoaded', function() {
    const addTransactionForm = document.getElementById('add-transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const totalExpenses = document.getElementById('total-expenses');
    let transactions = [];

    // Function to render transactions
    function renderTransactions() {
        transactionList.innerHTML = '';
        let total = 0;
        transactions.forEach((transaction, index) => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            transactionElement.innerHTML = `
                <span>${transaction.name}</span>
                <span>${transaction.type === 'income' ? '+' : '-'} $${transaction.amount}</span>
                <span>${transaction.date}</span>
                <button onclick="deleteTransaction(${index})">Delete</button>
            `;
            transactionList.appendChild(transactionElement);
            if (transaction.type === 'expense') {
                total -= parseFloat(transaction.amount);
            } else {
                total += parseFloat(transaction.amount);
            }
        });
        totalExpenses.textContent = `Total Expenses: $${total.toFixed(2)}`;
    }

    // Function to add a new transaction
    function addTransaction(event) {
        event.preventDefault();
        const name = document.getElementById('transaction-name').value.trim();
        const amount = document.getElementById('transaction-amount').value.trim();
        const type = document.getElementById('transaction-type').value;
        const date = document.getElementById('transaction-date').value;
        if (name === '' || amount === '' || date === '') {
            alert('Please fill in all fields.');
            return;
        }
        const transaction = { name, amount, type, date };
        transactions.push(transaction);
        renderTransactions();
        addTransactionForm.reset();
    }

    // Function to delete a transaction
    window.deleteTransaction = function(index) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            transactions.splice(index, 1);
            renderTransactions();
        }
    };

    // Event listener for form submission
    addTransactionForm.addEventListener('submit', addTransaction);

});
