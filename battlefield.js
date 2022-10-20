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
function indexlightningBattlefield(weapon) {

    if (arrayLightningZones.length == 0) {
        
        for (let index = 0; index < weapon.distance; index++) {

            for (let iZ = 0; iZ < index + 1; iZ++) {
                    
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = arrow.position.x + iZ ;
                cube.position.y = 10.10;
                cube.position.z = arrow.position.z - index + weapon.distance  ;
                cube.name = 'board';

                const resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                const resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }

            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = arrow.position.x + index - weapon.distance;
                cube.position.y = 10.10;
                cube.position.z = arrow.position.z  + iZ ;
                cube.name = 'board';

                const resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                const resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = arrow.position.x - iZ;
                cube.position.y = 10.10;
                cube.position.z = arrow.position.z  + index - weapon.distance ;
                cube.name = 'board';

                const resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                const resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }

            for (let iZ = 0; iZ < index + 1; iZ++) {
                
                cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshBasicMaterial( {opacity: 0.3, transparent: true, color: 0x0000ff } ));
                
                cube.position.x = arrow.position.x - index + weapon.distance;
                cube.position.y = 10.10;
                cube.position.z = arrow.position.z  - iZ ;
                cube.name = 'board';

                const resultX = arrayField.find(tempCube => tempCube.position.x == cube.position.x);
                const resultZ = arrayField.find(tempCube => tempCube.position.z == cube.position.z);

                if (resultX && resultZ) {
                    scene.add(cube);
                    arrayLightningZones.push(cube);
                }
                
            }
            

        }
        
    }
}