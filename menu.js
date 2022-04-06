const breakfast = {
    "entrees": {

        "Omelets & Scrambles": {
            "Eggs Benedict": { "ingredients": ["eggs"], "price": 14.99 },
            "Scrambled Eggs": { "ingredients": ["eggs"], "price": 8.99 },
            "Omelette": { "ingredients": ["eggs"], "price": 8.99 }
        }
        ,
        "Pacakes & Waffles": {
            "Pancakes": { "ingredients": ["Pancakes"], "price": 14.99 },
            "Waffles": { "ingredients": ["Waffles"], "price": 14.99 },
            "French Toast": { "ingredients": ["French Toast"], "price": 14.99 },
        }
    },
    "sides": {
        "Hashbrowns": { "ingredients": ["eggs"], "price": 4.99 },
        "Toast": { "ingredients": ["eggs"], "price": 8.99 },
        "French Fries": { "ingredients": ["eggs"], "price": 7.99 },
        "Biscuits": { "ingredients": ["eggs"], "price": 15.99 },
        "Sausage": { "ingredients": ["eggs"], "price": 27.99 },
        "Bacon": { "ingredients": ["eggs"], "price": 13.99 },
        "English Muffin": { "ingredients": ["eggs"], "price": 12.99 },
        "Ham": { "ingredients": ["eggs"], "price": 20.99 }
    }
}
const Lunch = {
    "entrees": {

        "Chicken": {
            "Chicken Strips": { "ingredients": ["eggs"], "price": 6.99 },
            "Chicken Nuggets": { "ingredients": ["eggs"], "price": 5.99 },
            "Chicken Sandwhich": { "ingredients": ["eggs"], "price": 9.99 },
            "Grilled Chicken": { "ingredients": ["Chicken"], "price": 8.99 }
        }
        ,
        "Burgers": {
            "California Burger": { "ingredients": ["Pancakes"], "price": 25.99 },
            "Pizza Burger": { "ingredients": ["Waffles"], "price": 10.99 },
            "Steak Burger": { "ingredients": ["French Toast"], "price": 21.99 },
        }
    },
    "sides": {
        "Baked Potato": { "ingredients": ["eggs"], "price": 6.99 },
        "Toast": { "ingredients": ["eggs"], "price": 8.99 },
        "French Fries": { "ingredients": ["eggs"], "price": 7.99 },
        "Salad": { "ingredients": ["eggs"], "price": 15.99 },
        "Soup of the Day": { "ingredients": ["eggs"], "price": 5.99 },
        "Chili": { "ingredients": ["eggs"], "price": 13.99 }
    }
}

let current_meal = "Breakfast"
const breakfast_button = document.querySelector('.meal-selection.breakfast')
const lunch_button = document.querySelector('.meal-selection.lunch')
const dinner_button = document.querySelector('.meal-selection.dinner')
let lastModifiedSide = 0

breakfast_button.onclick = () => {
    current_meal = "Breakfast"
    renderBreakfast()
    console.log(current_meal)
}
lunch_button.onclick = () => {
    current_meal = "Lunch"
    console.log(current_meal)
    renderLundin();
}
dinner_button.onclick = () => {
    current_meal = "Dinner"
    console.log(current_meal)
}

const handleEntreeClick = (event, entrees) => {
    let entree = document.querySelector(".current-meal.entree.selection")
    let target = event.currentTarget
    if (entree.innerText === "No Selection") {
        entree.innerText = target.children[0].innerText
        updateTotal(target.children[1].innerText)
    } else {
        for (key in entrees) {
            for (item in entrees[key]) {
                if (item === entree.innerText) {
                    updateTotal(target.children[1].innerText, entrees[key][item].price)
                }
            }
        }
        entree.innerText = target.children[0].innerText
    }
}

const handleSideClick = (e, sides) => {
    let side_selection = document.querySelectorAll(".current-meal.side.selection")

    if (lastModifiedSide === 0) {
        side_selection[0].innerText = e.currentTarget.children[0].innerText
        updateTotal(e.currentTarget.children[1].innerText)
        lastModifiedSide = 1
    } else {

        switch (lastModifiedSide) {
            case 1:
                console.log("first side was last modified")
                if (side_selection[1].innerText === "No Selection") {
                    updateTotal(e.currentTarget.children[1].innerText)
                } else {
                    for (side in sides) {
                        if (side === side_selection[1].innerText) {
                            console.log(side)
                            updateTotal(e.currentTarget.children[1].innerText, sides[side].price)
                        }
                    }
                }

                side_selection[1].innerText = e.currentTarget.children[0].innerText
                lastModifiedSide = 2
                break;

            case 2:
                console.log("second side was last modified")
                if (side_selection[0].innerText === "No Selection") {
                    console.log(side_selection[0].innerText)
                    updateTotal(e.currentTarget.children[1].innerText)

                } else {
                    for (side in sides) {
                        if (side === side_selection[0].innerText) {
                            console.log(side)
                            console.log(sides[side].price)
                            updateTotal(e.currentTarget.children[1].innerText, sides[side].price)
                        }

                    }
                }
                side_selection[0].innerText = e.currentTarget.children[0].innerText
                lastModifiedSide = 1
                break;
        }
    }
}

const updateTotal = (price, oldPrice = "0.00") => {
    console.log("passed price:", price)
    console.log("passed oldPrice:", oldPrice)
    let totalElement = document.querySelector('.current-meal.total.amount')
    total = totalElement.innerText.substring(1)
    price = price.substring(1)
    console.log("removed $ price: ", price)
    price = parseFloat(price)
    console.log("floated price: ", price)
    oldPrice = parseFloat(oldPrice)
    console.log("floated oldPrice:", oldPrice)
    console.log(oldPrice)
    total = parseFloat(total)
    console.log(total)
    total += price - oldPrice
    console.log(total)
    totalElement.innerText = `$${total}`
}

const renderEntrees = (entrees) => {

    const entreesElement = document.querySelector(".menu .entrees");

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
}

const renderSides = (sides) => {
    const sidesElement = document.querySelector(".menu .sides");
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
}

const renderBreakfast = () => {
    clearMenu()
    renderEntrees(breakfast["entrees"])
    renderSides(breakfast["sides"])
}

const renderLundin = () => {
    clearMenu()
    renderEntrees(Lunch["entrees"])
    renderSides(Lunch["sides"])

}
const clearMenu = () => {
    const entreesElement = document.querySelector(".menu .entrees");
    const sidesElement = document.querySelector(".menu .sides");
    entreesElement.replaceChildren()
    sidesElement.replaceChildren()

}


if (current_meal === "Breakfast") {
    renderBreakfast()
} else if (current_meal === "Lunch" || current_meal === "Dinner") {
    renderLundin()
}