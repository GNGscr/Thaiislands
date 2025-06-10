"use client";
import Noise from './Noise';
import React, { useRef, useEffect } from "react";
import { m, motion, steps, useScroll, useTransform } from 'framer-motion';

export default function StickyFooter({ data, lang }) {
    const container = useRef();
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    });
    
    // Set the display value to switch by toggle (ease fnc) between flex and none
    const isDisplayed = useTransform(
        scrollYProgress,
        [0, 0.15, 0.25, 0.99, 1],
        ["none", "none", "none", "flex", "flex"],
        { ease: (t) => Math.round(t) }
    );

    useEffect(() => {
    }, [isDisplayed]);

    return (
        <motion.div 
            className="footer fixed bottom-0 z-[-1] w-screen gap-4" 
            style={{ opacity: 0.85, display: isDisplayed  }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            transition={{ duration: 0.1 }}
        >
            <div className="relative h-[300px] w-screen">
                <Noise data={data} lang={lang} />
            </div>
        </motion.div>
    )
}


// function reverse(str) {
//     let reversed = '';
//     // for (let i = 0; i < str.length; i++) {
//     //     reversed = str[i] + reversed; 
//     // }
//     for(let char of str) {
//         reversed = char + reversed; 
//     }
//     // str.split('').reverse().join('');
//     return reversed;
// }
// console.log(reverse('CodeWorks'));

// [..."asdfs"] => ['a', 's', 'd', 'f', 's']





// function reverseInt(n) {
//     const reversed = n.toString().split('').reverse().join('');
//     return parseInt(reversed) * Math.sign(n);
// }
// console.log(reverseInt(-15));






// function palindrome(str) {
//     return str === str.split('').reverse().join('');
// }
// console.log(palindrome('kayak'));






// function maxChar(str) {
//     const scores = {};
//     let max = 0;
//     let maxChar = '';
//     str.split('').map(char => scores[char] = !scores[char] ? 1 : scores[char] + 1);
//     // for(const [key, value] of Object.entries(scores[char])) {
//     //     if (value > max) {
//     //         max = value;
//     //         maxChar = key;
//     //     }
//     // }
//     for(let key in scores) {
//         if (scores[key] > max) {
//             max = scores[key];
//             maxChar = key;
//         }
//     }
//     return maxchar;
// }
// console.log(maxChar('abccccccd'));
// console.log(maxChar('apple 1231111'));






// function chunk(array, size) {
//     const result = [];
//     let index = 0;
//     while(index < array.length) {
//         result.push(array.slice(index, index+size));
//         index += size;
//     }
//     return result;
// }
// console.log(chunk([1, 2, 3, 4], 2)); // [[1,2],[3,4]]
// chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1,2,3],[4,5,6],[7,8]]
// chunk([1, 2, 3, 4, 5], 4); // [[1,2,3,4],[5]]
// chunk([1, 2, 3, 4, 5], 10); // [1,2,3,4,5]]






// function capitalize(str) {
//     // const words = str.split(' ');
//     // const result = [];
//     return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
//     // for (const word of words) {
//     //     result.push(word[0].toUpperCase() + word.slice(1))
//     // }
//     // return result.join(' ');
// }






// no special characters 
// capital letter be considered same as lower case
// function anagrams(stringA, stringB) {
//     function charMap(str) {
//         const charmap = {};
//         str.toLowerCase().replace(/[\W]/g, ''); // \W remove all none words
//         str.split('').forEach((char) => charmap[char] = ++charmap[char] || 1);
//         // for (const char of str) {
//         //     charmap[char] = ++charmap[char] || 1;
//         // }
//         return charmap;
//     }
//     const charMapA = charMap(stringA);
//     const charMapB = charMap(stringB);

//     // copmare
//     if (Object.keys(charMapA).length !== Object.keys(charMapB).length) return false;
//     for (const key in charMapA) {
//         if (charMapA[key] !== charMapB[key]) return false;
//     }
//     return true;
// }

// &&

