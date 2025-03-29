let expenses = [];
let totalAmount = 0;
let editingExpenseIndex = null;

let SerialNumber = 1;

const categorySelect = document.querySelector("#category-select");
const amountInput = document.querySelector("#amount-input");
const dateInput = document.querySelector("#date-input");
const addBtn = document.querySelector("#add-btn");
const expenseTableBody = document.querySelector(".expense-table-body");
const totalAmountCell = document.querySelector("#total-amount");

// addBtn.addEventListener("click" , function(){
//     let category = categorySelect.value;
//     let amount = Number(amountInput.value);
//     let date = dateInput.value;

//     // if(category ===)
//     if(category === ""){
//         alert("Please select the category");
//         return;
//     }

//     if(amount === 0 || amount < 0){
//         alert("Please enter a valid amount");
//         return;
//     }

//     if(date === ""){
//         alert("Please enter the date");
//         return;
//     }

//     const newExpense = {category, amount, date};

//     expenses.push(newExpense);
//     totalAmount += amount;
//     totalAmountCell.textContent = totalAmount;

//     const newRow = expenseTableBody.insertRow();
//     const serialCell = newRow.insertCell();
//     serialCell.textContent = SerialNumber++;


//     const categoryCell = newRow.insertCell();
//     const amountCell = newRow.insertCell();
//     const dateCell = newRow.insertCell();
//     const deleteCell = newRow.insertCell();
 

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";

//     const expense = expenses[expenses.length - 1];
//     categoryCell.textContent = expense.category;
//     amountCell.textContent = expense.amount;
//     dateCell.textContent = expense.date;
//     deleteCell.appendChild(deleteBtn);

//      deleteBtn.addEventListener("click" , function(){
//          expenses.splice(expenses.indexOf(expense) , 1);
//          totalAmount -= expense.amount;
//          totalAmountCell.textContent = totalAmount;

//          expenseTableBody.removeChild(newRow);
//          updateSerialNumbers();
//      });


//      categorySelect.value = "";
//      amountInput.value = "";
//         dateInput.value = "";
    
// })

window.onload = () => {
    SerialNumber = 1;
    updateSerialNumbers();
}

function addExpense(){
    let category = categorySelect.value;
        let amount = Number(amountInput.value);
        let date = dateInput.value;

        // if(category ===)
        if(category === ""){
            alert("Please select the category");
            return;
        }

        if(amount === 0 || amount < 0){
            alert("Please enter a valid amount");
            return;
        }

        if(date === ""){
            alert("Please enter the date");
            return;
        }

        const newExpense = {category, amount, date};

        expenses.push(newExpense);
        totalAmount += amount;
        totalAmountCell.textContent = totalAmount;

        const newRow = expenseTableBody.insertRow();
        const serialCell = newRow.insertCell();
        serialCell.textContent = SerialNumber++;


        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const editCell = newRow.insertCell();
    

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        // const expense = expenses[expenses.length - 1];
        categoryCell.textContent = newExpense.category;
        amountCell.textContent = newExpense.amount;
        dateCell.textContent = newExpense.date;
        deleteCell.appendChild(deleteBtn);
        editCell.appendChild(editBtn);

         deleteBtn.addEventListener("click" , function(){
             expenses.splice(expenses.indexOf(newExpense) , 1);
             totalAmount -= newExpense.amount;
             totalAmountCell.textContent = totalAmount;

             expenseTableBody.removeChild(newRow);
             updateSerialNumbers();
         });

         editBtn.addEventListener("click" , function(){
            categorySelect.value = newExpense.category;
            amountInput.value = newExpense.amount;
            dateInput.value = newExpense.date;

            editingExpenseIndex = expenses.indexOf(newExpense);

            addBtn.textContent = "Save Changes";
         })


         categorySelect.value = "";
         amountInput.value = "";
            dateInput.value = "";
     
}

function saveEditedExpense(){
    let category = categorySelect.value;  
    let amount = Number(amountInput.value);
    let date = dateInput.value;

    if(category === "" || amount <= 0 || date === ""){
        alert("Please fill all fields correctly.");
        return;
    }

    const expenseToEdit = expenses[editingExpenseIndex];
    totalAmount -= expenseToEdit.amount;
    expenseToEdit.category = category;
    expenseToEdit.amount = amount;
    expenseToEdit.date = date;
    totalAmount += amount;

    const row = expenseTableBody.rows[editingExpenseIndex];
    row.cells[1].textContent = category;
    row.cells[2].textContent = expenseToEdit.amount;
    row.cells[3].textContent = expenseToEdit.date;

    totalAmountCell.textContent = totalAmount;

    // Reset the editing state
    addBtn.textContent = "Add Expense";
    editingExpenseIndex = null; // Reset the editing flag to null
    categorySelect.value = "";
    amountInput.value = "";
    dateInput.value = "";

}

addBtn.addEventListener("click" , function(){
    //if expense is edited
    if(editingExpenseIndex !== null){
        saveEditedExpense();
    }else{
        addExpense();
    }
});

function updateSerialNumbers(){
    let rows = expenseTableBody.rows;
   let number  = 1;

   for(let i = 0; i < rows.length; i++){
       let cell = rows[i].cells[0];
       cell.textContent = number++;
   }
}

//add category to the select options
document.querySelector("#add-category-btn").addEventListener("click" , function(){
    let newCategory = prompt("Enter new category name:");
    if(newCategory){
        let newCategorySelect = document.querySelector("#category-select");
        let option = document.createElement("option");
        option.textContent = newCategory;
        option.value = newCategory;
        
        newCategorySelect.insertBefore(option , newCategorySelect.firstChild);

        newCategorySelect.value = newCategory;
    };
});