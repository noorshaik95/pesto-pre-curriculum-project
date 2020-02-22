let dataset = [];
let datasetSize = 5;



const renderData = async (dataset = [], value = 5, sort = false) => {
    for (let i = 0; i < value; i++) {
        insertInDataSet();
    }
    if (sort) {
        dataset = dataset.sort(function (a, b) { return a - b; })
    }
    let mainDiv = document.getElementById("main");
    mainDiv.innerHTML = '';
    let index = 0;
    for (let data of dataset) {
        createElement(data, mainDiv, index);
        index++;
    }
}

const createElement = (number, mainDiv, index) => {
    let element = document.createElement('div');
    element.innerHTML = number;
    element.setAttribute("id", "data" + index)
    element.setAttribute("class", "element");
    mainDiv.appendChild(element)

}


function disableActions() {
    document.getElementById("start-button").disabled = document.getElementById("array-size").disabled = document.getElementById("options").disabled = document.getElementById("search-box").disabled = true;
}

function enableActions() {
    document.getElementById("start-button").disabled = document.getElementById("array-size").disabled = document.getElementById("options").disabled = false;
    if( document.getElementById("options").value === '3' ||  document.getElementById("options").value === '4') {
        document.getElementById("search-box").disabled = false;        
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function insertInDataSet(number = getRandomNumber()) {
    dataset.push(number);
}

let selectionSort = async (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            document.getElementById("data" + min).setAttribute('class', 'selected');
            document.getElementById("data" + j).setAttribute('class', 'compare-element');
            await sleep(1)
            if (arr[min] > arr[j]) {
                document.getElementById("data" + min).setAttribute('class', 'element');
                document.getElementById("data" + j).setAttribute('class', 'selected');
                await sleep(1)
                min = j;
            } else {
                document.getElementById("data" + j).setAttribute('class', 'element');
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            let innerText = document.getElementById("data" + min).innerText;
            document.getElementById("data" + min).innerText = document.getElementById("data" + i).innerText;
            document.getElementById("data" + i).innerText = innerText;
        }
        document.getElementById("data" + min).setAttribute('class', 'element');
    }
    enableActions();
};

let bubbleSort = async (inputArr) => {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        let swapped = false;
        for (let j = 0; j < len; j++) {
            if (j + 1 === len) continue;
            let nextElement = document.getElementById("data" + j);
            let element = document.getElementById("data" + (j + 1));
            element.setAttribute('class', 'selected');
            nextElement.setAttribute('class', 'selected');
            await sleep();

            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                swapped = true;
                let innerText = element.innerText;
                element.innerText = nextElement.innerText;
                nextElement.innerText = innerText;
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
                await sleep(0.5);
            }
            nextElement.setAttribute("class", "element");
            element.setAttribute("class", "element");
        }
        if (!swapped) {
            enableActions();
            break;
        }
    }
    enableActions();
};

function sleep(time = 1) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve() }, time * 1000);
    })
}

async function linearSearch(arr, elToFind) {
    let searchElement = createSearchElement(elToFind);
    for (var i = 0; i < arr.length; i++) {
        let element = document.getElementById("data" + i);
        element.setAttribute('class', 'selected');
        searchElement.style.left = element.offsetLeft + 'px';
        await sleep();
        if (arr[i] == elToFind) {
            foundElement(element)
            enableActions();
            searchElement.innerHTML = '';
            searchElement.setAttribute('class', '');
            return;
        }
        element.setAttribute("class", "element");
    }
    alert("Element Not Found!");    
    enableActions();    
    searchElement.innerHTML = '';
    searchElement.setAttribute('class', '');}

async function binarySearch(sortedArray, elToFind) {
    var lowIndex = 0;
    var highIndex = sortedArray.length - 1;
    let searchElement = createSearchElement(elToFind);
    while (lowIndex <= highIndex) {
        var midIndex = Math.floor((lowIndex + highIndex) / 2);
        let element = document.getElementById("data" + midIndex);
        element.setAttribute('class', 'selected');
        searchElement.style.left = element.offsetLeft + 'px';
        await sleep();
        if (sortedArray[midIndex] == elToFind) {
            foundElement(element)
            enableActions();
            searchElement.innerHTML = '';
            searchElement.setAttribute('class', '');
            return;
        } else if (sortedArray[midIndex] < elToFind) {
            lowIndex = midIndex + 1;
        } else {
            highIndex = midIndex - 1;
        }
        element.setAttribute('class', 'element');        
    }
    alert("Element Not Found!");
    enableActions();
    searchElement.innerHTML = '';
    searchElement.setAttribute('class', '');}

const createSearchElement = function (elToFind) {
    let searchElement = document.getElementById("element");
    searchElement.setAttribute('class', 'finding-element');
    searchElement.innerHTML = elToFind;
    return searchElement;
}

const foundElement = async (element) => {
    element.style.backgroundColor = "green";
    element.style.color = "black";
    element.style.border = "1px solid black";
    await sleep(1);
    element.removeAttribute('style');
    element.setAttribute('class', 'element');
}

function sizeChange(algoValue = '1') {
    let value = document.getElementById("array-size").value;
    dataset = [];
    renderData(dataset, parseInt(value), algoValue === '4')
}

function onAlgorithmChange() {
    let value = document.getElementById("options").value;
    let searchElement = document.getElementById("search-box");
    if (value === '3' || value === '4') {
        searchElement.disabled = false
    } else {
        searchElement.disabled = true
    }
    sizeChange(value);
}

function start() {
    let searchElement = document.getElementById("search-box");
    let value = document.getElementById("options").value;
    disableActions();
    if ((value === '3' || value === '4') && (searchElement.value === '' || !searchElement.value)) {
        alert("Enter Search Element");
        enableActions();
    } else if (value === '1') {
        bubbleSort(dataset)
    } else if (value === '2') {
        selectionSort(dataset)
    } else if (value === '3') {
        linearSearch(dataset, parseInt(searchElement.value))
    } else {
        binarySearch(dataset, parseInt(searchElement.value))        
    }

}

window.onload = () => {
    renderData(dataset);
}