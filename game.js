
runApp();

function runApp() {
    alert (`Привет! Добро пожаловать в игромат!`);
    while (true) {
        let numberOfGame = chooseGame();
        if (numberOfGame === null) {
            break;
        }
        alert (`Игра запускается...`);
        startGame(numberOfGame);
    }
    alert(`Пока, пока!`);
}

function chooseGame() {
    let userAnswer = prompt(`
                Выбери игру:
                1 - угадалка;
                2 - считалка;
                3 - кликалка;
                Для выхода введи "выход"
    `);
    switch (userAnswer) {
        case `угадалка`:
        case 1:
            return 1;
        case `считалка`:
        case 2:
            return 2;
        case `кликалка`:
        case 3:
            return 3;
        case `выход`:
            return null;
        default:
            alert(`Не правильный ввод`);
    }
}

function startGame(numberOfGame) {
    switch (numberOfGame) {
        case 1:
            runGuessGame();
            break;
        case 2:
            runCalcGame();
            break;
        case 3:
            runClickGame();
            break;
        default:
            throwGameError();
    }
}

function throwGameError() {
    alert(`Ошибочка!`);
}

function runGuessGame() {
    alert(`Игра "Угадалка"`);
    alert(`
        Я случайным образом загадаю число от 0 до 100.
        Твоя задача его угадать за минимальное количество попыток.
        После каждого твоего ввода я буду говорить больше твое число или меньше загаданого.
        Начнем?
    `)
    let targetNumber = generateRandomNumber (1, 100);
    let attemptCount = 0;
    while (true) {
        attemptCount++;
        let isCorrectAnswer = askGuessGameQuest(targetNumber);
        if (isCorrectAnswer) {
            break;
        }
    };
    alert(`Тебе удалось угадать за ${attemptCount} попыток`)
}

function askGuessGameQuest (targetNumber) {
    while(true) {
        let userAnswer = +prompt(`Попробуй угадать`);
        if (userAnswer === targetNumber) {
            alert (`Угадал`);
            return true;
        }
        if (userAnswer > targetNumber) {
            alert (`Слишком много`);
            return false;
        }
        if (userAnswer < targetNumber) {
            alert (`Слишком мало`);
            return false;
        }
        alert(`Неверный ввод`)
    }
}

function generateRandomNumber(min, max) {
   let constantForFloor = 1;
   let rangeSize = max + constantForFloor - min;
   let randomNumberInRange = Math.random() * rangeSize;
   let randomNumber = min + randomNumberInRange;
   let randomIntegerNumber = Math.floor(randomNumber);
   return randomIntegerNumber;
}

function runCalcGame() {
    alert(`Игра "Считалочка"`);
    alert(`
        Я случайным образом буду давать задание по арифметике.
        Твоя задача правильно решить 5 примеров.
        Начинаем?
    `);
    let CorrectAnswerCount = 0;
    for (let i = 1; i <= 5; i++) {
        let isCorrectAnswer = askCalcGameQuest();
        if (isCorrectAnswer) {
            CorrectAnswerCount++;
        }
    }
    alert(`Правильных ответов: ${CorrectAnswerCount} из 5`);

}


function askCalcGameQuest (minNumber = 0, maxNubmer = 20) {
    let firsNumber = generateRandomNumber (minNumber, maxNubmer);
    let secondNumber = generateRandomNumber (minNumber, maxNubmer);
    let mathAction = generateRandomMathAction();
    let userAnswer = +prompt(`${firsNumber} ${mathAction} ${secondNumber}`);
    let correctAnswer = calcStringMathAction(firsNumber, mathAction, secondNumber);
    let isCorrectAnswer = userAnswer === correctAnswer;
    return isCorrectAnswer;
}

function calcStringMathAction(firsNumber, mathAction, secondNumber) {
    switch(mathAction) {
        case "+":
            return firsNumber + secondNumber;
        case "-":
            return firsNumber - secondNumber;
        case "*":
            return firsNumber * secondNumber;
        default:
            throwGameError();
    }
}

function generateRandomMathAction() {
    let randomNumber = generateRandomNumber(1, 3);
    switch(randomNumber) {
        case 1:
            return "+";
        case 2:
            return "-";
        case 3:
            return "*";
        default:
            throwGameError();
    }
}

function runClickGame() {
    alert(`Игра "Кликалка"`);
    alert(`
        Я случайным образом буду показывать тебе 10 окон.
        Твоя задача как можно скорее прокликать все.
        При этом в окне confirm нужно нажимать "Отмена".
        Начинаем?
    `)

    let errorCount = 0;
    for (let i = 1; i <= 10; i++) {
        let isCorrectAnswer = aksCliclGameQuest();
        if (!isCorrectAnswer) {
            errorCount++;
        }
    }
    alert(`Ошибка ${errorCount}`);
}

function aksCliclGameQuest (percentConfirm = 0.5) {
    let isConfirm = Math.random() < percentConfirm;
    if (isConfirm) {
        let answerConfirm = confirm(`Нажми "Отмена"`);
            return !answerConfirm;
    } else {
        alert(`Просто нажмите"ОК"`);
        return true;
    }
}