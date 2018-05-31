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
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
        
    function compare(a, b) {
        return a.name.localeCompare(b.name);
    }
    
    const promise = fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => {

            return response.json();
        })
        .then(json => {

            return json.sort(compare);
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

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function loadTownsAndDisplay() {
    loadTowns()
        .then(towns => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'initial';
            
            // const townList = document.createElement('ul');
            // townList.classList.add('town__list');
            // filterResult.appendChild(townList);

            filterInput.addEventListener('keyup', function() {

                while (filterResult.lastElementChild) {
                    filterResult.removeChild(filterResult.lastElementChild);
                }

                const inputChunk = filterInput.value;

                for (const town of towns) {
                    if (isMatching(town.name, inputChunk) === true) {
                        const townItem = document.createElement('li');

                        townItem.classList.add('town__item');
                        townItem.textContent = town.name;
                        filterResult.appendChild(townItem);
                    }
                }
            })
        })
        .catch(() => {
            // console.log('ошибка загрузки городов');

            loadingBlock.style.display = 'none';
            const tryAgainBlock = document.createElement('div');

            tryAgainBlock.classList.add('try-again');
            homeworkContainer.appendChild(tryAgainBlock);

            const errorMessage = document.createElement('div');

            errorMessage.classList.add('try-again__message');
            errorMessage.textContent = 'Не удалось загрузить города';
            tryAgainBlock.appendChild(errorMessage);

            const tryAgainButton = document.createElement('button');

            tryAgainButton.classList.add('try-again__button');
            tryAgainButton.textContent = 'Повторить';
            tryAgainBlock.appendChild(tryAgainButton);

            tryAgainButton.addEventListener ('click', () => {
                tryAgainBlock.style.display = 'none';
                loadTownsAndDisplay();
            })
        })  
} 

loadTownsAndDisplay();

export {
    loadTowns,
    isMatching
};
