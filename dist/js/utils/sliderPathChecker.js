const checkTargetClassInPath = (pathPseudoArray) => {
    let requiredNode = false;
    const pathArray = Array.from(pathPseudoArray);
    pathArray.forEach((node) => {
        if (node.classList !== undefined && node.classList.contains('controls__control-item')){
            requiredNode = node;
        }
    });
    return requiredNode;
}

export default checkTargetClassInPath;