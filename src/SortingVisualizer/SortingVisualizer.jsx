import React, { useState } from 'react';
import './SortingVisualizer.css';
import { mergeSort } from './SortingAlgorithms.js';
import { bubbleSort } from './SortingAlgorithms.js';
import { heapSort } from './SortingAlgorithms.js';

const MIN_ARRAY_VALUE = 5;
const MAX_ARRAY_VALUE = 1000;
const MAX_ARRAY_SIZE = 900;
const ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS = ANIMATIONS_SPEED_MS * 2;
const ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS = 1.25;
const NUMBER_OF_ANIMATION_PULSES = 3;

var array_size = MAX_ARRAY_SIZE / (9/2);
var ANIMATIONS_SPEED_MS = (8 / 3) * (MAX_ARRAY_SIZE / array_size);

var selectedAlgorithm = 0;
var firstRender = 1;
var functionCalled = false;
var openPopup = true;
var isSorted = false;
var animations = [];

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        isSorted = false;
        //When resetting the array (firstRender !== 1) the color must be changed to the default state
        if (firstRender !== 1) {
            var bars = document.getElementsByClassName('array-bar');
            var defaultBGC = window.getComputedStyle(document.documentElement).getPropertyValue('--default-bar-color');
            for (var bar of bars) {
                bar.style.backgroundColor = defaultBGC;
            }
        }

        const array = [];
        for (let i = 0; i < array_size; i++) {
            array.push(randomIntFromInterval(MIN_ARRAY_VALUE, MAX_ARRAY_VALUE));
        }
        this.setState({ array });
        this.updateAnimationSpeed();

        if (functionCalled) {
            window.location.reload();
        }
    }

    render() {
        const { array } = this.state;
        firstRender = 0;
        return (
            <div>
                <div className='popUp'>
                    <div className='popUpContent'>
                        <span className='popUpTitle'><b>Sorting Visualizer: </b><span className='emphasisText'>How to Use</span></span>
                        <button class="closePopup" onClick={() => this.togglePopUp()}><span>X</span></button>
                        <span className='popUpText'></span>
                        <button className='popUpAccept' onClick={() => this.togglePopUp()}>I understand</button>
                    </div>
                </div>
                <div class='hide-content'></div>
                <div className='content'>
                    <div className="nav-bar">
                        <ul>
                            <li><button id="howToUseBtn" className='showPopUp' onClick={() => this.togglePopUp()}>How To Use Sorting Visualizer</button> </li>
                            <li><button id='sortArrayBtn' onClick={() => this.sortArray()}>Sort Array</button></li>
                            <li><button>
                                <div className='sliderDiv'>
                                    Current Array Size:  <span id="myValue" defaultValue={array_size}>{array_size}</span>
                                </div>
                                <label>10</label>
                                <input
                                    type="range"
                                    id="myRange"
                                    class="slider"
                                    min="10"
                                    max={MAX_ARRAY_SIZE}
                                    defaultValue={array_size}
                                    step="5"
                                    onInput={() => this.updatedSlider()}
                                    onMouseOver={() => this.sliderHover()}
                                />
                                <label>{MAX_ARRAY_SIZE}</label>
                            </button>
                            </li>
                            <li><button id="generateNewArrayBtn" onClick={() => this.resetArray()}> Generate New Array</button></li>
                            <li>
                                <div class="drop-wrapper">
                                    <button id="sortingAlgorithmsDropdownBtn" className='btn' data-target="dropright" onClick={() => this.dropMenu(1)}>Sorting Algorithms</button>
                                    <div className="btn dropright-content-menu dropright inactive" id="dropright">
                                        <button className='btn inactive' onClick={() => this.sortingAlgorithmsChooser(0)}>Merge Sort</button>
                                        <button className='btn inactive' onClick={() => this.sortingAlgorithmsChooser(1)}>Quick Sort</button>
                                        <button className='btn inactive' onClick={() => this.sortingAlgorithmsChooser(2)}>Heap Sort</button>
                                        <button className='btn inactive' onClick={() => this.sortingAlgorithmsChooser(3)}>Bubble Sort</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="array-container">
                        {
                            array.map((value, idx) => (
                                <div
                                    className="array-bar"
                                    key={idx}
                                    style={{ height: `${value * 0.09}vh`, width: `${100 / array_size}vw` }}
                                >
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>

        );
    }

    togglePopUp() {
        var popUp = document.getElementsByClassName('popUp');
        var backgroundElements = document.getElementsByClassName('hide-content');
        var popUpTextSpan = document.getElementsByClassName('popUpText');
        var popUpText = '<p>You can <span class="emphasisText">choose the number</span> of elements of the array to sort by <span class="emphasisText">using</span> the <span class="emphasisText">Array Slider</span> in the middle, it will display the current array size, as well as the minimum and maximum values allowd on the extremities of the slider. (Values in the array are randomly generated from 5 to 1000)</p>'
        popUpText += '<p>The <span class="emphasisText">Default sorting algorithm</span> used is "<span class="emphasisText">Merge Sort</span>" but a different algorithm can be chosen by pressing the "<span class="emphasisText">Sorting Algorithms</span>" button and choosing the desired one.</p>'
        popUpText += '<p>Lastly a new array of values can be generated on the far right by clicking "<span class="emphasisText">Generate New Array"</span> which also refreshes the page if you wish to interrupt the current animation.</br> (Note that the <span class="emphasisText">animation speed does not reflect the sorting speed on lower array sizes</span>  as it is slowed down for a better viewing experience)<br/>It is also advised to use <span class="emphasisText">"Bubble Sort"</span> on small arrays as it has a time <span class="emphasisText">complexity O(n<sup>2</sup>)</span>.</p><p>To Execute the <span class="emphasisText">Sorting</span> function Simply Click "<span class="emphasisText">Sort Array</span>" and Enjoy the animation!</p>'
        if (!openPopup) {
            popUp[0].style.display = 'none';
            backgroundElements[0].style.zIndex = '0';
        } else {
            popUp[0].style.display = 'inline-block';

            backgroundElements[0].style.zIndex = '1';

            popUpTextSpan[0].innerHTML = popUpText;
        }
        openPopup = !openPopup;
    }

    updatedSlider() {
        var slider = document.getElementById('myRange');
        var value = slider.value;
        array_size = value;
        document.getElementById('myValue').innerHTML = value;
        this.resetArray();
    }

    sliderHover() {
        var slider = document.getElementById('myRange');
        slider.disabled = functionCalled;
    }

    sortingAlgorithmsChooser(algorithm) {
        this.dropMenu(selectedAlgorithm);

        selectedAlgorithm = algorithm;
    }

    dropMenu(previous) {
        const buttons = document.getElementsByClassName('btn');
        for (const btn of buttons) {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            } else if (btn.classList.contains('inactive')) {
                btn.classList.remove('inactive');
                btn.classList.add('active');
            }

        }
        window.onclick = (e) => {
            if (!e.target.matches('button')) {
                for (const btn of buttons) {
                    if (btn.id === 'sortingAlgorithmsDropdownBtn') continue;
                    btn.classList.remove('active');
                    btn.classList.add('inactive');
                }
            }
        };

    }

    updateAnimationSpeed() {
        ANIMATIONS_SPEED_MS = (2 / 3) * (MAX_ARRAY_SIZE / array_size);
    }

    sortArray() {
        functionCalled = true;
        this.sliderHover();
        switch (selectedAlgorithm) {
            case 0:
                this.mergeSort();
                break;
            case 1:
                this.quickSort();
                break;
            case 2:
                this.heapSort();
                break;
            case 3:
                this.bubbleSort();
                break;
            default:
                this.mergeSort();
        }
    }

    mergeSort() {
        if (!isSorted) {
            animations = mergeSort(this.state.array);
            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0; i < animations.length; i++) {
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneIndex, barTwoIndex] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    const color = i % 3 === 0 ? 'red' : 'turquoise';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * ANIMATIONS_SPEED_MS);
                } else {
                    setTimeout(() => {
                        const [barOneIndex, newHeight] = animations[i];
                        const barOne = arrayBars[barOneIndex];
                        const barOneStyle = barOne.style;
                        barOneStyle.height = `${newHeight * 0.09}vh`;
                    }, i * ANIMATIONS_SPEED_MS);
                }
            }
            setTimeout(() => {
                isSorted = true;
                this.sortingCompletedAnimation();
            }, (animations.length) * ANIMATIONS_SPEED_MS);
        } else {
            setTimeout(() => {
                this.sortingCompletedAnimation();
            }, ANIMATIONS_SPEED_MS);
        }
    }

    quickSort() {

    }

    heapSort() {
        if(!isSorted){
            animations = heapSort(this.state.array);
            console.log(animations);
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let i = 0; i < animations.length; i++){
                const barOneIndex = animations[i][0];
                const barTwoIndex = animations[i][1];
                const barOneValue = animations[i][2];
                const barTwoValue = animations[i][3];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                for(let j = 0; j <= 4; j++){
                    if(j !== 4){
                        const color = j % 3 === 0 ? 'red' : 'turquoise';
                        setTimeout(() => {
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color;
                        }, ((j+2*i) * ANIMATIONS_SPEED_MS));
                    }else{
                        setTimeout(() => {
                            barOneStyle.height = `${barTwoValue * 0.09}vh`;
                            barOneStyle.backgroundColor = 'turquoise';
                        }, ((j+2*i) * ANIMATIONS_SPEED_MS));
                        setTimeout(() => {
                            barTwoStyle.height = `${barOneValue * 0.09}vh`;
                            barTwoStyle.backgroundColor = 'turquoise';
                        }, ((j+2*i + 1) * ANIMATIONS_SPEED_MS));
                    }
                }
            }
            setTimeout(() => {
                isSorted = true;
                this.sortingCompletedAnimation();
            }, ((2*animations.length + 2) * ANIMATIONS_SPEED_MS));
        }else{
            setTimeout(() => {
                this.sortingCompletedAnimation();
            }, (ANIMATIONS_SPEED_MS));
        }
    }

    bubbleSort() {
        if (!isSorted) {
            animations = bubbleSort(this.state.array);
            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0; i < animations.length; i++) {
                const isColorChange = i % 3 !== 2;
                if (isColorChange && animations[i] !== null) {
                    const [barOneIndex, barTwoIndex] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    const color = i % 3 === 0 ? 'red' : 'turquoise';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, (i * ANIMATIONS_SPEED_MS));

                } else {
                    if (animations[i] !== null && animations[i] !== 'undefined') {
                        const [barOneIndex, barOneValue, barTwoIndex, barTwoValue] = animations[i];
                        console.log(animations[i]);
                        setTimeout(() => {
                            const barOne = arrayBars[barOneIndex];
                            const barTwo = arrayBars[barTwoIndex];
                            barOne.style.height = `${barOneValue * 0.09}vh`;
                            barOne.style.backgroundColor = 'turquoise';
                            barTwo.style.height = `${barTwoValue * 0.09}vh`;
                            barTwo.style.backgroundColor = 'turquoise';
                        }, (i * ANIMATIONS_SPEED_MS));
                    }
                }
            }
            setTimeout(() => {
                isSorted = true;
                this.sortingCompletedAnimation();
            }, ((animations.length) * ANIMATIONS_SPEED_MS));
        } else {
            setTimeout(() => {
                this.sortingCompletedAnimation();
            }, (ANIMATIONS_SPEED_MS));
        }
    }

    sortingCompletedAnimation() {
        const arrayBars = document.getElementsByClassName('array-bar');
        const arrayLength = array_size;
        for (let i = 0; i < arrayLength; i++) {
            setTimeout(() => {
                functionCalled = true;
                arrayBars[i].style.backgroundColor = 'lightgreen';
            }, i * (ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS + ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS));
        }

        let pulse = 0;

        for (let i = 0; i < NUMBER_OF_ANIMATION_PULSES; i++) {
            setTimeout(() => {
                for (let i = 0; i < arrayLength; i++) {
                    arrayBars[i].style.backgroundColor = 'turquoise';
                }
            }, arrayLength > 300 ? pulse * ANIMATIONS_SPEED_MS * arrayLength / 3 : pulse * ANIMATIONS_SPEED_MS * arrayLength / 1.75);

            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;

            setTimeout(() => {
                for (let i = 0; i < arrayLength; i++) {
                    arrayBars[i].style.backgroundColor = 'lightgreen';
                }
            }, arrayLength > 300 ? pulse * ANIMATIONS_SPEED_MS * arrayLength / 3 : pulse * ANIMATIONS_SPEED_MS * arrayLength / 1.75);

            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;
        }

        setTimeout(() => {
            functionCalled = false;
            this.sliderHover();
        }, arrayLength > 300 ? pulse * ANIMATIONS_SPEED_MS * arrayLength / 3 : pulse * ANIMATIONS_SPEED_MS * arrayLength / 1.75);
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
