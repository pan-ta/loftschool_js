/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn (array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const newArr = [];

    for (let i = 0; i < array.length; i++) { 
        newArr.push (fn (array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let previousValue, currentItem, firstIndex;

    if (initial === undefined) {
        previousValue = array [0];
        firstIndex = 1;
    } else {
        previousValue = initial;
        firstIndex = 0;
    }

    for (let i = firstIndex; i < array.length; i++) {
        currentItem = array [i];
        previousValue = fn(previousValue, currentItem, i, array);
    }

    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    
    // return Object.keys(obj).map(function(item) {
    //     return item.toUpperCase();
    // })

    // const upperProps = (obj) => Object.keys().map((item) => item.toUpperCase());
    // return upperProps;

    return Object.keys(obj).map((item) => item.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from, to) {
    if (to === undefined && from === undefined) {
        return array;
    }

    const newArr = [];
    let From;
    let To;
    
    if (to === undefined) {
        To = array.length;
    } else if (to < 0) {
        To = array.length + to;
    } else if (to > array.length) {
        To = array.length;
    } else {
        To = to;
    }

    if (from === undefined) {
        From = 0;
    } else if (from < 0) {
        if (-from > array.length) {
            From = 0;
        } else {
            From = array.length + from;
        }
    } else {
        From = from;
    }

    for (let i = From; i < To; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value**2;

            return true;
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
