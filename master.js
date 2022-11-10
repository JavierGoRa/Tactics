/*
    * Author: Javier González
    * Email: javigoracontact@gmail.com
    * ALL RIGHT RESERVED Copyright 2022
    * Project Tactics : https://docs.google.com/document/d/1ArXHVm_ad-tYH54TRrrvIFD9NAbwIv-tS5l5G3RD8Ew/edit?usp=sharing
*/
var json_battle1 = 
{
    "type": "pj",
    "id": 1,
    "team": 1,
    "defeat": false,
    "posX":3,
    "posY":3,
    "name": "LeBron",
    "class": "Hunter",
    "level": 5,
    "exp": 35,
    "vit": 100,
    "pm": 30,
    "status": null,
    "movility": 4,
    "jump": 2,
    "evade": 5,
    "speed": 59,
    "atphi": 36,
    "dephi": 43,
    "pomag": 17,
    "demag": 25,
    "equip":["bow"],
    "habilities":{
        "mainAction":{ 
            "name": "Archery",
            "habilities": ["Accumulate", "Immobilize"]
        },
        "secondAction":{ 
            "name": "Battle technique",
            "habilities": ["First aid"]
        },
        "reaction": "Counter attack",
        "support": "Spiritual peace"
    },
    "plane":''
};

var json_battle2 = 
{
    "type": "pj",
    "id": 2,
    "team": 0,
    "defeat": false,
    "posX":3,
    "posY":3,
    "name": "Jordan",
    "class": "Warrior",
    "level": 5,
    "exp": 35,
    "vit": 100,
    "pm": 30,
    "status": null,
    "movility": 4,
    "jump": 2,
    "evade": 5,
    "speed": 59,
    "atphi": 36,
    "dephi": 43,
    "pomag": 17,
    "demag": 25,
    "equip":["bow"],
    "habilities":{
        "mainAction":{ 
            "name": "Archery",
            "habilities": ["Accumulate", "Immobilize"]
        },
        "secondAction":{ 
            "name": "Battle technique",
            "habilities": ["First aid"]
        },
        "reaction": "Counter attack",
        "support": "Spiritual peace"
    },
    "weapon":{
        "property":["arround"],
        "damage":23,
        "test":{ 
            "name": "Archery",
            "habilities": ["Accumulate", "Immobilize"]
        },
        "distance": 3
    },
    "plane":''
};
var json_battle = [];
json_battle.push(json_battle1);
json_battle.push(json_battle2);

var scene, camera, renderer;
var arrow;
var plane;
var person;
var character;
var board;
var texture;
var menuBattle;
var codeSelector = 2;
var arrowOnX, arrowOnZ;
var velocityMove = 0.5;
var raycaster, mouse;
var arrowMoveUp;
var arrayPersons = [];
var arrayLightningZones = [];
var arrayField = [];
var arrayActions = [];
var actualTurn = json_battle[1];
var velocidad = 0;
var aceleracion = 0;
var rozamiento = 0.1;
const clock = new THREE.Clock();
const delta = clock.getDelta();
console.log(json_battle);
var board = [];

var fate = {"position":{"x":null, "z":null}};


var arrayHistorialTurn = [];

var arrayActualTurn = [];
var arrayNextTurns = [];



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


