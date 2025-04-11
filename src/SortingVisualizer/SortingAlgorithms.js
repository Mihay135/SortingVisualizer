export function mergeSort(array){
    const animations = [];
    if(array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxilaryArray,
    animations,
)
{
    if(startIndex === endIndex) return;
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
)
{
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    while(i <= middleIndex && j <= endIndex){
        animations.push([i,j]);
        animations.push([i,j]);
        
        if(auxilaryArray[i] <= auxilaryArray[j]){
            animations.push([k, auxilaryArray[i]]);
            mainArray[k++] = auxilaryArray[i++];
        }else{
            animations.push([k, auxilaryArray[j]]);
            mainArray[k++] = auxilaryArray[j++];
        }
    }

    while(i <= middleIndex){
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }
    while(j <= endIndex){
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }

}