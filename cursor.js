function controllersCursorOnBoard(event){
    var keyCode = event.which;
    var backX = arrow.position.x + 8;
    var backY = arrow.position.z + 8;
        
    //Key A
    if (keyCode == 65) {
        camera.position.x = camera.position.x - 1;
        console.log(backX + ' ' + backY);
    }
    //Key W
    if (keyCode == 87) {
        camera.position.z = camera.position.z - 1;
        console.log(backX + ' ' + backY);
    }
    //Key D
    if (keyCode == 68) {
        camera.position.x = camera.position.x + 1;
        console.log(backX + ' ' + backY);
    }
    //Key S
    if (keyCode == 83) {
        camera.position.z = camera.position.z + 1;
        console.log(backX + ' ' + backY);
    }
    //Key O
    if (keyCode == 79) {
        camera.position.y = camera.position.y + 1;

    }
    //Key P
    if (keyCode == 80) {
        camera.position.y = camera.position.y - 1;

    }
    //Key ESC => SHOW PAUSE MENU
    if (keyCode == 27) {
        scene.remove(board);
        scene.remove(arrow);
        scene.remove(person);    
        scene.add(person);    
    }

    //Key SPACE
    /* if (keyCode == 32) {
        cancelAnimationFrame(requestAnimationFrame(animateMovePersonToArrow));
    } */

}

function moveActionsToCursor(X, Z){

    var moveAction = arrayActions.find(tempVar => tempVar.name == 'actionMove');

    moveAction.position.x = X - 2;
    moveAction.position.z = Z - 0.5;

    var fightAction = arrayActions.find(tempVar => tempVar.name == 'actionFight');

    fightAction.position.x = X - 1;
    fightAction.position.z = Z - 0.5;

    var fightAction = arrayActions.find(tempVar => tempVar.name == 'actionShop');

    fightAction.position.x = X - 0;
    fightAction.position.z = Z - 0.5;

    var fightAction = arrayActions.find(tempVar => tempVar.name == 'actionWait');

    fightAction.position.x = X + 1;
    fightAction.position.z = Z - 0.5;

    /* const resultX = arrayActions.find(tempVar => tempVar.name == 'actionMove');


    const resultX = arrayActions.find(tempVar => tempVar.name == 'actionFight'); */



}