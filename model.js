const div = document.querySelector('.threejs');

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = div.clientWidth / div.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(div.clientWidth, div.clientHeight);
};

document.forms[0].addEventListener('change', (e) => {
	spotLight1.intensity=e.target.value;
})

document.forms[1].addEventListener('change', (e) => {
	directionalLight.intensity=e.target.value;
})

document.forms[2].addEventListener('change', (e) => {
	spotLight2.intensity=e.target.value;
})

document.forms[3].addEventListener('change', (e) => {
	icosahedron.material.color.set(e.target.value);
})

document.forms[4].addEventListener('change', (e) => {
	pyramid.material.color.set(e.target.value);
})


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, div.clientWidth / div.clientHeight, 0.1, 100);
camera.position.set(0, 0.1, 2.4);
cameraTarget = new THREE.Vector3(0, 0.1, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(div.clientWidth, div.clientHeight);
renderer.shadowMap.enabled = true;
div.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xCAB6BD);
scene.fog = new THREE.Fog(0xCAB6BD, 1, 8);


//!!!!!!!!!!!!!ОБЪЕКТЫ!!!!!!!!!!!!!!!

//ГОРИЗОНТАЛЬНАЯ ПЛОСКОСТЬ
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(8, 4),
	new THREE.MeshPhysicalMaterial({ roughness: 0.1, 
	transmission: 1, thickness: 0.2, color: 'white',
	side: THREE.DoubleSide}) 
);
plane.rotation.x = - Math.PI / 2.2;
plane.position.set(0,-0.5,0)
plane.receiveShadow = true;
scene.add(plane);


//ФОН - ВЕРТИКАЛЬНАЯ + НИЖНЯЯ ПЛОСКОСТЬ
var geometry1 = new THREE.BufferGeometry();
const vertices1 = new Float32Array( [
  -4.0, -1, 0.1,
  4.0, -1, 0.1,
  4.0, 3.0, 0.1,

  4.0, 3.0, 0.1,
  -4.0, 3.0, 0.1,
  -4.0, -1, 0.1,

	-4.0, -1, 0.1,
	4.0, -1, 0.1,
	1.0, -1, 10,

	1.0, -1, 10,
	-1.0, -1, 10,
	-4.0, -1, 0.1
] );
geometry1.setAttribute('position', new THREE.Float32BufferAttribute( vertices1, 3 ));
geometry1.computeVertexNormals();
const material1 = new THREE.MeshPhongMaterial( { color: 0xE66D99, side:THREE.DoubleSide	} );
const plane2 = new THREE.Mesh( geometry1, material1 );
plane2.receiveShadow=true;
plane2.position.z=-2;
scene.add( plane2 );


//ИКОСАЭДР
const icosahedron = new THREE.Mesh(
	new THREE.IcosahedronGeometry(0.55), //Радиус
	new THREE.MeshPhongMaterial({ color: 0x99D5D0, side: THREE.DoubleSide})
);
icosahedron.castShadow=true;
icosahedron.position.set(-0.9, 0.1, 0);
scene.add(icosahedron);


//ПИРАМИДА
var geometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array( [
    0, 0, 0.6,
    0.6, 0,  0,
    -0.36, -Math.sqrt(0.6*0.6-0.36*0.36),  0,

    0, 0, 0.6,
    0.6, 0, 0,
    -0.36, Math.sqrt(0.6*0.6-0.36*0.36),  0,

    0, 0, 0.6,
    -0.36,  -Math.sqrt(0.6*0.6-0.36*0.36),  0,
    -0.36,  Math.sqrt(0.6*0.6-0.36*0.36),  0,

    0.6, 0,  0,
    -0.36,  -Math.sqrt(0.6*0.6-0.36*0.36),  0,
    -0.36,  Math.sqrt(0.6*0.6-0.36*0.36),  0
] );
geometry2.setAttribute('position', new THREE.Float32BufferAttribute( vertices2, 3));
geometry2.computeVertexNormals();
const material2 = new THREE.MeshPhongMaterial( { color: 0x99D5D0, side:THREE.DoubleSide } );
const pyramid = new THREE.Mesh( geometry2, material2 );
pyramid.castShadow=true;
pyramid.position.set(0.7, 0.5, 0)
scene.add(pyramid);


//!!!!!!!!!!!!!ОСВЕЩЕНИЕ!!!!!!!!!!!!!!!!

//ЛЕВЫЙ БОКОВОЙ - SPOTLIGHT
const spotLight1 = new THREE.SpotLight(0xFBE7ED, 0.6);
spotLight1.position.set(-6, -0.6, -2);
spotLight1.angle = 0.4;

spotLight1.castShadow = true;

scene.add(spotLight1);

//ПРАВЫЙ БОКОВОЙ - SPOTLIGHT
const spotLight2 = new THREE.SpotLight(0xFBE7ED, 1);
spotLight2.position.set(6, -0.6, -2);
spotLight2.angle = 0.5;

spotLight2.castShadow = true;
scene.add(spotLight2);


//ПРЯМОЙ СВЕТ - DIRECTIONALLIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0.7, 3);
directionalLight.target = icosahedron;

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default
//directionalLight.shadow.camera.top = 5;
//directionalLight.shadow.camera.bottom = - 5;
//directionalLight.shadow.camera.left = -5;
//directionalLight.shadow.camera.right = 5;

scene.add(directionalLight);
camera.lookAt(cameraTarget);

function render(time) {
	time *= 0.001;  // конвертировать время в секунды

	icosahedron.rotation.x = time;
	icosahedron.rotation.y = time;

	pyramid.rotation.x = time;
	pyramid.rotation.z = time;

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}
requestAnimationFrame(render);