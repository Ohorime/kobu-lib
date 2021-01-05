'use strict';

class Parent {
    #priv = 50;
    pub = 100;
    constructor() {
        this.#priv = 50;
        this.pub = 100;
    };

    get priv() {
        return this.#priv / 2;
    };

    incrPriv() {
        this.#priv++;
        return this;
    };
};

const child = new Parent();

/**
 * Why use private ?
 * 
 * - For not get property
 * - Most utility of getter
 * - Not modifier property
 * - Force use method for change property
 */

/* GET PROPERTY */

// Working (public)
console.log(child.pub); // -> 100

// Not working (private)
console.log(child.#priv); // Make error

// Working with a getter (private)
console.log(child.priv); // -> 25

/* CHANGE PROPERTY */

// Working (public)
child.pub = 10;
console.log(child.pub); // -> 10

// Not working (private)
child.#priv = 10; // Make error
console.log(child.#priv); // Make error

// Working (private)
console.log(child.incrPriv().priv); // -> 25.5