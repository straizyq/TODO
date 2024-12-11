"use strict"
let input = document.querySelector(".input")
let btnAdd = document.querySelector(".btnAdd")
let container = document.querySelector(".container")

loadItem()

if (input.value === "") {
    btnAdd.disabled = true
}
else {
    btnAdd.disabled = false
}

function add() {
    if (input.value === "") {
        return
    }
    createForm(input.value)
    
    saveItem(input.value)

    input.value = ""
    updateButtonState();
}

function createForm(inputValue) {
    let form = document.createElement("div")
    form.classList.add("form")

    let formInput = document.createElement("h2")
    formInput.classList.add("formInput")
    formInput.textContent = inputValue

    form.append(formInput)

    let btnSuccess = document.createElement("button")
    let btnDelete = document.createElement("button")
    btnSuccess.textContent = "Выполнить"
    btnDelete.textContent = "Удалить"
    btnSuccess.classList.add("btnSuccess")
    btnDelete.classList.add("btnDelete")

    container.append(form)
    container.append(btnSuccess)
    container.append(btnDelete)

    if (localStorage.getItem(inputValue) === "true") {
        form.classList.add("btnSuccessToggle");
        formInput.classList.add("formInputToggle");
    }
    
    btnDelete.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
            btnSuccess.remove()
            btnDelete.remove()
            form.remove()
            removeItem(inputValue)
        }
    })

    btnSuccess.addEventListener("click", function () {
        let formC = form.classList.toggle("btnSuccessToggle")
        let formIC = formInput.classList.toggle("formInputToggle")
        localStorage.setItem(inputValue, formC)
        localStorage.setItem(inputValue, formIC)
    })
}

function removeItem(item) {
    let items = JSON.parse(localStorage.getItem("todo"))

    items = items.filter(function(i) {
        return i !== item
    })
    localStorage.setItem("todo", JSON.stringify(items))
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem("todo")) || []
    
    if (!Array.isArray(items))  {
        items = []
    }

    items.push(item)
    localStorage.setItem("todo", JSON.stringify(items))
}

function loadItem() {
    let items = JSON.parse(localStorage.getItem("todo")) || []

    for (let i = 0; i < items.length; i++) {
        createForm(items[i])
    }

}


function updateButtonState() {
    if (input.value === "") {
        btnAdd.disabled = true
    }
    else {
        btnAdd.disabled = false
    }
}

input.addEventListener("input", updateButtonState);


input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        return add()
    }
})

btnAdd.addEventListener("click", add)
