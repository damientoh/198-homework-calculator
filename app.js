// intialize variables
let screen = document.querySelector('.screen .value')
let numberContainer = document.querySelector('.number-container')
let numberButtons = document.querySelectorAll('.number-button')
let actionButtons = document.querySelectorAll('.action-button')
let actionContainer = document.querySelector('.action-container')
let screenValue = document.querySelector('.screen .value')
let previousValue = document.querySelector('.screen .previous')
let actionItems = ['+', '-', 'x', '/']
let deleteButton = document.querySelector('.delete')
let equal = document.querySelector('.equal')
let pressedEqual = false

// FUNCTIONS
// return screen value innerHTML
function isOperator(text) {
    // console.log(text)
    return actionItems.includes(text)
}

function deleteScreen() {
    if (screen.innerHTML != '' && !actionItems.includes(screen.innerHTML)) {
        let valueArray = screen.innerHTML.split('')
        valueArray.pop()
        screen.innerHTML = valueArray.join('')
    }
}

function calculateValue(lst) {
    // base case
    if (lst.length == 1) {
        return Number(lst[0])
    }
    if (!isOperator(lst[0])) {
        if (lst[1] == '+') {
            return Number(lst[0]) + calculateValue(lst.slice(2))
        }
        if (lst[1] == 'x') {
            return Number(lst[0]) * calculateValue(lst.slice(2))
        }
        if (lst[1] == '-') {
            return Number(lst[0]) - calculateValue(lst.slice(2))
        }
        if (lst[1] == '/') {
            return Number(lst[0]) / calculateValue(lst.slice(2))
        }
    }
}


// event listener for the buttons
numberButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (pressedEqual) {
            previousValue.innerHTML = ''
            screenValue.innerHTML = button.innerHTML
            pressedEqual = false
        }
        else if (isOperator(screenValue.innerHTML)) {
            previousValue.innerHTML += ' ' + screenValue.innerHTML
            screenValue.innerHTML = button.innerHTML
        } else {
            screenValue.innerHTML += button.innerHTML
        }
    })
})

actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        let dataValue = button.innerHTML
        // console.log(screenValue.innerHTML)
        if (pressedEqual) {
            previousValue.innerHTML = screenValue.innerHTML
            screenValue.innerHTML = dataValue
            pressedEqual = false
        }
        else if (isOperator(screenValue.innerHTML)) {
            screenValue.innerHTML = dataValue
        } else {
            previousValue.innerHTML += ' ' + screenValue.innerHTML
            screenValue.innerHTML = dataValue
        }

    })
})

equal.addEventListener('click', e => {
    if (!pressedEqual) {
        previousValue.innerHTML += ' ' + screenValue.innerHTML
        let valueList = previousValue.innerHTML.split(' ')
        if (valueList[0] == '') {
            valueList.shift()
        }
        screenValue.innerHTML = calculateValue(valueList)
        pressedEqual = true
    }
})

deleteButton.addEventListener('click', deleteScreen)

document.addEventListener('keydown', function (event) {
    if (event.key == 'Backspace') {
        deleteButton.click()
    }
    if (!isNaN(event.key)) {
        numberButtons.forEach(button => {
            if (button.innerHTML == event.key) {
                button.click()
            }
        })
    }
    if (actionItems.includes(event.key)) {
        actionButtons.forEach(action => {
            if (action.innerHTML == event.key) {
                action.click()
            }
        })
    }
    if (event.key == 'Enter') {
        equal.click()
    }
});