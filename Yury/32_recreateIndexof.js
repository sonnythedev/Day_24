/*
    Difficulty: Easy    

    Write an extension for array that reimplements the indexOf method.

    Tip: This is one of the easiest standard library methods to reimplement, so please give it an especially good try before reading any hints.

    Samples:
    [1, 2, 3].solution(1) == 0
    [1, 2, 3].solution(3) == 2
    [1, 2, 3].solution(5) == null
*/

// solution1
Array.prototype.solution1=function(num){
      for(let i=0; i<this.length; i++){
          if(this[i]==num){
              return i;
          }
      }
      return -1;
}

// solution2
Array.prototype.solution2=function(num){
    for(let i in this){
        if(this[i]==num){
            return i;
        }
    }
    return -1;
}

// solution3
Array.prototype.solution3=function(num){
    if(!this.includes(num)) return null;
    
}


/*
************************* PERFORMANCE TESTS *************************
*/

// import big numbers for test


// test solution1()
let arr=[1,2,3,4,5];
console.log(arr.solution1(4));
console.log(arr.solution2(6));


// test solution2()


/*
************************* PERFORMANCE RESULTS *************************

*/