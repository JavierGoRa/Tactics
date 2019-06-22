var scene, camera, renderer;
var positionX;
var positionY;
var velocityX = 0;
var velocityY = 0;
var velocityZ = 0;
var acelerationX = 0;
var acelerationY = 0;
var acelerationZ = 0;

init();
animate();

function init(){
    //create camera perspective and scene of window
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //texture cube loader
    /* var loader = new THREE.CubeTextureLoader();
    loader.setPath( 'src/textures/' );
    var textureCube = loader.load( [
        'tapete.png', 'tapete.png',
        'tapete.png', 'tapete.png',
        'tapete.png', 'tapete.png'
    ] ); */

    // load a texture, set wrap mode to repeat
    //var texture = new THREE.TextureLoader().load( "src/textures/tapeteRealSize.png" );
    

    //set propierties cube
    var cubeInit = new THREE.Mesh(new THREE.BoxGeometry( 20, 20, 20), new THREE.MeshBasicMaterial( { color: 0xffffff } ));

    //Init position 
    cubeInit.position.x = 0;
    cubeInit.position.y = 0;
    cubeInit.position.z = 0;

    //Add cube to scene
    scene.add(cubeInit);

    //Coor position camera
    camera.position.y = 0;
    camera.position.z = 1000;
    camera.position.x = 0;

    renderer.render( scene, camera );

}

//animation camera
function animate() {

    requestAnimationFrame(animate);

    velocityX = acelerationX;
    velocityY = acelerationY;
    velocityZ = acelerationZ;

    camera.position.y += velocityY;
    camera.position.z += velocityZ;
    camera.position.x += velocityX;

    if (acelerationX != 0) {
        if (acelerationX < 0) {
            acelerationX = acelerationX + 0.5;
        }
        if (acelerationX > 0) {
            acelerationX = acelerationX - 0.5;
        }
    }

    if (acelerationY != 0) {
        if (acelerationY < 0) {
            acelerationY = acelerationY + 0.5;
        }
        if (acelerationY > 0) {
            acelerationY = acelerationY - 0.5;
        }
    }

    if (acelerationZ != 0) {
        if (acelerationZ < 0) {
            acelerationZ = acelerationZ + 0.5;
        }
        if (acelerationZ > 0) {
            acelerationZ = acelerationZ - 0.5;
        }
    }

    /* console.log('');
    console.log('acelX ' + acelerationX);
    console.log('velX ' + velocityX); */

    renderer.render( scene, camera );

}

document.addEventListener("keydown", keyDownEvent, false);

//function dev inspect
function keyDownEvent(event){
    var keyCode = event.which;
    //Key A
    if (keyCode == 65) {
        acelerationX = -10;
    }
    //Key W
    if (keyCode == 87) {
        acelerationY = 10;
    }
    //Key D
    if (keyCode == 68) {
        acelerationX = 10;
    }
    //Key S
    if (keyCode == 83) {
        acelerationY = -10;
    }
    //Key Q
    if (keyCode == 81) {
        acelerationZ = -10;
    }
    //Key E
    if (keyCode == 69) {
        acelerationZ = 10;
    }
}