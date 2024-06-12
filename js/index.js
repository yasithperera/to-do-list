const btnAddTaskElm = document
    .querySelector("#btn-add-task");

const txtTaskElm = document
    .querySelector("#txt-task");

const listContainerElm = document
    .querySelector("#list-container");

const noItemsElm = document
    .querySelector("#list-container > div");

btnAddTaskElm.addEventListener('click', (e) => {
    e.preventDefault();
    const task = txtTaskElm.value.trim();
    if (!task) {
        txtTaskElm.focus();
        txtTaskElm.select();
        return;
    }

    if (listContainerElm.contains(noItemsElm)) {
        noItemsElm.remove();
    }

    const listItemElm = document
        .createElement("div");
    const lblElm = document
        .createElement("label");
    const inputElm = document
        .createElement("input");
    const iconElm = document
        .createElement("i");
    const text = document
        .createTextNode(task);

    lblElm.append(inputElm);
    lblElm.append(text);
    listItemElm.append(lblElm);
    listItemElm.append(iconElm);

    listItemElm.setAttribute("class", "list-item d-flex justify-content-between p-2 align-items-center animate__animated animate__fadeInUp");
    listItemElm.setAttribute("tabindex", "0");
    lblElm.setAttribute("class", "d-flex gap-2");
    inputElm.setAttribute("type", "checkbox");
    inputElm.setAttribute("class", "form-check");
    inputElm.setAttribute("tabindex", "-1");/* to make tab not reach checkbox*/
    iconElm.setAttribute("class", "bi bi-trash3");

    listContainerElm.append(listItemElm);
    txtTaskElm.value = "";
    txtTaskElm.focus();
});

listContainerElm.addEventListener('click',
    (e) => {
        if (e.target.getAttribute("class") ===
            'bi bi-trash3') {
            e.target.parentElement.remove();
            if (!listContainerElm.children.length) {
                listContainerElm.append(noItemsElm);
            }
        }
    });

// btnAddTaskElm.addEventListener('keydown', (e) => {
//     if (e.key === "Tab") {
//         console.log("tab pressed on button");
//         e.preventDefault();
//         listContainerElm.firstElementChild.focus();
//         console.log(listContainerElm.firstElementChild);
//         listContainerElm.firstElementChild.style.backgroundColor = 'lightgrey';
//         // if (listContainerElm.children.length) {
//         //     listContainerElm.firstElementChild.focus();
//         //     console.log("tab pressed on button");
//         // }
//     }
// });

listContainerElm.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            e.target.closest('.list-item').previousElementSibling.focus();
            break;
        case 'ArrowDown':
            e.target.closest('.list-item').nextElementSibling.focus();
            break;
        case 'Space':
            const checkBoxElm = e.target.closest('.list-item').querySelector("input");
            checkBoxElm.checked = !checkBoxElm.checked;
            break;
        case 'Delete':
            if (e.target.getAttribute("class") === "list-item d-flex justify-content-between p-2 align-items-center animate__animated animate__fadeInUp") {
                e.target.remove();
            }
            break;
    }
});