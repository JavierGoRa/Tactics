function controllersCursorOnBoard(event){
    var keyCode = event.which;
    var backX = arrow.position.x + 8;
    var backY = arrow.position.z + 8;
        
    //Key A
    if (keyCode == 65) {
        camera.position.x = camera.position.x - 1;
        camera.position.z = camera.position.z + 1;
    }
    //Key W
    if (keyCode == 87) {
        camera.position.x = camera.position.x - 1;
        camera.position.z = camera.position.z - 1;
    }
    //Key D
    if (keyCode == 68) {
        camera.position.z = camera.position.z - 1;
        camera.position.x = camera.position.x + 1;
    }
    //Key S
    if (keyCode == 83) {
        camera.position.x = camera.position.x + 1;
        camera.position.z = camera.position.z + 1;
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

    var moveAction = arrayActions.find(tempVar => tempVar.prop == 'actionMove');

    moveAction.position.x = X - 2;
    moveAction.position.z = Z - 0.5;

    var fightAction = arrayActions.find(tempVar => tempVar.prop == 'actionFight');

    fightAction.position.x = X - 1;
    fightAction.position.z = Z - 0.5;

    var fightAction = arrayActions.find(tempVar => tempVar.prop == 'actionWait');

    fightAction.position.x = X + 1;
    fightAction.position.z = Z - 0.5;

    /* const resultX = arrayActions.find(tempVar => tempVar.name == 'actionMove');


    const resultX = arrayActions.find(tempVar => tempVar.name == 'actionFight'); */



}


function generateActions(){

    if(arrayActions.length > 0){
                
        arrayActions.forEach(e => {
            scene.remove(e);
        });
        arrayActions = [];

    }
        
    var bat = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture( (arrayEndsActions.includes('Movement')) ? 'src/textures/moveOff.png' : 'src/textures/move.png' )});
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 5, 11, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.prop = 'actionMove';
    batMesh.name = (arrayEndsActions.includes('Movement')) ? 'actionMoveOff' : 'actionMove' ;
    
    scene.add(batMesh);

    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );

    var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture((arrayEndsActions.includes('Attack')) ? 'src/textures/fightOff.png' : 'src/textures/fight.png')
    });
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 6, 11.5, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.prop = 'actionFight';
    batMesh.name = (arrayEndsActions.includes('Attack')) ? 'actionFightOff' : 'actionFight' ;
    

    scene.add(batMesh);
    
    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );

    
    var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/textures/next.png')
    });
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 8, 12.5, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.name = 'actionWait';
    batMesh.prop = 'actionWait';
    scene.add(batMesh);

    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );
}
