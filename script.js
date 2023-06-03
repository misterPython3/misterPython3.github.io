'use strict';

import * as util from "./util.js";


const pageBody = document.getElementById("page-body");



const testTree = util.$parse (
    {
        name : "main",
        attr : {
            id : "main",
            style : {
                color : "inherit"
            }
        },
        child : {
            child : [
                {
                name : "div",
                child : [
                    {
                    name : "span",
                    child : "test"
                    },
                    "string",
                    "string"
                ]
                },
                {
                    name : "div",
                    child : "test"
                }
            ]
        },
    }
);
util.$render(pageBody, testTree);
// setTimeout(() => Array.from(pageBody.children).map((child) => pageBody.parentElement.replaceChild(pageBody.cloneNode(), pageBody)), 1000 * 5);