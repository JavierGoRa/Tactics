var scene, camera, renderer;
var person;
/* 
var velocityX = 0;
var velocityY = 0;
var velocityZ = 0;
var acelerationX = 0;
var acelerationY = 0;
var acelerationZ = 0; */

init();
animate();

function setPositionPerson(posX, posZ){
    if (Math.sign(posX) == -1) { 
        person.position.x = 2 * posX + 1;
    } else { 
        person.position.x = 2 * posX - 1;
    };

    if (Math.sign(posZ) == -1) { 
        person.position.z = 2 * posZ + 1;
    } else { 
        person.position.z = 2 * posZ - 1;
    };
}

function init(){
    //create camera perspective and scene of window
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // load a texture, set wrap mode to repeat
    var texture = new THREE.TextureLoader().load( "src/textures/tapeteRealSize.png" );
    

    //set propierties cube
    var cubeBase = new THREE.Mesh(new THREE.BoxGeometry( 40, 0, 40), new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ));

    person = new THREE.Mesh(new THREE.BoxGeometry( 1, 5, 1), new THREE.MeshBasicMaterial( { color: 0x666666 } ));

    setPositionPerson(1, 1);

    /* person.position.x = 9;
    person.position.z = -5; */
    person.position.y = 1;

    //Init position 
    cubeBase.position.x = 0;
    cubeBase.position.y = 0;
    cubeBase.position.z = 0;

    //Add cube to scene
    scene.add(cubeBase);
    scene.add(person);

    //Coor position camera
    camera.position.y = 50;
    camera.position.z = 50;
    camera.position.x = 0;

    camera.rotation.x = -0.7;

    renderer.render( scene, camera );

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

document.addEventListener("keydown", ControllersCamera, false);

//function dev inspect
function ControllersCamera(event){
    var keyCode = event.which;
    //Key A
    if (keyCode == 65) {
        person.position.x = person.position.x - 2;
    }
    //Key W
    if (keyCode == 87) {
        person.position.z = person.position.z - 2;
    }
    //Key D
    if (keyCode == 68) {
        person.position.x = person.position.x + 2;
    }
    //Key S
    if (keyCode == 83) {
        person.position.z = person.position.z + 2;
    }
    //Key Q
    if (keyCode == 81) {
        acelerationZ = -0.5;
    }
    //Key E
    if (keyCode == 69) {
        acelerationZ = 0.5;
    }
    //Key SPACE
    if (keyCode == 32) {
        acelerationZ = 0;
        acelerationY = 0;
        acelerationX = 0;
    }
}