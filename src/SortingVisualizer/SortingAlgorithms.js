export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
}

export function quickSort(array) {
    quickSortHelper(array, 0, array.length - 1);
    return array;
}

export function heapSort(array){
    let workArray = array.slice();
    const n = array.length;
    let animations = [];
    for(let i = Math.floor(n / 2) - 1; i >= 0; i--){
        heapify(workArray, n, i, animations);
    }

    for(let i = n - 1; i > 0; i--){
        animations.push([0, i, workArray[0], workArray[i]]);
        [workArray[0], workArray[i]] = [workArray[i], workArray[0]];
        heapify(workArray, i, 0, animations);
    }
    console.log(workArray);
    return animations;
}

function heapify(array, n, i, animations){
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if(left < n && array[left] > array[largest]) largest = left;
    if(right < n && array[right] > array[largest]) largest = right;
    
    if(largest !== i){
        animations.push([i, largest, array[largest], array[i]]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }

}   

function quickSortHelper(array, startIndex, endIndex) {
    if (startIndex >= endIndex) return;
    var pivotIndex = startIndex
    var leftIndex = startIndex + 1
    var rightIndex = endIndex
    while (rightIndex >= leftIndex) {
        if (array[leftIndex] > array[pivotIndex] && array[rightIndex] < array[pivotIndex]) {
            array[leftIndex] = array[rightIndex];
            array[rightIndex] = array[leftIndex];
        }
        if (array[leftIndex] <= array[pivotIndex]) {
            leftIndex += 1;
        }
        if (array[rightIndex] >= array[pivotIndex]) {
            rightIndex -= 1;
        }
    }
    array[rightIndex] = array[pivotIndex];
    array[pivotIndex] = array[rightIndex]
    var leftSubArrayIsSmaller = rightIndex - 1 - startIndex < endIndex - (rightIndex + 1)
    if (leftSubArrayIsSmaller) {
        quickSortHelper(array, startIndex, rightIndex - 1);
        quickSortHelper(array, rightIndex + 1, endIndex);
    } else {
        quickSortHelper(array, rightIndex + 1, endIndex);
        quickSortHelper(array, startIndex, rightIndex - 1);
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