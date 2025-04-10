import React from 'react';
import './SortingVisualizer.css';

const MIN_ARRAY_VALUE = 5;
const MAX_ARRAY_VALUE = 1000;
var array_size = 650;

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
    }

    render(){
        const {array} = this.state;

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
                        <li>Sorting Algorithms</li>
                        <li><button>Reset Choices</button></li>
                        <li><button onClick={() => this.resetArray()}> Generate New Array</button></li>
                    </ul>
                </div>
                <div className="array-container">
                    {array.map((value,idx) => (
                        <div 
                            className = "array-bar" 
                            key={idx}
                            style = {{height: `${value*0.09}vh`, backgroundColor: value > 700 ?`red` : `green`}}
                        >
                        </div>
                    ))}
                    
                </div>
            </div>
            
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  