const generateId = () => `Kirillius${Math.round(Math.random() *1e8).toString(16)}`

const totalBalance = document.querySelector(".total__balance"),
      totalMoneyIncome = document.querySelector(".total__money-income"),
      totalMoneyExpenses = document.querySelector(".total__money-expenses"),
      historyList = document.querySelector(".history__list"),
      form = document.querySelector("#form"),
      operationName = document.querySelector(".operation__name"),
      operationAmount = document.querySelector(".operation__amount");

let dataBaseOperation = JSON.parse(localStorage.getItem('calc')) || [];


const renderOperation = (operation) => {

    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus';

    const listItem = document.createElement('li');

    listItem.classList.add('history__item');
    listItem.classList.add(className);

    listItem.classList.add('history__item');
    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount}</span>
        <button class="history_delete" data-id = "${operation.id}">x</button>
    `;
    
    historyList.append(listItem);

};

const updateBalance = () => {
    const resultIncome = dataBaseOperation
        .filter((item) => item.amount > 0)
        .reduce((result, item) => result + item.amount, 0);

        totalMoneyIncome.textContent = resultIncome;

    const resultExpenses = dataBaseOperation
        .filter((item) => item.amount < 0)
        .reduce((result, item) => result + item.amount, 0);

        totalMoneyExpenses.textContent = resultExpenses;

        totalBalance.textContent = resultIncome + resultExpenses;
};

const addOperation = (e) => {
    e.preventDefault();

    const operationNameValue = operationName.value;
    const operationAmountValue = operationAmount.value;

    operationName.style.borderColor = '';
    operationName.style.borderColor = '';

    if (operationNameValue && operationAmountValue) {
        
        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue
        }

        dataBaseOperation.push(operation);
        init();


    } else {
        if (!operationNameValue) operationName.style.borderColor = 'red';
        if (!operationAmountValue) operationName.style.borderColor = 'red';
    }

    operationName.value = '';
    operationAmount.value = '';
};

const deleteOperation = (e) => {

    const target = event.target;

    if (target.classList.contains('history__delete')) {
        dataBaseOperation = dataBaseOperation
            .filter(operation => operation.id !== target.dataset.id);
        
        init();
    }
}

const init = () => {
    historyList.textContent = '';
    dataBaseOperation.forEach(renderOperation)
    updateBalance();
    localStorage.setItem('calc', JSON.stringify(dataBaseOperation))
};

form.addEventListener('submit', addOperation);

historyList.addEventListener('click', deleteOperation)

init();

