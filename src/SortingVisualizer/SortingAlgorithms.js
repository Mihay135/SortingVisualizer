export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
}



export function heapSort(array) {
    let workArray = array.slice();
    const n = array.length;
    let animations = [];
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(workArray, n, i, animations);
    }

    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i, workArray[0], workArray[i]]);
        [workArray[0], workArray[i]] = [workArray[i], workArray[0]];
        heapify(workArray, i, 0, animations);
    }
    return animations;
}

export function quickSort(arr) {
    //Stack for storing start and end index
    let stack = [];
    let animations = [];
    let workArray = arr.slice();
    //Get the start and end index
    let start = 0;
    let end = arr.length - 1;

    //Push start and end index in the stack
    stack.push({ x: start, y: end });

    //Iterate the stack
    while (stack.length) {
        //Get the start and end from the stack
        const { x, y } = stack.shift();

        //Partition the array along the pivot
        const PI = quickSortPartitionHigh(workArray, x, y, animations);

        //Push sub array with less elements than pivot into the stack
        if (PI - 1 > x) {
            stack.push({ x: x, y: PI - 1 });
        }

        //Push sub array with greater elements than pivot into the stack
        if (PI + 1 < y) {
            stack.push({ x: PI + 1, y: y });
        }
    }
    return animations;
}

function swap(arr, left, right) {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp;
}

function quickSortPartitionHigh(arr, low, high, animations) {
    //Pick the first element as pivot
    let pivot = arr[high];
    let i = low;
    animations.push([high, pivot]);
    //Partition the array into two parts using the pivot
    for (let j = low; j < high; j++) {

        if (arr[j] <= pivot) {
            animations.push([i, j, arr[j], arr[i]]);
            swap(arr, i, j);
            i++;
        }
    }

    animations.push([i, high, arr[high], arr[i]]);
    swap(arr, i, high);

    //Return the pivot index
    return i;
}


function heapify(array, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
        animations.push([i, largest, array[largest], array[i]]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }

}

export function bubbleSort(array) {
    const animations = [];
    let swapped;
    let auxilaryArray = array.slice();
    let last = auxilaryArray.length - 1;
    do {
        swapped = false;
        for (let i = 0; i < last; i++) {

            animations.push([i, i + 1]);
            animations.push([i, i + 1]);

            if (auxilaryArray[i] > auxilaryArray[i + 1]) {
                let tmp = auxilaryArray[i];
                auxilaryArray[i] = auxilaryArray[i + 1];
                auxilaryArray[i + 1] = tmp;
                swapped = true;
                animations.push([i, auxilaryArray[i], i + 1, auxilaryArray[i + 1]]);

            } else {
                animations.push(null);
            }
        }
        last--;
    } while (swapped);


    return animations;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxilaryArray,
    animations,
) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxilaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIndex + 1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxilaryArray, animations)
}

function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxilaryArray,
    animations,
) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIndex) {
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxilaryArray[i] <= auxilaryArray[j]) {
            animations.push([k, auxilaryArray[i]]);
            mainArray[k++] = auxilaryArray[i++];
        } else {
            animations.push([k, auxilaryArray[j]]);
            mainArray[k++] = auxilaryArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }

}