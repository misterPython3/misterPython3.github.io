
export const $html = document.documentElement;
export const $head = document.head;
export const $body = document.body;



export function $render(root, child){
    const node = root.cloneNode();
    root.parentElement.replaceChild(node, root);
    node.appendChild(child);
}


export function $parse(objectTree){
    if(objectTree == null) return null;
    switch (objectTree.constructor) {
        case Object:
            if(objectTree.name != null) {
                const node =  document.createElement(objectTree.name);
                if(objectTree.attr != null){
                    Object.keys(objectTree.attr).map(
                        (key) => {
                            if(objectTree.attr[key] == undefined || objectTree.attr[key] == null){
                                node.setAttribute(key, "");
                            }else {
                                switch(key){
                                    case "style":
                                        switch(objectTree.attr.style.constructor){
                                            case Object:
                                                objectTree.attr.style = parseStyle(objectTree.attr.style);
                                            case String:
                                                break;
                                            default:
                                                objectTree.attr.style = "";
                                            break;
                                        }
                                        
                                    default:
                                        node.setAttribute(key, objectTree.attr[key]);
                                        break;
                                }
                                
                            }
                        }
                    )
                }
                const nodeChild = $parse(objectTree.child);
                if(nodeChild != null){
                    switch(nodeChild.constructor){
                        case Array:
                            nodeChild.map(
                                child => node.append(child)
                            )
                            break;
                        default:
                        case Text:
                            node.append(nodeChild)
                            break;
                            
                    }
                }
                return node;
            }
            else {
                if(objectTree.child.constructor == Array){
                    const nodeArray = Array();
                    objectTree.child.map(
                        (child) => {
                            const childNode = $parse(child);
                            nodeArray.push(childNode);
                        }
                    )
                    return nodeArray;
                }
                else return $parse(objectTree.child);
            }

        case String:
            return document.createTextNode(objectTree);
        case Array:
            const nodeArray = Array();
            objectTree.map(
                child => {
                    const childNode = $parse(child);
                    nodeArray.push(childNode);
                } 
            );
            return nodeArray;
        default:
            return null;
    }
}

const firstCamelWordRegex = /^[a-z]+/;
const camelCaseRegex = /(?<=^[a-z]+.*)[A-Z][a-z]*(?=[A-Z]|$)/g;
function camelCaseToKebab(string){
    return camelCaseRegex.test(string) ? 
        string.match(camelCaseRegex)
            .reduce(
                (prev, curr) => `${prev}-${curr.toLowerCase()}`,
                string.match(firstCamelWordRegex)[0]  
                ) :  string.toLowerCase();
}

export function parseStyle(styleObject){
    const keys = Object.keys(styleObject);
    const styleArray = Array();
    keys.map(
        key => styleArray.push(
            `${camelCaseToKebab(key)}:${styleObject[key].toString()}`
        )
    );
    return `${styleArray.join(";")}`;
}