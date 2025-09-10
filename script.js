// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    // Функция для переключения темы
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggleBtn.textContent = '🌞';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Проверяем сохраненную тему при загрузке
    function checkSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggleBtn.textContent = '🌙';
        }
    }
    
    // Находим кнопку переключения темы и добавляем обработчик
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
        checkSavedTheme();
    }
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // Функция для смены знака (+/-)
    function changeSign() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (-parseFloat(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (-parseFloat(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    }
    
    // Функция для вычисления процента (%)
    function calculatePercentage() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                // Для операций вычисляем процент от первого числа
                if (a !== '') {
                    b = (parseFloat(a) * parseFloat(b) / 100).toString();
                    outputElement.innerHTML = b;
                }
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка смены знака (+/-)
    document.getElementById("btn_op_sign").onclick = function() { 
        changeSign()
    }
    
    // кнопка процента (%)
    document.getElementById("btn_op_percent").onclick = function() { 
        calculatePercentage()
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+b) !== 0 ? (+a) / (+b) : 'Error'
                break;
        }
        
        if (expressionResult === 'Error') {
            a = ''
            b = ''
            selectedOperation = null
            outputElement.innerHTML = 'Error'
        } else {
            a = expressionResult.toString()
            b = ''
            selectedOperation = null
            outputElement.innerHTML = a
        }
    }
};