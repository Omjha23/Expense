
// const expenseTableBody = document.getElementById('expense-table-body');
// const addBtn = document.getElementById('add-btn');
// const categorySelect = document.getElementById('category-select');
// const amountInput = document.getElementById('amount-input');
// const dateInput = document.getElementById('date-input');
// const descriptionInput = document.getElementById('description-input');
// const showAllBtn = document.getElementById('show-all-btn');

// let expenses = [];
// let editMode = false; // Flag to check if we're in edit mode
// let currentEditingExpenseId = null; // Store the ID of the expense being edited

// function renderExpenses() {
//     expenseTableBody.innerHTML = ''; // Clear the table body before rendering

//     expenses.forEach(expense => {
//         const row = expenseTableBody.insertRow();

//         const categoryCell = row.insertCell();
//         const amountCell = row.insertCell();
//         const dateCell = row.insertCell();
//         const descriptionCell = row.insertCell();
//         const actionsCell = row.insertCell();

//         categoryCell.textContent = expense.category;
//         amountCell.textContent = expense.amount;
//         dateCell.textContent = expense.date;
//         descriptionCell.textContent = expense.description || ''; // Handle cases where description might be null

//         // Create edit and delete buttons
//         const editBtn = document.createElement('button');
//         const deleteBtn = document.createElement('button');

//         editBtn.textContent = 'Edit';
//         deleteBtn.textContent = 'Delete';

//         editBtn.classList.add('edit-btn');
//         deleteBtn.classList.add('delete-btn');

//         // Delete expense
//         deleteBtn.addEventListener('click', function () {
//             fetch(`http://localhost:5000/expenses/${expense.id}`, {
//                 method: 'DELETE'
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log('Expense deleted:', data);
//                     expenses = expenses.filter(exp => exp.id !== expense.id); // Remove from local state
//                     renderExpenses(); // Re-render the table
//                 })
//                 .catch(error => console.error('Error deleting expense:', error));
//         });

//         // Edit expense
//         editBtn.addEventListener('click', function () {
//             categorySelect.value = expense.category;
//             amountInput.value = expense.amount;
//             dateInput.value = expense.date;
//             descriptionInput.value = expense.description;

//             editMode = true; // Enable edit mode
//             currentEditingExpenseId = expense.id; // Store the ID of the expense being edited

//             // Change the button text to "Update"
//             addBtn.textContent = 'Update';
//         });

//         actionsCell.appendChild(editBtn);
//         actionsCell.appendChild(deleteBtn);
//     });
// }

// function addOrUpdateExpense() {
//     const category = categorySelect.value;
//     const amount = Number(amountInput.value);
//     const date = dateInput.value;
//     const description = descriptionInput.value;

//     if (!category || !amount || !date) {
//         alert('Please fill in all fields');
//         return;
//     }

//     if (editMode) {
//         // Update existing expense
//         fetch(`http://localhost:5000/expenses/${currentEditingExpenseId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ category, amount, date, description })
//         })
//             .then(response => response.json())
//             .then(updatedData => {
//                 console.log('Expense updated:', updatedData);
//                 const index = expenses.findIndex(exp => exp.id === currentEditingExpenseId);
//                 expenses[index] = updatedData; // Update the local state
//                 renderExpenses(); // Re-render the table

//                 resetForm(); // Reset form and states
//             })
//             .catch(error => console.error('Error updating expense:', error));
//     } else {
//         // Add new expense
//         fetch('http://localhost:5000/expenses', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ category, amount, date, description })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Expense added:', data);
//                 expenses.push(data); // Add the new expense to the local state
//                 renderExpenses(); // Re-render the table
//                 resetForm(); // Reset form and states
//             })
//             .catch(error => console.error('Error adding expense:', error));
//     }
// }

// function resetForm() {
//     // Reset form fields
//     categorySelect.value = '';
//     amountInput.value = '';
//     dateInput.value = '';
//     descriptionInput.value = '';

