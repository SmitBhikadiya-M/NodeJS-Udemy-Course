const express = require('express');
const supertest = require('supertest');

const add = (a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a < 0 || b < 0){
                reject("Accept only positive numbers");
            }else{
                resolve(a+b);
            }
        },2000);
    });
}

test('Hello World!!!', ()=>{
    expect(13).toBe(13);
});

test('This should fail', ()=>{
    throw new Error('I am failed!!');
});

// test('Async test demo', (done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         done();
//     },2000);
// });

test('Should Add Two Number', (done)=>{
    add(2,3).then((res)=>{
        expect(res).toBe(9);
        done()
    });
});

test('Should add two numbers async/await', async ()=>{
    const sum = await add(10,22);
    expect(sum).toBe(22);
});