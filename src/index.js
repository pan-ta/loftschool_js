/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом 'empty array')
   - fn не является функцией (с текстом 'fn is not a function')

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */

function isAllTrue(array, fn) {
    if (Array.isArray(array) == false || array.length == 0) {
        throw new Error ('empty array');
    } else if (typeof fn != 'function') {
        throw new Error ('fn is not a function');
    } else {
        let isTrue = true; 

        for (let i=0; i < array.length; i++) {
            if (fn(array[i]) == false) {
                isTrue = false;
                break;
            } 
        }

        return isTrue;
    }
}

// try {
//     console.log (isAllTrue(myArr, fn));
// } catch(e) {
//     console.log (e.message);
// }

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом 'empty array')
   - fn не является функцией (с текстом 'fn is not a function')

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */

function isSomeTrue(array, fn) {
    if (Array.isArray(array) == false || array.length == 0) {
        throw new Error ('empty array');
    } else if (typeof fn != 'function') {
        throw new Error ('fn is not a function');
    } else {
        let isTrue = false;

        for (let i=0; i < array.length; i++) {
            if (fn(array[i]) == true) {
                isTrue = true;
                break;
            } 
        }

        return isTrue;
    }
}

// try {
//     console.log (isSomeTrue(myArr, fn));
// } catch(e) {
//     console.log (e.message);
// }

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом 'fn is not a function')
 */

function returnBadArguments(fn, ...args) {
    if (typeof fn != 'function') {
        throw new Error ('fn is not a function');
    } else {
        let BadArgumentsArr = [];

        for (let i=0; i < args.length; i++) {
            try {
                fn(args[i]);
            } catch (e) {
                // console.log (e.message);
                BadArgumentsArr.push (args[i]);
            }
        }

        return BadArgumentsArr;
    }
}

// try {
//     console.log (returnBadArguments(myFunctionNumbers, 5, 25, 0, 0, 6));
// } catch(e) {
//     console.log (e.message);
// }

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом 'number is not a number')
   - какой-либо из аргументов div является нулем (с текстом 'division by 0')
 */

function calculator(number=0) {
    if (typeof number != 'number') {
        throw new Error ('number is not a number');
    } else {

        return {
            objNumber: number,
            sum: function() {
                let result = number;

                for (let i=0; i < arguments.length; i++) {
                    result = result + arguments[i];
                }
                
                return result;
            },
            dif: function() {
                let result = number;

                for (let i=0; i < arguments.length; i++) {
                    result = result - arguments[i];
                }

                return result;
            },
            div: function() {
                let result = number;

                for (let i=0; i < arguments.length; i++) {
                    if (arguments[i] == 0) {
                        throw new Error ('division by 0');
                    } else {
                        result = result / arguments[i];
                    }
                }

                return result;
            },
            mul: function() {
                let result = number;
                
                for (let i=0; i < arguments.length; i++) {
                    result = result * arguments[i];
                }

                return result;
            },
        }
    }    
}

// try {
//     console.log (calculator(5).sum(2,10));
//     console.log (calculator(7).dif(2,17));
//     console.log (calculator(40).div(2,8));
//     console.log (calculator(7).mul(2,20));
//     console.log (calculator('ghb').mul(2,20));
// } catch(e) {
//     console.log (e.message);
// }

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