//     // Reset states and button text
//     editMode = false;
//     currentEditingExpenseId = null;
//     addBtn.textContent = 'Add';
// }

// // Fetch expenses from the backend when the page loads
// window.onload = function () {
//     fetch('http://localhost:5000/expenses')
//         .then(response => response.json())
//         .then(data => {
//             expenses = data; // Save expenses to local state
//             renderExpenses(); // Render expenses to the table
//         })
//         .catch(error => console.error('Error fetching expenses:', error));
// };

// // Add or update an expense
// addBtn.addEventListener('click', addOrUpdateExpense);

// // Show all expenses when the "Show All Expenses" button is clicked
// showAllBtn.addEventListener('click', function () {
//     fetch('http://localhost:5000/expenses')
//         .then(response => response.json())
//         .then(data => {
//             expenses = data; // Save expenses to local state
//             renderExpenses(); // Render expenses to the table
//         })
//         .catch(error => console.error('Error fetching expenses:', error));
// });
// const filterCategory = document.getElementById('filter-category');
// const filterAmount = document.getElementById('filter-amount');
// const filterDate = document.getElementById('filter-date');
// const filterBtn = document.getElementById('filter-btn');

// filterBtn.addEventListener('click', function () {
//     const category = filterCategory.value;
//     const amount = filterAmount.value ? Number(filterAmount.value) : null;
//     const date = filterDate.value;

//     const filteredExpenses = expenses.filter(expense => {
//         let matches = true;

//         if (category && expense.category !== category) {
//             matches = false;
//         }

//         if (amount && expense.amount < amount) {
//             matches = false;
//         }

//         if (date && expense.date !== date) {
//             matches = false;
//         }

//         return matches;
//     });

//     renderExpenses(filteredExpenses);
// });

// function renderExpenses(filteredExpenses) {
//     expenseTableBody.innerHTML = ''; // Clear the table body before rendering

//     const expensesToRender = filteredExpenses || expenses; // Use filtered expenses if available

//     expensesToRender.forEach(expense => {
//         const row = expenseTableBody.insertRow();

//         const categoryCell = row.insertCell();
//         const amountCell = row.insertCell();
//         const dateCell = row.insertCell();
//         const descriptionCell = row.insertCell();
//         const actionsCell = row.insertCell();

//         categoryCell.textContent = expense.category;
//         amountCell.textContent = expense.amount;
//         dateCell.textContent = expense.date;
//         descriptionCell.textContent = expense.description || '';

//         // Create edit and delete buttons
//         const editBtn = document.createElement('button');
//         const deleteBtn = document.createElement('button');

//         editBtn.textContent = 'Edit';
//         deleteBtn.textContent = 'Delete';

//         editBtn.classList.add('edit-btn');
//         deleteBtn.classList.add('delete-btn');

//         // Delete expense
//         deleteBtn.addEventListener('click', function () {
//             fetch(`http://localhost:5000/expenses/${expense.id}`, {
//                 method: 'DELETE'
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     expenses = expenses.filter(exp => exp.id !== expense.id); // Remove from local state
//                     renderExpenses(); // Re-render the table
//                 })
//                 .catch(error => console.error('Error deleting expense:', error));
//         });

//         // Edit expense
//         editBtn.addEventListener('click', function () {
//             categorySelect.value = expense.category;
//             amountInput.value = expense.amount;
//             dateInput.value = expense.date;
//             descriptionInput.value = expense.description;

//             editMode = true;
//             currentEditingExpenseId = expense.id;

//             addBtn.textContent = 'Update';
//         });

//         actionsCell.appendChild(editBtn);
//         actionsCell.appendChild(deleteBtn);
//     });
// }
const expenseTableBody = document.getElementById('expense-table-body');
const addBtn = document.getElementById('add-btn');
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const showAllBtn = document.getElementById('show-all-btn');
const filterCategory = document.getElementById('filter-category');
const filterBtn = document.getElementById('filter-btn');

