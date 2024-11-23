document.addEventListener("DOMContentLoaded", () => {
    const transactionList = document.getElementById("transaction-list");
    const totalIncomeEl = document.getElementById("total-income");
    const totalExpenseEl = document.getElementById("total-expense");
    const balanceEl = document.getElementById("balance");
    const expenseForm = document.getElementById("expense-form");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = document.getElementById("type").value;
        const concept = document.getElementById("concept").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const date = document.getElementById("date").value;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const transaction = { type, concept, amount, date };

        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateTransactionList();
        updateSummary();
        expenseForm.reset();
    });

    function updateTransactionList() {
        transactionList.innerHTML = "";

        transactions.forEach((transaction) => {
            const li = document.createElement("li");
            li.textContent = `${transaction.type === "income" ? "+" : "-"}$${transaction.amount}MN ${transaction.concept} ${transaction.date}`;
            transactionList.appendChild(li);
        });
    }

    function updateSummary() {
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        totalIncomeEl.textContent = totalIncome.toFixed(2);
        totalExpenseEl.textContent = totalExpense.toFixed(2);
        balanceEl.textContent = balance.toFixed(2);
    }

    // Initial load
    updateTransactionList();
    updateSummary();
});