import React from 'react';
import './SortingVisualizer.css';
import {mergeSort} from './SortingAlgorithms.js';

const MIN_ARRAY_VALUE = 5;
const MAX_ARRAY_VALUE = 1000;
const ANIMATIONS_SPEED_MS = 1;

var array_size = 500;
var firstRender = 1;

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
        const array = [];
        for(let i = 0; i < array_size; i++){
            array.push(randomIntFromInterval(MIN_ARRAY_VALUE, MAX_ARRAY_VALUE));
        }
        this.setState({array});

        //When resetting the array the color must be changed to the default state
        if(firstRender != 1){
            var bars = document.getElementsByClassName('array-bar');
            var defaultBGC = window.getComputedStyle(document.documentElement).getPropertyValue('--default-bar-color');
            for(var bar of bars){
                bar.style.backgroundColor = defaultBGC;   
            }
        }
    }

    render(){
        const {array} = this.state;
        const size = array.length;
        firstRender = 0;
        return (
            <div>
                <div className="nav-bar">
                    <ul>
                        <li> How To Use Sorting Visualizer</li>
                        <li>Sort Array</li>
                        <li>
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
                        </li>
                        <li><button onClick={() => this.mergeSort()}>Sorting Algorithms</button></li>
                        <li><button>Reset Choices</button></li>
                        <li><button onClick={() => this.resetArray()}> Generate New Array</button></li>
                    </ul>
                </div>
                <div className="array-container">
                    {array.map((value,idx) => (
                        
                        <div 
                            className = "array-bar" 
                            key={idx}
                            style = {{height: `${value*0.09}vh`, width: `${100/size}vw`}}
                        >
                        </div>
                    ))}
                    
                </div>
            </div>
            
        );
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
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  