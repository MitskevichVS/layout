const checkTargetClassInPath = (pathPseudoArray, eventEl, targetClass) => {
    let requiredNode = false;
    const pathArray = Array.from(pathPseudoArray);
    for (let itemIndex = 0; itemIndex < pathArray.length; itemIndex += 1) {
        if (pathArray[itemIndex].classList !== undefined && pathArray[itemIndex].classList.contains(targetClass) && pathArray[itemIndex] !== eventEl){
            requiredNode = pathArray[itemIndex];
            break;
        }
    }
    return requiredNode;
}

export default checkTargetClassInPath;