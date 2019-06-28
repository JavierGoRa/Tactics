var scene, camera, renderer;
var arrow;
var person;
var character;
var board;
var texture;
var menuBattle;
var codeSelector = 2;

init();
animate();

function setPositionArrow(posX, posZ){
    if (Math.sign(posX) == -1) { 
        arrow.position.x = 2 * posX + 1;
    } else { 
        arrow.position.x = 2 * posX - 1;
    };

    if (Math.sign(posZ) == -1) { 
        arrow.position.z = 2 * posZ + 1;
    } else { 
        arrow.position.z = 2 * posZ - 1;
    };
}

function setPositionPerson(character){
    character.position.x = arrow.position.x;
    character.position.z = arrow.position.z;
}

function init(){
    //create camera perspective and scene of window
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // load a texture, set wrap mode to repeat
    texture = new THREE.TextureLoader().load( "src/textures/tapeteRealSize.png" );

    //set propierties cube
    board = new THREE.Mesh(new THREE.BoxGeometry( 40, 0, 40), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

    arrow = new THREE.Mesh(new THREE.BoxGeometry( 1, 5, 1), new THREE.MeshBasicMaterial( { color: 0x666666 } ));
    person = new THREE.Mesh(new THREE.BoxGeometry( 1, 7, 1), new THREE.MeshBasicMaterial( { color: 0x006666 } ));

    character = person;

    setPositionArrow(1, 1);

    /* person.position.x = 9;
    person.position.z = -5; */
    arrow.position.y = 3;

    //Init position 
    board.position.x = 0;
    board.position.y = 0;
    board.position.z = 0;

    person.position.x = 5;
    person.position.z = 5;

    //Add cube to scene
    scene.add(board);
    scene.add(arrow);
    scene.add(person);

    //Coor position camera
    camera.position.y = 50;
    camera.position.z = 50;
    camera.position.x = 0;

    camera.rotation.x = -0.7;

    renderer.render( scene, camera );

    generateMenuBattle();

}

function generateMenuBattle(){

    texture = new THREE.TextureLoader().load( "src/textures/menuBattleBoard.png" );
    menuBattle = new THREE.Mesh(new THREE.BoxGeometry( 20, 15, 0), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

    menuBattle.position.x = 0;
    menuBattle.position.y = 25;

    scene.add(menuBattle);

    texture = new THREE.TextureLoader().load( "src/textures/menuBattleSelector.png" );
    selectorMenuBattle = new THREE.Mesh(new THREE.BoxGeometry( 20, 5, 0), new THREE.MeshBasicMaterial( { color: 0xffffff,transparent: true, map: texture } ));

    selectorMenuBattle.position.x = 0;
    selectorMenuBattle.position.y = menuBattle.position.y + 5;
    selectorMenuBattle.position.z = 0.5;

    scene.add(selectorMenuBattle);

    renderer.render(scene);

}

//animation camera
function animate() {

    requestAnimationFrame(animate);

    /* velocityX = acelerationX;
    velocityY = acelerationY;
    velocityZ = acelerationZ;

    camera.position.y += velocityY;
    camera.position.z += velocityZ;
    camera.position.x += velocityX; */

    /* if (acelerationX != 0) {
        if (acelerationX < 0) {
            acelerationX = acelerationX + 0.1;
        }
        if (acelerationX > 0) {
            acelerationX = acelerationX - 0.1;
        }
    }

    if (acelerationY != 0) {
        if (acelerationY < 0) {
            acelerationY = acelerationY + 0.1;
        }
        if (acelerationY > 0) {
            acelerationY = acelerationY - 0.1;
        }
    }

    if (acelerationZ != 0) {
        if (acelerationZ < 0) {
            acelerationZ = acelerationZ + 0.1;
        }
        if (acelerationZ > 0) {
            acelerationZ = acelerationZ - 0.1;
        }
    } */

    renderer.render( scene, camera );

}

//listener to change screen size
window.addEventListener( 'resize', onWindowResize, false );

document.addEventListener("keydown", controllersCursorOnBoard, false);

//function catch key to cursor on board
function controllersCursorOnBoard(event){
    var keyCode = event.which;
    //Key A
    if (keyCode == 65) {
        arrow.position.x = arrow.position.x - 2;
    }
    //Key W
    if (keyCode == 87) {
        arrow.position.z = arrow.position.z - 2;
    }
    //Key D
    if (keyCode == 68) {
        arrow.position.x = arrow.position.x + 2;
    }
    //Key S
    if (keyCode == 83) {
        arrow.position.z = arrow.position.z + 2;
    }
    //Key O
    if (keyCode == 79) {
        document.removeEventListener("keydown", controllersCursorOnBoard, false);
        document.addEventListener("keydown", controllersCursorOnMenuBattle, false);
        codeSelector = 2;
        selectorMenuBattle.position.y = codeSelector * 5 + 20;
    }
}

//function catch key to cursor on the battle menu
function controllersCursorOnMenuBattle(event){
    var keyCode = event.which;
    //Key W
    if (keyCode == 87) {
        if (codeSelector != 2) {
            codeSelector ++;
            selectorMenuBattle.position.y = codeSelector * 5 + 20;
        }
    }
    //Key S
    if (keyCode == 83) {
        if (codeSelector != 0) {
            codeSelector --;
            selectorMenuBattle.position.y = codeSelector * 5 + 20;
        }    
    }
    //Key O
    if (keyCode == 79) {
        if (codeSelector == 2) {
            document.removeEventListener("keydown", controllersCursorOnMenuBattle, false);
            setPositionPerson(character);
            document.addEventListener("keydown", controllersCursorOnBoard, false);    
        }
    }

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}