import React from 'react';
import './SortingVisualizer.css';
import {mergeSort} from './SortingAlgorithms.js';

const MIN_ARRAY_VALUE = 5;
const MAX_ARRAY_VALUE = 1000;
const ANIMATIONS_SPEED_MS = 2;
const ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS = ANIMATIONS_SPEED_MS * 2;
const ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS = 1.25;
const NUMBER_OF_ANIMATION_PULSES = 4;

var array_size = 300;
var selectedAlgorithm = 0;
var firstRender = 1;
var functionCalled = false;

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
        if(firstRender != 1){
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
                <div className="nav-bar">
                    <ul>
                        <li><button onClick={() => this.howToUse()}>How To Use Sorting Visualizer</button> </li>
                        <li><button onClick={() => this.sortArray()}>Sort Array</button></li>
                        <li><button>
                            <div>Array Size Slider</div>
                            <span class="spacing"></span>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max= {`${array_size}`}  
                                    step={1}
                                    defaultValue= {`${array_size / (3/2)}`} 
                                    class="slider" 
                                    id="myRange"
                                >
                                </input>
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
            
        );
    }

    howToUse(){

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
                    barOneStyle.height = `${newHeight*0.09}vh`
                }, i * ANIMATIONS_SPEED_MS);
            }
        }

        setTimeout(() => {
            this.sortingCompletedAnimation();
        }, animations.length * ANIMATIONS_SPEED_MS);
    }

    sortingCompletedAnimation(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arrayBars.length; i++){
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = 'lightgreen';
            }, 0.10 * i * (ARRAY_SORT_COMPLETED_ANIMATION_SPEED_MS + ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS));
        }

        let pulse = 0;

        for(let i = 0; i < NUMBER_OF_ANIMATION_PULSES; i++){
            setTimeout(() => {
                for(let i = 0; i < arrayBars.length; i++){
                    arrayBars[i].style.backgroundColor = 'turquoise';
                }
            }, pulse * ANIMATIONS_SPEED_MS * arrayBars.length / 3);
    
            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;
    
            setTimeout(() => {
                for(let i = 0; i < arrayBars.length; i++){
                    arrayBars[i].style.backgroundColor = 'lightgreen';
                }
            }, pulse * ANIMATIONS_SPEED_MS * arrayBars.length / 3);
            
            pulse += ARRAY_COMPLETED_PULSE_ANIMATION_SPEED_MS;
            functionCalled = false;
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  