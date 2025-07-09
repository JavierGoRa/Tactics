/* var bat = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
    map:THREE.ImageUtils.loadTexture('src/sprites/hero/fr.png'),
    transparent: true
});
bat.map.needsUpdate = true; //ADDED

// plane
batMesh = new THREE.Mesh(new THREE.CircleGeometry( 5, 6 ),bat);
batMesh.position.set( 5, 11, 6 );
batMesh.rotation.x = -0.35;
batMesh.rotation.y = 0.75;
batMesh.rotation.z = 0.25;
batMesh.overdraw = true;
scene.add(batMesh);

renderer.render( scene, camera );
 */



//Animation arrow
function indexlightningBattlefield(pj) {

    if (arrayLightningZones.length == 0) {
        
        for (let index = 0; index < pj.weapon.distance; index++) {

            for (let iZ = 0; iZ < index + 1; iZ++) {
                    
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x + iZ ;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z - index + pj.weapon.distance  ;
                cube.name = 'attack';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                
                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }


                cube = new THREE.Mesh(new THREE.BoxGeometry( 0.5, 2.5, 0.5), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x00ff00, opacity:0 } ));
                
                cube.position.x = pj.plane.position.x + iZ 
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z - index + pj.weapon.distance ;
                cube.name = 'attack';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);
                

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }

            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x + index - pj.weapon.distance;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  + iZ ;
                cube.name = 'attack';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x - iZ;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  + index - pj.weapon.distance ;
                cube.name = 'attack';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);
                

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x - index + pj.weapon.distance;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  - iZ ;
                cube.name = 'attack';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }
            

        }
        
    }
}



//Animation arrow
function indexlightningBattlefieldMovement(pj) {

    console.log('indexlightningBattlefieldMovement START');
    if (arrayLightningZones.length == 0) {
        
        for (let index = 0; index < pj.movility; index++) {

            for (let iZ = 0; iZ < index + 1; iZ++) {
                    
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x + iZ ;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z - index + pj.movility  ;
                cube.name = 'movement';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }

            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x + index - pj.movility;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  + iZ ;
                cube.name = 'movement';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x - iZ;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  + index - pj.movility ;
                cube.name = 'movement';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = pj.plane.position.x - index + pj.movility;
                cube.position.y = 10.10;
                cube.position.z = pj.plane.position.z  - iZ ;
                cube.name = 'movement';

                var resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                var resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }
            

        }
        
    }
    console.log('indexlightningBattlefieldMovement END');
}
