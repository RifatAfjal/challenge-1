const showInput = document.getElementById('showInput');
const dataTable = document.querySelector('#dataTable');
const numbers = document.querySelectorAll('.numbers div');
const makeNumbersArr = [...numbers];


// clear all the number by click allClearBtn;
const allClearBtn = document.getElementById('allClear');
allClearBtn.addEventListener('click', () => {
    showInput.innerText = '';
    makeNumbersArr.map(div => div.classList.remove('changeBG'));
});


// for backSpace (click and remove the last number);
const backSpaceBtn = document.getElementById('backSpace');
backSpaceBtn.addEventListener('click', () => {
    const showText = showInput.innerText;
    showInput.innerText = showText.substr(0,showText.length-1);

    // remove background also;
    const lastNum = showText.slice(-1);
    makeNumbersArr.map(btn => {
        if(btn.innerText === lastNum){
            btn.classList.remove('changeBG')
        }
    })
});


// input number by clicking the number button;
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        const currentBtn = e.target;
        const getNumber = e.target.innerText;
        const showText = showInput.innerText;
        const showTextArr = showText.split('');
        if(currentBtn.classList.contains('changeBG')){
            showInput.innerText = showText.replace(getNumber,'');
        }
        if(showText === ''){
            showInput.innerText = getNumber;
            currentBtn.classList.toggle('changeBG');
        }
        if(showText.length > 0 && showText.length < 16){
            currentBtn.classList.toggle('changeBG');
            if(showTextArr.indexOf(getNumber) == -1){
                showInput.innerText = showText + getNumber;
            }
        }
    });
});


// add submit button functionality;
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {
    const getNumbers = showInput.innerText;
    const numbersArr = getNumbers.split('');
    if(numbersArr.length != 5){
        alert("Dude,you input more or less than five numbers. Your input numbers length must be five.")
    }
    else{
        removeClass();
        const uniqueArr = removeDuplicates(numbersArr);
        // use ternary operator
        (uniqueArr.length === 5) ?
        setData(uniqueArr.join('')) :
        alert('Sorry dude, you have duplicate number');
    }
});


// remove number button backgroundColor class;
removeClass = () => {
    const makeArr = [...numbers];
    makeArr.map(div => {
        if(div.classList.contains('changeBG')){
           div.classList.remove('changeBG');
        }
    })
}

// for remove duplicates from an array
removeDuplicates = (arr) =>{
    return arr.filter((item,index) => arr.indexOf(item) === index)
};


// set data if it fullfil the condition;
setData = (number) => {
    const numberDiv = document.querySelectorAll('.number');
    // covert the nodeList to array
    const Arr = [...numberDiv];
    const divText = Arr.map(item => item.innerText);

    if(numberDiv.length === 0){
        createDiv(number);
    }
    else{
        // use ternary operator
        (divText.indexOf(number) === -1) ? 
        createDiv(number) : 
        alert("Sorry dude, you can't input same number");
    }

    showInput.innerText = '';
}


// add output field for showing the input;
createDiv = (number) => {
    const div = document.createElement('div');
    div.classList.add('number');
    div.innerText = number;
    dataTable.appendChild(div);
}

// input number randomly;
const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click',() => {
    const digitArr = ["1","2","3","4","5","6","7","8","9","0"]
    let generateRandom = Math.ceil(Math.random()*100000);
    const makeArr = generateRandom.toString().split('');
    //remove duplicate;
    const uniqueArr = removeDuplicates(makeArr);
    // get mismatching number;
    const filteredArr = digitArr.filter(item => uniqueArr.indexOf(item) === -1);
    const outputArr = filteredArr.slice(0,5);
    showInput.innerText = outputArr.join('');

    // add background for random numbers button
    for(let i = 0; i < numbers.length; i++){
        numbers[i].classList.remove('changeBG')
        const btnText = numbers[i].innerText;

        for (let j= 0; j < outputArr.length; j++) {
            const element = outputArr[j];
            if(btnText === element){
                numbers[i].classList.add('changeBG');
            }
        }
    }
});