function init(){
    //create camera perspective and scene of window
    mainMenu = new THREE.Scene();
    scene = new THREE.Scene();

    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 0, 1000 );

    //Coor position camera
    camera.position.set( 20, 20, 20 ); // all components equal
    camera.lookAt( scene.position ); // or the origin

    camera.zoom = 5;
    camera.updateProjectionMatrix();

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(0x000000, 0);

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Creating the battlefield with a matrix
    var color = 'black';
    
    for (let x = 0; x < 20; x++) {
        board[x] = [];
        (color == 'black') ? color = 'white' : color = 'black';
        
        for (let y = 0; y < 20; y++) {
            // load a texture, set wrap mode to repeat
            texture = new THREE.TextureLoader().load( "src/textures/" + color + ".png" );
            cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

            
            cube.position.x = x;
            cube.position.y = 10;
            cube.position.z = y;
            cube.name = 'board';

            board[x][y] = cube;


            arrayField.push(cube);

            scene.add(cube);
            (color == 'black') ? color = 'white' : color = 'black';

        }
    }    

    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/textures/arrow.png'),
        transparent: true
    });
    img.map.needsUpdate = true; //ADDED

    // plane
    arrow = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1),img);
    arrow.position.set( 20, 11, 20 );
    arrow.rotation.y = 0.75;
    arrow.overdraw = true;
    scene.add(arrow);

    texture = new THREE.TextureLoader().load( "src/textures/selector.png" );
    selector = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( { color: 0x666666, map: texture, transparent: true } ));

    arrow.position.y = 13;
    arrow.position.x = 5;
    arrow.position.z = 5;

    selector.position.x = arrow.position.x;
    selector.position.y = 10;
    selector.position.z = arrow.position.z;

    //Add cube to scene
    scene.add(arrow);
    scene.add(selector);

    renderer.render( scene, camera );

    generateBattlefield();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener("click", onClick, true); //Clicking on the game EVERYTHING
    
    renderer.domElement.addEventListener('wheel', onMouseWheel, false); //Clicking on the game EVERYTHING

    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/sprites/hero/fl.png'),
        transparent: true
    });
    img.map.needsUpdate = true; //ADDED

    // plane
    plane = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.25),img);
    plane.position.set( 5, 11, 9 );
    plane.rotation.x = -0.35;
    plane.rotation.y = 0.75;
    plane.rotation.z = 0.25;
    plane.overdraw = true;
    scene.add(plane);

    json_battle[1].plane = plane;
    board[plane.position.x][plane.position.z].object = json_battle[1];

    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial color:
        map:THREE.ImageUtils.loadTexture('src/sprites/enemy/fl.png'),
        transparent: true
    });
    img.map.needsUpdate = true; //ADDED

    // plane
    enemy = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.25),img);
    enemy.position.set( 1, 11, 2 );
    enemy.rotation.x = -0.35;
    enemy.rotation.y = 0.75;
    enemy.rotation.z = 0.25;
    enemy.overdraw = true;
    scene.add(enemy);

    json_battle[0].plane = enemy;

    board[enemy.position.x][enemy.position.z].object = json_battle[0];
    
    renderer.render( scene, camera );
    
    var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/textures/move.png')
    });
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 5, 11, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.name = 'actionMove';
    scene.add(batMesh);

    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );

    var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/textures/fight.png')
    });
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 6, 11.5, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.name = 'actionFight';
    scene.add(batMesh);
    
    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );

    
    var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('src/textures/shop.png')
    });
    bat.map.needsUpdate = true; //ADDED
    
    // plane
    batMesh = new THREE.Mesh(new THREE.CircleGeometry( 0.5, 6 ),bat);
    batMesh.position.set( 7, 12, 6 );
    batMesh.rotation.x = -0.35;
    batMesh.rotation.y = 0.75;
    batMesh.rotation.z = 0.25;
    batMesh.overdraw = true;
    batMesh.name = 'actionShop';
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
    scene.add(batMesh);

    arrayActions.push(batMesh);
    
    renderer.render( scene, camera );


    startTurn(json_battle[1]);


}


function onMouseWheel(event) {
    event.preventDefault();
  
    camera.zoom -= event.deltaY / 200;
    camera.updateProjectionMatrix();

}


