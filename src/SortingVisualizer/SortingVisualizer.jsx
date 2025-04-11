import React, { useState } from 'react';
import './SortingVisualizer.css';
import {mergeSort} from './SortingAlgorithms.js';

const MIN_ARRAY_VALUE = 5;
const MAX_ARRAY_VALUE = 1000;
const MAX_ARRAY_SIZE = 900;
const ANIMATIONS_SPEED_MS = 3;
const ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS = ANIMATIONS_SPEED_MS * 2;
const ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS = 1.25;
const NUMBER_OF_ANIMATION_PULSES = 4;


var array_size = MAX_ARRAY_SIZE/3;
var selectedAlgorithm = 0;
var firstRender = 1;
var functionCalled = false;
var openPopup = true;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        //When resetting the array the color must be changed to the default state
        if(firstRender !== 1){
            var bars = document.getElementsByClassName('array-bar');
            var defaultBGC = window.getComputedStyle(document.documentElement).getPropertyValue('--default-bar-color');
            for(var bar of bars){
                bar.style.backgroundColor = defaultBGC;   
            }
            
        }
        
        const array = [];
        for(let i = 0; i < array_size; i++){
            array.push(randomIntFromInterval(MIN_ARRAY_VALUE, MAX_ARRAY_VALUE));
        }
        this.setState({array});

        if(functionCalled) {
            window.location.reload();
        }
    }

    render(){
        const {array} = this.state;
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
                            <li><button className='showPopUp' onClick={() => this.togglePopUp()}>How To Use Sorting Visualizer</button> </li>
                            <li><button onClick={() => this.sortArray()}>Sort Array</button></li>
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
                                    max= {MAX_ARRAY_SIZE}
                                    defaultValue={array_size}
                                    step="5" 
                                    onInput={() => this.updatedSlider()}
                                    />
                                    <label>{MAX_ARRAY_SIZE}</label>
                                </button>
                            </li>
                            <li><button onClick={() => this.sortingAlgorithmsChooser()}>Sorting Algorithms</button></li>
                            <li><button onClick={() => this.resetArray()}> Generate New Array</button></li>
                        </ul>
                    </div>
                    <div className="array-container">
                        {array.map((value,idx) => (
                            
                            <div 
                                className = "array-bar" 
                                key={idx}
                                style = {{height: `${value*0.09}vh`, width: `${100/array_size}vw`}}
                            >
                            </div>
                        ))}
                        
                    </div>
                    
                </div>
                
            </div>
            
        );
    }

    togglePopUp(){
        var popUp = document.getElementsByClassName('popUp');
        var backgroundElements = document.getElementsByClassName('hide-content');
        var popUpTextSpan = document.getElementsByClassName('popUpText');
        var popUpText = '<p>You can <span class="emphasisText">choose the number</span> of elements of the array to sort by <span class="emphasisText">using</span> the <span class="emphasisText">Array Slider</span> in the middle, it will display the current array size, as well as the minimum and maximum values allowd on the extremities of the slider.</p>'
        popUpText += '<p>The <span class="emphasisText">Default sorting algorithm</span> used is "<span class="emphasisText">Merge Sort</span>" but a different algorithm can be chosen by pressing the "<span class="emphasisText">Sorting Algorithms</span>" button and choosing the desired one</p>'
        popUpText += '<p>Lastly a new array of values can be generated on the far right by clicking "<span class="emphasisText">Generate New Array</span>"</p><p>To Execute the <span class="emphasisText">Sorting</span> function Simply Click "<span class="emphasisText">Sort Array</span>" and Enjoy the animation!</p>'
        if(!openPopup){
            popUp[0].style.display = 'none';
            backgroundElements[0].style.zIndex = '0';
        }else{
            popUp[0].style.display = 'inline-block';
            
            backgroundElements[0].style.zIndex = '1';
           
            popUpTextSpan[0].innerHTML = popUpText;
        }
        openPopup = !openPopup;
    }

    updatedSlider(){
        var slider = document.getElementById('myRange');
        var value = slider.value;
        array_size = value;
        document.getElementById('myValue').innerHTML = value;
        this.resetArray();
        console.log(array_size);
            
    }

    sortingAlgorithmsChooser(){

    }

    sortArray(){
        functionCalled = true;
        if(selectedAlgorithm === 0){
            this.mergeSort();
        }
    }

    mergeSort(){
        const animations = mergeSort(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATIONS_SPEED_MS);
            }else{
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight*0.09}vh`;
                    

                }, i * ANIMATIONS_SPEED_MS);
            }
        }

        setTimeout(() => {
            this.sortingCompletedAnimation();
        }, (animations.length) * ANIMATIONS_SPEED_MS);
    }

    sortingCompletedAnimation(){
        const arrayBars = document.getElementsByClassName('array-bar');
        const arrayLength = arrayBars.length;
        for(let i = 0; i < arrayLength; i++){
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = 'lightgreen';
            }, i * (ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS + ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS)/10);
        }

        let pulse = 0;

        for(let i = 0; i < NUMBER_OF_ANIMATION_PULSES; i++){
            setTimeout(() => {
                for(let i = 0; i < arrayLength; i++){
                    arrayBars[i].style.backgroundColor = 'turquoise';
                }
            }, arrayLength > 300 ? pulse * ANIMATIONS_SPEED_MS * arrayLength / 3 : pulse * ANIMATIONS_SPEED_MS * arrayLength/1.75);
    
            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;
    
            setTimeout(() => {
                for(let i = 0; i < arrayLength; i++){
                    arrayBars[i].style.backgroundColor = 'lightgreen';
                }
            }, arrayLength > 300 ? pulse * ANIMATIONS_SPEED_MS * arrayLength / 3 : pulse * ANIMATIONS_SPEED_MS * arrayLength/1.75);
            
            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;
            functionCalled = false;
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  