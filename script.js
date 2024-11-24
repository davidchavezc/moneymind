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
            alert("Por favor ingrese un monto válido.");
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
        transactions.forEach((transaction, index) => {
            const transactionEl = document.createElement("li");
            transactionEl.classList.add(transaction.type === "income" ? "income" : "expense");

            // Format the date
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            transactionEl.innerHTML = `
                ${formattedDate} - ${transaction.concept}: $${transaction.amount.toFixed(2)}
                <button class="delete-btn" data-index="${index}">x</button>
            `;
            transactionList.appendChild(transactionEl);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                transactions.splice(index, 1);
                localStorage.setItem("transactions", JSON.stringify(transactions));
                updateTransactionList();
                updateSummary();
            });
        });
    }

    function updateSummary() {
        const totalIncome = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalExpense = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const balance = totalIncome - totalExpense;

        totalIncomeEl.textContent = `${totalIncome.toFixed(2)}`;
        totalExpenseEl.textContent = `${totalExpense.toFixed(2)}`;
        balanceEl.textContent = `${balance.toFixed(2)}`;
    }

    // Initial update
    updateTransactionList();
    updateSummary();
});