function onClick(event){

    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children); //array

    console.log(intersects[0].object.name);

    switch (intersects[0].object.name) {   
        case 'board': //Has selected the table board

            arrow.position.x = intersects[0].object.position.x;
            arrow.position.z = intersects[0].object.position.z;

            selector.position.x = arrow.position.x;
            selector.position.z = arrow.position.z;

            if(arrayLightningZones.length > 0){
                
                arrayLightningZones.forEach(e => {
                    scene.remove(e);
                });

                arrayLightningZones = [];

            }
                    
            break;
            
        case 'actionMove':

            indexlightningBattlefieldMovement(json_battle[1])
        
            break;
    
        case 'actionFight':

            indexlightningBattlefield(actualTurn);
        
            break;

        case 'movement':

            arrow.position.x = intersects[0].object.position.x;
            arrow.position.z = intersects[0].object.position.z;

            selector.position.x = arrow.position.x;
            selector.position.z = arrow.position.z;

            fate.position.x = intersects[0].object.position.x;
            fate.position.z = intersects[0].object.position.z;

            animateMovePersonToArrow();
        
            break;

        case 'attack':

            arrow.position.x = intersects[0].object.position.x;
            arrow.position.z = intersects[0].object.position.z;

            if (board[intersects[0].object.position.x][intersects[0].object.position.z].object.type == 'pj') {

                var checkPJ = json_battle.find(pj => pj.id == board[intersects[0].object.position.x][intersects[0].object.position.z].object.id);

                if (checkPJ) {

                    checkPJ.vit -= actualTurn.weapon.damage;
                    
                }

                if(arrayLightningZones.length > 0){
                
                    arrayLightningZones.forEach(e => {
                        scene.remove(e);
                    });
                    arrayLightningZones = [];
            
                }
                
            } else {

                selector.position.x = arrow.position.x;
                selector.position.z = arrow.position.z;
                    
            }
        
            break;
    
        default:
            break;
    }

}



//Animation arrow
function animate() {

    requestAnimationFrame(animate);

    /* velocidad = velocidad + aceleracion;
    console.log('@@@velocidad ' + velocidad);

    if (velocidad < 0) {
        
        camera.zoom -= velocidad;
        camera.updateProjectionMatrix(); //cambiar velocidad

    }

    if (camera.zoom > 10) {
        camera.zoom = 10;
    } else if(camera.zoom < 5){
        camera.zoom = 5;
    }

    console.log('@@@camera.zoom ' + camera.zoom); */


    if (arrow.position.y >= 13) {
        arrowMoveUp = false;
    } else if(arrow.position.y <= 12.5) {
        arrowMoveUp = true;
    }

    if (arrowMoveUp == true) {
        arrow.position.y = arrow.position.y + 0.005;
    } else {
        arrow.position.y = arrow.position.y - 0.005;
    }

    renderer.render(scene,camera);

}

//animation move person
function animateMovePersonToArrow() {

    console.log('@@fate.position.x ' + fate.position.x);
    console.log('@@fate.position.z ' + fate.position.z);
    console.log('@@delta ' + delta);
    
    if(arrayLightningZones.length > 0){
                
        arrayLightningZones.forEach(e => {
            scene.remove(e);
        });

        arrayLightningZones = [];

    }
        
    if (actualTurn.plane.position.x == fate.position.x && actualTurn.plane.position.z == fate.position.z) {
        
        velocityMove = 0;

        moveActionsToCursor(actualTurn.plane.position.x, actualTurn.plane.position.z);

    } else {
    
        velocityMove = 0.5;

        if (actualTurn.plane.position.x != fate.position.x) {
            
            if (actualTurn.plane.position.x > fate.position.x){
                actualTurn.plane.position.x -= velocityMove; //velocityMove = 0.05
            } else if (actualTurn.plane.position.x < fate.position.x){
                actualTurn.plane.position.x += velocityMove;
            }
            
        } else if (actualTurn.plane.position.z != fate.position.z) {

            if (actualTurn.plane.position.z > fate.position.z){
                actualTurn.plane.position.z -= velocityMove;
            } else if (actualTurn.plane.position.z < fate.position.z){
                actualTurn.plane.position.z += velocityMove;
            }

        }

        console.log('@@actualTurn.plane.position.x ' + plane.position.x);
        console.log('@@actualTurn.plane.position.z ' + plane.position.z);

        requestAnimationFrame(animateMovePersonToArrow);
    
        console.log('moviendo');
        renderer.render();

    }

}

//listener to change screen size
window.addEventListener( 'resize', onWindowResize, true );

document.addEventListener("keydown", controllersCursorOnBoard, false);


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

/*             animateMovePersonToArrow();
 */            
            document.addEventListener("keydown", controllersCursorOnBoard, false);

            scene.remove(menuBattle);
            scene.remove(selectorMenuBattle);
        }
    }
}

function onWindowResize() {
    console.log('resize');
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}