// function anagrams(stringA, stringB) {
//     // function setStr(str) {
//     //     return str.toLowerCase().replace(/[W]/g, '').split('').sort().join('');
//     // }
//     // const strA = setStr(stringA);
//     // const strB = setStr(stringB);
//     const setStr = (str) => str.toLowerCase().replace(/\W/g, '').split('').sort().join('')
//     return setStr(stringA) === setStr(stringB);
// }
// console.log(anagrams("coding shit", "shit coding")); // --> true
// // console.log(anagrams("RAIL! SAFETY!", "fairy tales")); // --> true
// // console.log(anagrams("Hi there!", "Bye there")); // --> false







// write a function that returns the number of vowels seed in a string . Vowels are che chars aeiou
// function vowels(str) {
//     // const matches = str.match(/[aeiou]/gi);
//     // return matches ? matches.length : 0;
//     const vowelCheck = ['a', 'e', 'i', 'o', 'u'];
//     let count = 0;
//     for (const char of str.toLowerCase()) {
//        if (vowelCheck.includes(char)) count++;
//     }
//     return count;
// }
// console.log(vowels('Hi There!')); // --> 3
// console.log(vowels('How are you?')); // --> 5
// console.log(vowels('Coding Monkey')); // --> 4
// console.log(vowels('Why?')); // --> 0







// Write a program that console log hte numbers from 1 to n.
// But for multiples of three print "fizz" and for multiple of five print "buzz".
// For numbers which are multiples of both three and five print "fizzbuzz".
// ---- Example:
// fizzBuzz(5);
// 1
// 2
// fizz
// 4
// buzz

// function fizzBuzz(n) {
//     const isDivided = (idx, num) => idx % num === 0;
//     for (let i=1; i <=n; i++) {
//         if(isDivided(i, 3) && isDivided(i, 5)) console.log("fizzbuzz");
//         else if (isDivided(i, 3)) console.log("fizz");
//         else if (isDivided(i, 5)) console.log("buzz");
//         else console.log(i);
//     }   
// }
// console.log(fizzBuzz(20));









// Write a function that accepts a positive number N.
// The function should console log a step shape 
// with N levels using the # character. (pound symbol) 
// Make sure the step has spaces on the right hand side!
// ----- Examples:
// steps(2)
// '# '
// '##'
// steps(3)
// '#  '
// '## '
// '###'
// steps(4)
// '#   '
// '##  '
// '### '
// '####'

// ------------------------------
//         WHITE BORARD          |
// ------------------------------
//     r   1      2       3      |
//   c   c=1 r=1                 |
//   1     #                     |
//      c=1<r=2 c=2=r=2          |
//   2     #      #              |
//      c=1<r=3 c=2<r=3 c=3=r=3  |
//   3     #      #       #      |
//                               |
// ------------------------------

// conclusion - the logic statement (col <= row) is valid '#' else return empty string -> ' '

// function steps(n) {
//     for (let row = 1; row <= n; row++) {
//         let line = '';
//         for (let col = 1; col <= n; col++) {  
//             line += col <= row ? '#' : ' ';
//         }
//         console.log(line);
//     }
// }
// steps(3)
// steps(20)







// Write a function that accepts a positive number N.
// The function should console log a step shape 
// with N levels using the # character. (pound symbol) 
// Make sure the step has spaces on the right hand side!
// ----- Examples:
// pyramid(1)
// '#'
// pyramid(2)
// ' # '
// '###'
// pyramid(3)
// '  #  '
// ' ### '
// '#####'

// ------------------------------
//         WHITE BORARD          |              #
// ------------------------------              ###
//     r   1      2       3     4     5  |
//   c   c=1 r=1                 |
//   1                    #      |              #
//      c=1<r=2 c=2=r=2          |             ###
//   2           #        #     #        |    #####
//      c=1<r=3 c=2<r=3 c=3=r=3  |
//   3     #     #        #     #     #       |
//                               |
// ------------------------------
// rows = n
// cols = 2n - 1

// Math.ceil((2*n -1)/2) // ceil and not floor so it wont miss the first char

