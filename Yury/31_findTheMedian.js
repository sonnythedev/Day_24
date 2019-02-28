/*
    Difficulty: Easy    

    Write an extension to array that accepts an array of Int and returns the median average, or null if there are no values.

    Tip: The mean average is the sum of some numbers divided by how many there are. The median average is the middle of a sorted list. If there is no single middle value – e.g. if there are eight numbers - then the median is the mean of the two middle values.

    Samples:
    [1, 2, 3].solution()          == 2
    [1, 2, 9].solution()          == 2
    [1, 3, 1007, 5, 9].solution() == 5
    [1, 2, 3, 4].solution()       == 2.5
*/

// solution1
Array.prototype.solution1=function(){
    //we need to sort the array
    this.sort((a,b)=>a-b);
    let medianIndex=Math.floor(this.length/2);
    return (this[0]+this[medianIndex])/2;
}
/*
************************* PERFORMANCE TESTS *************************
*/

// import big numbers for test


// test solution1()

let arr=[20,10,11,12,14];
console.log(arr.solution1());


/*
************************* PERFORMANCE RESULTS *************************

*/