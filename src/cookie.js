/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// filterNameInput.addEventListener('keyup', function() {
//     // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
// });

// addButton.addEventListener('click', () => {
//     // здесь можно обработать нажатие на кнопку "добавить cookie"
// });

const cookieMap = new Map();
const emulKeyup = new Event("keyup");

function isMatching(full, chunk) {

    const fullUpperCase = full.toUpperCase();
    const chunkUpperCase = chunk.toUpperCase();

    const fullArr = fullUpperCase.split('');
    const chunkArr = chunkUpperCase.split('');

    let isAny = false;
    let isMatching = true;
    let j;

    for (j = 0; j < fullArr.length; j++) {
        if (fullArr[j] === chunkArr[0]) {
            isAny = true;
            break;
        }
    }
        
    if (isAny == true) {
        for (let i = 0; i < chunkArr.length; i++) {
            if (chunkArr[i] != fullArr[j]) {
                isMatching = false;
                break;
            } else {
                j++;
            }
        }

    } else {
        isMatching = false;
    }

    return isMatching;
}

function createRow(name, value) {
    const newTableRow = document.createElement("TR");
    newTableRow.classList.add("list-table__row");
    listTable.appendChild(newTableRow);

    const newNameCell = document.createElement("TH");
    newNameCell.classList.add("list-table__name-cell");
    newNameCell.textContent = name;
    newTableRow.appendChild(newNameCell);

    const newValueCell = document.createElement("TH");
    newValueCell.classList.add("list-table__value-cell");
    newValueCell.textContent = value;
    newTableRow.appendChild(newValueCell);

    const newButtonCell = document.createElement("TH");
    newNameCell.classList.add("list-table__button-cell");
    newTableRow.appendChild(newButtonCell);

    const deleteCookieButton = document.createElement("BUTTON");
    deleteCookieButton.classList.add("list-table__delete-button");
    deleteCookieButton.textContent = "Удалить";
    newButtonCell.appendChild(deleteCookieButton);

    deleteCookieButton.addEventListener("click", () => {
        newTableRow.remove();
        cookieMap.delete(name);
        console.log(cookieMap);

        document.cookie = `"${name}=; expires=-1"` 

    })
}


addButton.addEventListener('click', () => {
    if (addNameInput.value && addValueInput.value) {

        if (cookieMap.has(addNameInput.value)) {
            alert("Значение куки будет перезаписано");
            cookieMap.delete(addNameInput.value);
        }

        cookieMap.set(addNameInput.value, addValueInput.value);
        console.log(cookieMap);

        document.cookie = `"${addNameInput.value}=${addValueInput.value}"`;
        console.log("сейчас в браузере эти куки: ", document.cookie); 

        filterNameInput.dispatchEvent(emulKeyup);

        addNameInput.value = "";
        addValueInput.value = "";

    } else {
        alert("Введите имя и значение новой куки");
    }
    
});


filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie

    const inputChunk = filterNameInput.value;

    if (inputChunk) {
    
        while (listTable.lastChild) {
            listTable.lastChild.remove();
        }

        for (const cookie of cookieMap) {
            if (isMatching(cookie[0], inputChunk) === true || isMatching(cookie[1], inputChunk) === true) {
                console.log("совпало", cookie, inputChunk);
                createRow(cookie[0], cookie[1]);
            }
        }

    } else {

        while (listTable.lastChild) {
            listTable.lastChild.remove();
        }

        console.log(cookieMap);
        for (const cookie of cookieMap) {
            createRow(cookie[0], cookie[1]);
        }
    }
})