let expenses = [];
let editMode = false; // Flag to check if we're in edit mode
let currentEditingExpenseId = null; // Store the ID of the expense being edited

// Function to render expenses to the table
function renderExpenses(filteredExpenses) {
    expenseTableBody.innerHTML = ''; // Clear the table body before rendering

    const expensesToRender = filteredExpenses || expenses; // Use filtered expenses if available

    expensesToRender.forEach(expense => {
        const row = expenseTableBody.insertRow();

        const categoryCell = row.insertCell();
        const amountCell = row.insertCell();
        const dateCell = row.insertCell();
        const descriptionCell = row.insertCell();
        const actionsCell = row.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        descriptionCell.textContent = expense.description || ''; // Handle cases where description might be null

        // Create edit and delete buttons
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');

        // Delete expense
        deleteBtn.addEventListener('click', function () {
            fetch(`http://localhost:5000/expenses/${expense.id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    expenses = expenses.filter(exp => exp.id !== expense.id); // Remove from local state
                    renderExpenses(); // Re-render the table
                })
                .catch(error => console.error('Error deleting expense:', error));
        });

        // Edit expense
        editBtn.addEventListener('click', function () {
            categorySelect.value = expense.category;
            amountInput.value = expense.amount;
            dateInput.value = expense.date;
            descriptionInput.value = expense.description;

            editMode = true; // Enable edit mode
            currentEditingExpenseId = expense.id; // Store the ID of the expense being edited

            // Change the button text to "Update"
            addBtn.textContent = 'Update';
        });

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    });
}

// Function to add or update an expense
function addOrUpdateExpense() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const description = descriptionInput.value;

    if (!category || !amount || !date) {
        alert('Please fill in all fields');
        return;
    }

    if (editMode) {
        // Update existing expense
        fetch(`http://localhost:5000/expenses/${currentEditingExpenseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, amount, date, description })
        })
            .then(response => response.json())
            .then(updatedData => {
                console.log('Expense updated:', updatedData);
                const index = expenses.findIndex(exp => exp.id === currentEditingExpenseId);
                expenses[index] = updatedData; // Update the local state
                renderExpenses(); // Re-render the table

                resetForm(); // Reset form and states
            })
            .catch(error => console.error('Error updating expense:', error));
    } else {
        // Add new expense
        fetch('http://localhost:5000/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, amount, date, description })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Expense added:', data);
                expenses.push(data); // Add the new expense to the local state
                renderExpenses(); // Re-render the table
                resetForm(); // Reset form and states
            })
            .catch(error => console.error('Error adding expense:', error));
    }
}

// Function to reset the form and button text
function resetForm() {
    // Reset form fields
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';

    // Reset states and button text
    editMode = false;
    currentEditingExpenseId = null;
    addBtn.textContent = 'Add';
}

// Fetch expenses from the backend when the page loads
window.onload = function () {
    fetch('http://localhost:5000/expenses')
        .then(response => response.json())
        .then(data => {
            expenses = data; // Save expenses to local state
            renderExpenses(); // Render expenses to the table
        })
        .catch(error => console.error('Error fetching expenses:', error));
};

// Add or update an expense
addBtn.addEventListener('click', addOrUpdateExpense);

// Show all expenses when the "Show All Expenses" button is clicked
showAllBtn.addEventListener('click', function () {
    fetch('http://localhost:5000/expenses')
        .then(response => response.json())
        .then(data => {
            expenses = data; // Save expenses to local state
            renderExpenses(); // Render expenses to the table
        })
        .catch(error => console.error('Error fetching expenses:', error));
});

// Filter expenses by category
filterBtn.addEventListener('click', function () {
    const category = filterCategory.value;

    const filteredExpenses = expenses.filter(expense => {
        // Only filter by category
        return category ? expense.category === category : true;
    });

    renderExpenses(filteredExpenses); // Pass filtered expenses to render function
});
