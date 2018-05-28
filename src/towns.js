/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const towns = [];
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить, отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', () => {

            if (xhr.status >= 400) {
                console.log("ошибка загрузки с сервера");
                reject("error"); //просто эррор как строка? потом это можно в аргумент?? типа так и делают?
            } else {
                const townsObjArr = JSON.parse(xhr.responseText);
                console.log(townsObjArr);

                for (const townsObj of townsObjArr) {
                    towns.push(townsObj.name);
                }
                console.log(towns);
                towns.sort();
                console.log(towns);
                resolve(towns); // а сюда переменная:/ оч странно
            }
        })
    })
    return promise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    const fullUpperCase = full.toUpperCase();
    const chunkUpperCase = chunk.toUpperCase();

    const fullArr = fullUpperCase.split("");
    const chunkArr = chunkUpperCase.split("");
    console.log(fullArr,chunkArr);
    let isAny = false;
    let isMatching = true;
    let j;

    for (j = 0; j < fullArr.length; j++) {
        if (fullArr[j] === chunkArr[0]) {
            console.log("совпала 1-я буква", fullArr[j],j);
            isAny = true;
            break;
        }
    }

    console.log(isAny, j);
        
    if (isAny == true) {
        for (let i = 0; i < chunkArr.length; i++) {
            if (chunkArr[i] != fullArr[j]) {
                console.log("не совпала буква", chunkArr[i]);
                isMatching = false;
                break;
            } else {
                console.log("совпала буква", chunkArr[i]);
                j++;
            }
        }
    } else {
        isMatching = false;
        console.log("не совпало ни одной буквы", chunk);
    }
    
    console.log(isMatching);
    return isMatching;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');


// const townList = document.createElement("ul");
// townList.classList.add("town__list");
// filterResult.appendChild(townList);


// filterInput.addEventListener('keyup', function() {

//     // for (const elem of townList.children) {
//     //     elem.remove();
//     // }

//     while (townList.lastElementChild) {
//         townList.removeChild(townList.lastElementChild);
//     }



//     const inputChunk = filterInput.value;

//     for (const town of towns) {
//         if (isMatching(town,inputChunk) == true) {
//             const townItem = document.createElement("li");
//             townItem.classList.add("town__item");
//             townItem.textContent = town;
//             townList.appendChild(townItem);
//         }
//     }
// });

export {
    loadTowns,
    isMatching
};
