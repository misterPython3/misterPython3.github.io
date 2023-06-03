'use strict';


const firstWordRegex = /^[a-z]+/;
const camelCaseRegex = /(?<=^[a-z]+.*)[A-Z][a-z]*(?=[A-Z]|$)/g;
function camelCaseToKebab(string){
    return camelCaseRegex.test(string) ? string.match(camelCaseRegex).reduce((prev, curr) => `${prev}-${curr.toLowerCase()}`,string.match(firstWordRegex)[0]) : string.toLowerCase();
}
