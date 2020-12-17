var budgetController = (function()
{
    var Expense = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type)
    {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItems: function(type, des, val) {
            var newItem, ID;

            // Create new id
            if(data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }
            else
            {
                ID = 0; 
            }

            // Create new item based on type
            if (type === 'exp')
            {
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc')
            {
                newItem = new Income(ID, des, val);
            }

            // Push it to array
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem
        },

        deleteItem: function(type, id)
        {

        },

        calculateBudget: function()
        {
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        getBudget: function()
        {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function()
        {
            console.log(data);
        }
    };
})();

var UIController = (function()
{
    var DOMStrings = 
    {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budegtLable: '.budget__value',
        incomeLable: '.budget__income--value',
        expenseLable: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function()
        {
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type)
        {
            var html, newHtml, element;

            // Create an html sting with placeholder text
            if (type === 'inc')
            {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp')
            {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert html to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function()
        {  
            var fields, fieldArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldArray = Array.prototype.slice.call(fields);

            fieldArray.forEach(function(current, index, array){
                current.value = "";
            });

            fieldArray[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(DOMStrings.budegtLable).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLable).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLable).textContent = obj.totalExp;

            if (obj.percentage > 0)
            {
                document.querySelector(DOMStrings.percentageLable).textContent = obj.percentage + '%';
            }
            else
            {
                document.querySelector(DOMStrings.percentageLable).textContent = '---';
            }
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

var appController = (function(budgetCtrl, UICtrl)
{
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function()
    {
        // Calculate the budget
        budgetCtrl.calculateBudget();  

        // Retun the budget
        var budget = budgetCtrl.getBudget();

        // Display the budget
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function()
    {
        var input, newItem;

        // Get Input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0)
        {
            // Add Item to budget controller
            newItem = budgetCtrl.addItems(input.type, input.description, input.value);
            
            // Add item to UI
            UICtrl.addListItem(newItem, input.type);

            // Clear the fields
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();
        }
    };

    var ctrlDeleteItem = function(event)
    {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID)
        {
            splitID = itemID.split('-')
            type = splitID[0];
            ID = splitID[1];

            // Delete item from data stracture

            // Delete item from UI

            // Update and show the new budget
        }
    };

    return {
        init: function(){
            console.log("App Started");
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,    
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

appController.init();