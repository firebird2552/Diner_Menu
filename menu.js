/**
 * Author: Fordorth
 * Date: 04/05/2022
 * Purpose: To display a menu as a web page, the menu details are retrieved from a database
 * Tools: HTML, CSS, JavaScript, Python -> {Flask, SQLAlchemy, Marhmallow}, SQLlite
 */

// Global veriable decleration
let current_meal = "Breakfast"
let lastModifiedSide = 0

// Gets the buttons for breakfast, lunch, and dinner from the dom
const breakfast_button = document.querySelector('.meal-selection.breakfast')
const lunch_button = document.querySelector('.meal-selection.lunch')
const dinner_button = document.querySelector('.meal-selection.dinner')

// Handles the clicking of the breakfast button
breakfast_button.onclick = () => {
    current_meal = "Breakfast"
    renderBreakfast()
    console.log(current_meal)
}

// Handles the clicking of the lunch button
lunch_button.onclick = () => {
    current_meal = "Lunch"
    console.log(current_meal)
    renderLundin();
}
// Handles the clicking of the dinner button
dinner_button.onclick = () => {
    current_meal = "Dinner"
    console.log(current_meal)
}

// handles when an entree was clicked
const handleEntreeClick = (event, entrees) => {
    let entree = document.querySelector(".current-meal.entree.selection")

    let target = event.currentTarget

    if (entree.innerText === "No Selection") {
        entree.innerText = target.children[0].innerText
        updateTotal(target.children[1].innerText)
    } else {
        for (let count = 0; count < entrees.length; count++) {
            if (entrees[count].name === entree.innerText) {
                updateTotal(target.children[1].innerText, entrees[count].price)
            }
        }
    }
    entree.innerText = target.children[0].innerText
}

// Handles when a side is clicked
const handleSideClick = (e, sides) => {
    let side_selection = document.querySelectorAll(".current-meal.side.selection")

    if (lastModifiedSide === 0) {
        side_selection[0].innerText = e.currentTarget.children[0].innerText
        updateTotal(e.currentTarget.children[1].innerText)
        lastModifiedSide = 1
    } else {

        switch (lastModifiedSide) {
            case 1:
                if (side_selection[1].innerText === "No Selection") {
                    updateTotal(e.currentTarget.children[1].innerText)
                } else {
                    sides.forEach(side => {
                        if (side.name === side_selection[1].innerText) {
                            updateTotal(e.currentTarget.children[1].innerText, side.price)
                        }
                    })
                }

                side_selection[1].innerText = e.currentTarget.children[0].innerText
                lastModifiedSide = 2
                break;

            case 2:
                if (side_selection[0].innerText === "No Selection") {
                    console.log(side_selection[0].innerText)
                    updateTotal(e.currentTarget.children[1].innerText)

                } else {
                    sides.forEach(side => {
                        if (side.name === side_selection[0].innerText) {
                            updateTotal(e.currentTarget.children[1].innerText, side.price)
                        }

                    })
                }
                side_selection[0].innerText = e.currentTarget.children[0].innerText
                lastModifiedSide = 1
                break;
        }
    }
}

// update the total displayed in the total box
const updateTotal = (price, oldPrice = "0.00") => {
    let totalElement = document.querySelector('.current-meal.total.amount')
    total = totalElement.innerText.substring(1)
    price = price.substring(1)
    price = parseFloat(price)
    oldPrice = parseFloat(oldPrice)
    total = parseFloat(total)
    total += price - oldPrice
    totalElement.innerText = `$${total}`
}

