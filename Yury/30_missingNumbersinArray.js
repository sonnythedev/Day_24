/*
    Difficulty: Easy    

    Extend arrays with a function that accepts an array of numbers from 0 to 100 where zero or more numbers might be missing, and returns an array of the missing numbers.

    Samples:
    let arr = [...Array(101).keys()];
    arr.splice(35, 1);
    arr.splice(20, 1);
    arr.splice(7, 1);
    arr.solution() == [8, 21, 36];
*/

// solution1

Array.prototype.solution1=function(){
    //console.log(this);
    let missing=[];
    let setArr=[...new Array(101).keys()];
    //console.log(setArr);
    for(let i of setArr){
        if(!this.includes(i)){
            missing.push(i);
        }
    }
    return missing;
}

let arr=[...new Array(101).keys()];
arr.splice(25,1);
arr.splice(50,1);
//console.log(arr);
console.log(arr.solution1());


// solution2


// solution3


/*
************************* PERFORMANCE TESTS *************************
*/

// import big numbers for test


// test solution1()


// test solution2()


// test solution3()


/*
************************* PERFORMANCE RESULTS *************************

*/