// function pyramid(n) {
//     const mid = Math.ceil((2*n-1)/2);
//     for (let row =0; row < n; row++) {
//         let line = '';
//         for (let col = 0; col<2*n-1; col++) {  
//             line += (col >= mid - row && col <= mid + row) ? '#' : ' ';
//         }
//         console.log(line);
//     }
// }
// pyramid(3)







// Write a function that accepts an integer N.
// and returns a N*N spiral matrix 
// ---- Examples:
// matrix(2)
// [[1,2],
// [4,3]]
// matrix(3)
// [[1,2,3],
// [8,9,4],
// [7,6,5]]
// matrix(4)
// [[1 ,2, 3,4],
// [12,13,14,5],
// [11,16,15,6],
// [10, 9, 8,7]]

// function matrix(n) {
//     const result = [];
//     let counter = 1, startRow = 0, endRow = n-1, startCol = 0, endCol = n-1;
//     for (let i = 0; i < n; i++) {
//         result.push([])
//     }
//     while(startRow<=endRow && startCol<=endCol) {
        
//         // Top
//         for (let i = startCol; i <= endCol; i++) {
//             result[startRow][i] = counter;
//             counter++;
//         }
//         startRow++;

//         // Right
//         for (let i = startRow; i <= endRow; i++) {
//             result[i][endCol] = counter;
//             counter++;
//         }
//         endCol--;

//         // Bottom
//         for (let i = endCol; i >= startCol; i--) {
//             result[endRow][i] = counter;
//             counter++;
//         }
//         endRow--;

//         // Left
//         for (let i = endRow; i >= startRow; i--) {
//             result[i][startCol] = counter;
//             counter++;
//         }
//         startCol++;
//         }


//     return result;
// }

// matrix(4);




// html {
//     overflow: hiddn;
//     overflow-x: scroll;
// }

// .wrapper {
//     display: flex;
//     flex-direction: column;
//     overflow: hidden;
//     transition: .4s ease-in-out;
//     margin-left: -380px;
// }


// const newResultData = (result) => {
//     result.filter(item => item.type === 'newUser');
// }
// let newData = [];
// const wrapper = document.querySelector('.wrapper');
// const button = document.querySelector('button');
// const sayHiSvg = document.querySelector('svg');
// const subHeader = document.querySelector('.sub-header');
// const noUsers = document.querySelector('.no-users');
// const noUser = document.querySelector('#no-user');

// let calculateWidth = results.length/3;

// if (newData.length === 0) {
//     result.map(card => {
//         newData.push(card);
//         newData = [...newData];
//     });
// }

// newData = [...newData];

// if (newData.length < 4) {
//     wrapper.style = 'width: 100%; margin-left: 0; display: none';
// }

// if (newData.length === 4) {
//     wrapper.style = 'width: 135%; margin-left: 0';
// }

// const renderUi = (newData) => {
//     wrapper.innerHTML = '';
//     newData.map(c => {
//         let card = document.createElement('div').classList.add('new-user');
//         let avatar = document.createElement('div').classList.add('new-user');
//         let img = document.createElement('img');
//         img.src = c.photoUrl;
//         avatar.appendChild(img);
//         card.appendChild(avatar);
//         wrapper.appendChild(card);
//     });
// }
// renderUi(newData);

// let buttonRight = document.createElement('div').classList.add('left-button').textContext = '<';

// if (newData.length === 1) {
//     buttonRight.style.display='none';
// }

// const rigtBtnClick = () => {
//     if (newData.length === 4) {
//         wrapper.style = 'transform: translateX(-380px)';
//         setTimeout(() => {
//             wrapper.style = 'transform: translateX(0px)';
//             let item = newData.shift();
//             newData.push(item);
//             newData = [...newData];
//             renderUi(newData);
//         }, 400);
//     }
// }
// const leftBtnClick = () => {
//     if (newData.length === 4) {
//         wrapper.style = 'transform: translateX(380px)';
//         setTimeout(() => {
//             wrapper.style = 'transform: translateX(0px)';
//             let item = newData.pop();
//             newData.unshift(item);
//             newData = [...newData];
//             renderUi(newData);
//         }, 400);
//     }
// }

// buttons.appendChild(leftButton)