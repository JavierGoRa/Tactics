/*
    * Author: Javier González
    * Email: javigoracontact@gmail.com
    * ALL RIGHT RESERVED Copyright 2020
    * Project Tactics : https://docs.google.com/document/d/1ArXHVm_ad-tYH54TRrrvIFD9NAbwIv-tS5l5G3RD8Ew/edit?usp=sharing
*/

var scene, camera, renderer;
var arrow;
var person;
var character;
var board;
var texture;
var menuBattle;
var codeSelector = 2;
var arrowOnX, arrowOnZ;
var velocityMove;
var raycaster, mouse;
var arrowMoveUp;

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

function checkBox(x, y){
    if (board[x][y] == 0) {
        console.log("mierda");
    }
}

console.log(board);

function init(){
    //create camera perspective and scene of window
    mainMenu = new THREE.Scene();
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000 );

    //Coor position camera
    camera.position.y = 40;
    camera.position.z = 0;
    camera.position.x = 10;

    camera.rotation.x = -1;

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(0x000000, 0);

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


/*     var texture = new THREE.TextureLoader().load( "src/textures/" + color + ".png" );
    var loadWindow = new THREE.Mesh(new THREE.BoxGeometry( window.innerWidth, 0, window.innerHeight), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));
 */

    //Creating the battlefield with a matrix
    var board = [];
    var color = 'black';
    
    for (let x = 0; x < 20; x++) {
        board[x] = [];
        (color == 'black') ? color = 'white' : color = 'black';
        
        for (let y = 0; y < 20; y++) {
            // load a texture, set wrap mode to repeat
            texture = new THREE.TextureLoader().load( "src/textures/" + color + ".png" );
            cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 0, 1), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

            board[x][y] = 'hello';
            
            cube.position.x = x;
            cube.position.y = 10;
            cube.position.z = y;

            scene.add(cube);
            (color == 'black') ? color = 'white' : color = 'black';

        }
    }

    for (let index = 0; index < 12; index++) {
        var person = new THREE.Mesh(new THREE.BoxGeometry( 1, 7, 1), new THREE.MeshBasicMaterial( { color: 0x006666 } ));
        var pass = false;

        while (pass == false) {
        
            var xPerson = Math.floor(Math.random() * 20);
            var yPerson = Math.floor(Math.random() * 20);

            if (board[xPerson][yPerson] != null) {
                pass = true;
            }

        }
        
        person.position.x = xPerson;
        person.position.y = 10;
        person.position.z = yPerson;
        scene.add(person);       

    }

    
    texture = new THREE.TextureLoader().load( "src/textures/arrow.png" );
    arrow = new THREE.Mesh(new THREE.BoxGeometry( 0.5, 0.1, 1), new THREE.MeshBasicMaterial( { color: 0x666666, map: texture, transparent: true } ));
    texture = new THREE.TextureLoader().load( "src/textures/selector.png" );
    selector = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( { color: 0x666666, map: texture, transparent: true } ));
 

    arrow.position.y = 15;
    arrow.position.x = 5;
    arrow.position.z = 5;

    selector.position.x = arrow.position.x;
    selector.position.y = 10;
    selector.position.z = arrow.position.z;

    //Add cube to scene
    scene.add(arrow);
    scene.add(selector);

    camera.lookAt(arrow.position);

    renderer.render( scene, camera );

    generateMenuBattle();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener("click", onClick, true);

    function onClick(event){

        event.preventDefault();

        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children); //array
        
        console.log(intersects[0].object.position.x + ' ' + intersects[0].object.position.z);

        arrow.position.x = intersects[0].object.position.x;
        arrow.position.z = intersects[0].object.position.z;

        selector.position.x = arrow.position.x;
        selector.position.z = arrow.position.z;

    }

}

function generateMenuBattle(){

    texture = new THREE.TextureLoader().load( "src/textures/menuBattleBoard.png" );
    menuBattle = new THREE.Mesh(new THREE.BoxGeometry( 20, 15, 0), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

    menuBattle.position.x = 0;
    menuBattle.position.y = 25;

    texture = new THREE.TextureLoader().load( "src/textures/menuBattleSelector.png" );
    selectorMenuBattle = new THREE.Mesh(new THREE.BoxGeometry( 20, 5, 0), new THREE.MeshBasicMaterial( { color: 0xffffff,transparent: true, map: texture } ));

    selectorMenuBattle.position.x = 0;
    selectorMenuBattle.position.y = menuBattle.position.y + 5;
    selectorMenuBattle.position.z = 0.5;

    renderer.render(scene);

}

//Animation arrow
function animate() {

    requestAnimationFrame(animate);

    if (arrow.position.y >= 14) {
        arrowMoveUp = false;
    } else if(arrow.position.y <= 13) {
        arrowMoveUp = true;
    }

    if (arrowMoveUp == true) {
        arrow.position.y = arrow.position.y + 0.025;
    } else {
        arrow.position.y = arrow.position.y - 0.025;
    }

    renderer.render(scene,camera);

}

//animation move person
function animateMovePersonToArrow() {
        
    if (person.position.x == arrowOnX && person.position.z == arrowOnZ) {

        velocityMove = 0;

    } else {

        velocityMove = 0.25;

        if (person.position.x != arrowOnX) {
            
            if (person.position.x > arrowOnX){
                person.position.x -= velocityMove;
            } else if (person.position.x < arrowOnX){
                person.position.x += velocityMove;
            }

        } else if (person.position.z != arrowOnZ) {
            
            if (person.position.z > arrowOnZ){
                person.position.z -= velocityMove;
            } else if (person.position.z < arrowOnZ){
                person.position.z += velocityMove;
            }

        }

        /* console.log(' ');
        console.log(person.position.x);
        console.log(person.position.z); */
        
        requestAnimationFrame(animateMovePersonToArrow)

    }

}

//listener to change screen size
window.addEventListener( 'resize', onWindowResize, false );

document.addEventListener("keydown", controllersCursorOnBoard, false);

//function catch key to cursor on board
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

        /* document.removeEventListener("keydown", controllersCursorOnBoard, false);
        document.addEventListener("keydown", controllersCursorOnMenuBattle, false);
        codeSelector = 2;
        selectorMenuBattle.position.y = codeSelector * 5 + 20;
        scene.add(menuBattle);
        scene.add(selectorMenuBattle); */
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

//function catch key to cursor on battle menu
function controllersCursorOnMenuBattle(event){
    var keyCode = event.which;
    //Key W
    if (keyCode == 87 && codeSelector != 2) {
        codeSelector ++;
        selectorMenuBattle.position.y = codeSelector * 5 + 20;
    }
    //Key S
    if (keyCode == 83 && codeSelector != 0) {
        codeSelector --;
        selectorMenuBattle.position.y = codeSelector * 5 + 20;
    }
    //Key O
    if (keyCode == 79) {
        if (codeSelector == 2) {
            document.removeEventListener("keydown", controllersCursorOnMenuBattle, false);

            arrowOnX = arrow.position.x;
            arrowOnZ = arrow.position.z;

            animateMovePersonToArrow();
            
            document.addEventListener("keydown", controllersCursorOnBoard, false);

            scene.remove(menuBattle);
            scene.remove(selectorMenuBattle);
        }
    }

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}