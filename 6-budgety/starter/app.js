var budgetController = (function()
{

})();

var UIController = (function()
{
    var DOMStrings = 
    {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function()
        {
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMStrings: function()
        {
            return DOMStrings;
        }
    };
})();

var appController = (function(budgetCtrl, UICtrl)
{
    var DOM = UICtrl.getDOMStrings();

    var ctrlAddItem = function()
    {
        // Get Input data
        var input = UICtrl.getInput();
        console.log(input);

        // Add Item to budget controller
        
        // Add item to UI
        
        // Calculate the budget
        
        // Display the budget
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event)
    {
        if (event.keyCode === 13 || event.which === 13)
        {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);