// render the entrees onto the menu
const renderEntrees = (entrees) => {
    const entreesElement = document.querySelector(".menu.entrees");
    if (!Array.isArray(entrees)) {

        for (key in entrees) {
            let category = document.createElement("div")
            category.className = "menu category"
            category.innerHTML = `<div class="menu category header">${key}</div>`

            for (item in entrees[key]) {
                entree = entrees[key]
                let body = document.createElement("div")
                body.className = "menu item_body"
                body.addEventListener("click", (e) => {
                    handleEntreeClick(e, entrees)
                })
                let item_name = document.createElement("div")
                item_name.className = "menu item name"
                item_name.innerText = item
                let item_price = document.createElement("div")
                item_price.className = "menu item price"
                item_price.innerText = `$${entrees[key][item].price}`
                category.appendChild(body)

                body.appendChild(item_name)
                body.appendChild(item_price)
            }
            entreesElement.appendChild(category)
        }
    } else {
        let category = []
        let category_html = []
        entrees.forEach(item => {
            if (!category.includes(item.category)) {
                category.push(item.category)
                tempElement = document.createElement('div')
                tempElement.classList = 'menu category'


                let categoryHeader = document.createElement('div')
                categoryHeader.classList = 'menu category header'
                categoryHeader.innerText = item.category

                tempElement.appendChild(categoryHeader)
                category_html.push(tempElement)
            }

            let itemElement = document.createElement('div')
            let nameElement = document.createElement('div')
            let priceElement = document.createElement('div')

            itemElement.classList = 'menu item_body'
            nameElement.classList = 'menu item name'
            priceElement.classList = 'menu item price'

            nameElement.innerText = item.name
            priceElement.innerText = `$${item.price}`

            itemElement.appendChild(nameElement)
            itemElement.appendChild(priceElement)
            itemElement.addEventListener("click", (e) => {
                handleEntreeClick(e, entrees)
            })
            category_html[category.indexOf(item.category)].appendChild(itemElement)
        })
        category_html.forEach(category => {
            entreesElement.appendChild(category)
        })
    }
}

// Render the side onto the menu
const renderSides = (sides) => {
    const sidesElement = document.querySelector(".menu .sides");
    if (!Array.isArray(sides)) {
        for (item in sides) {
            let itemBody = document.createElement("div")
            let itemName = document.createElement("div")
            let itemPrice = document.createElement("div")
            itemBody.classList = "menu item_body"
            itemName.classList = "menu item name"
            itemName.innerText = item

            itemPrice.classList = "menu item price"
            itemPrice.innerText = "$" + sides[item].price
            itemBody.appendChild(itemName)
            itemBody.appendChild(itemPrice)
            itemBody.addEventListener('click', (e) => { handleSideClick(e, sides) })
            sidesElement.appendChild(itemBody)
        }
    } else {
        sides.forEach(item => {
            let itemBody = document.createElement("div")
            let itemName = document.createElement("div")
            let itemPrice = document.createElement("div")
            itemBody.classList = "menu item_body"
            itemName.classList = "menu item name"
            itemName.innerText = item.name

            itemPrice.classList = "menu item price"
            itemPrice.innerText = "$" + item.price
            itemBody.appendChild(itemName)
            itemBody.appendChild(itemPrice)
            itemBody.addEventListener('click', (e) => { handleSideClick(e, sides) })
            sidesElement.appendChild(itemBody)
        })
    }
}

// Render the breakfast menu
const renderBreakfast = async () => {
    clearMenu()

    try {
        entrees = await fetch('http://localhost:5000/breakfast/entrees').then((response) => { return response.json() })
        sides = await fetch('http://localhost:5000/breakfast/sides').then((response) => { return response.json() })
        renderEntrees(entrees)
        renderSides(sides)
    } catch (err) {
        console.error("There was an error fetching the data: ", err)
    }
}

// Render the lunch and dinner menu
const renderLundin = async () => {
    clearMenu()
    try {
        entrees = await fetch('http://localhost:5000/lunch/entrees').then((response) => { return response.json() })
        sides = await fetch('http://localhost:5000/lunch/sides').then((response) => { return response.json() })
        renderEntrees(entrees)
        renderSides(sides)
    } catch (err) {
        console.error("There was an error fetching the data: ", err)
    }

}

// Clears the previous rendered menu
const clearMenu = () => {
    const entreesElement = document.querySelector(".menu .entrees");
    const sidesElement = document.querySelector(".menu .sides");
    entreesElement.replaceChildren()
    sidesElement.replaceChildren()

}

// Gets the current time
let hour = new Date(Date.now()).getHours()


// If the current time is before 11 am default to breakfast menu
if (hour < 11) {
    current_meal = "Breakfast"
}

// if the current time is after 11 but before 5 pm default to lunch menu
else if (hour < 17) {
    current_meal = "Lunch"
} else
// Otherwise default to the dinner menu

{
    current_meal = "Dinner"
}

// render the current menu selection.
if (current_meal === "Breakfast") {
    renderBreakfast()
} else if (current_meal === "Lunch" || current_meal === "Dinner") {
    renderLundin()
}