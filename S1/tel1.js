			//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var container, stats;
			var camera, scene, renderer, controls;
			var particleLight;
			var loader = new THREE.FontLoader();
			var sampleList = [];
			var samplePosition = [];
			var panes;


			var car = [ 0xff0000,0x00ff00,0x0000ff,0xffff00,0xff00ff,0x00ffff,
						0xffaa00,0xaaff00,0x0000aa,0xff2222,0xff22ff,0xaaffff,
						0xff0000,0x00ff00,0x0000ff,0xffff00,0xff00ff,0x00ffff,
						0xffaa00,0xaaff00,0x0000aa,0xff2222,0xff22ff,0xaaffff];
			loader.load( '../three.js-master/examples/fonts/gentilis_regular.typeface.json', function ( font ) {
				init( font );
				animate();
			} );


			function chp() {
				rngv = document.getElementById("rng").value
				stkv = document.getElementById("stk").checked
				//document.getElementById("sid").innerHTML = rngv;
				for(ccc = 0; ccc < sampleList.length;ccc++){
					pos = samplePosition[ccc];
					pos = pos * rngv;
					sampleList[ccc].visible=true;
					if (rngv == 0 && stkv) {
						sampleList[ccc].position.z = sampleList[ccc].userData['stack'] * 6.0;
						if (sampleList[ccc].userData['layer']==panes-1 || sampleList[ccc].userData['mVal']==0) {sampleList[ccc].visible=false;}
					}
					else {
						sampleList[ccc].position.z = pos;
					}
					if (sampleList[ccc].userData['T'] ){
						if (rngv ==0 && (ccc<sampleList.length-1)) {
							sampleList[ccc].visible=false;
						} else {
							sampleList[ccc].visible=true;
						}	
					}
					
				}
		   }



			function init( font ) {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 0.0, 400, 400 * 3.5 );
				scene = new THREE.Scene();
				panes = 14;

				//scene.background = reflectionCube;
				// Materials
				var imgTexture = new THREE.TextureLoader().load( "../three.js-master/examples/textures/planets/moon_1024.jpg" );
				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
				imgTexture.anisotropy = 16;
				imgTexture = null;
				var shininess = 50, specular = 0x333333, bumpScale = 1;
				var materials = [];
				var cubeWidth = 400;
				var numberOfSphersPerSide = 6;
				var sphereRadius = ( cubeWidth / numberOfSphersPerSide ) * 0.4 ;
				var stepSize = 1.0 / numberOfSphersPerSide;
                
                

    
                
                var e=0;
				var geometry = new THREE.SphereBufferGeometry( sphereRadius, 32, 16 );
				for ( var XX = 0; XX < 1.0; XX += 1.0/5.9  ) {
					for ( var YY = 0; YY < 1.0; YY += 1.0/5.9 ) {
						totSet = 0;
						for ( var ZZ = 0; ZZ < panes-1; ZZ += 1 ) {
							if (DD[e][ZZ] ==1 ) totSet++;

						}
						for ( var ZZ = 0; ZZ < panes; ZZ += 1 ) {
							
                               
                               
                               //var diffuseColor = new THREE.Color(Math.cos(ZZ),Math.tan(ZZ),Math.sin(ZZ))
                				var diffuseColor;
                                
                               if (ZZ==(panes-1)) {
                                             diffuseColor = new THREE.Color(car[(DD[e][ZZ]-1)]);
                                       
                                       } else
                                       {
                                             diffuseColor = new THREE.Color(car[ZZ]);  
                                               }
                               
                               var opc;
                               var offS;
                               if (DD[e][ZZ] > 0) {
										   opc = 1.0
										   offS = totSet;
										   totSet -=1;
                                       } else {
										   opc = 0.2
										   offS = 0;
                                           }
                               var material = new THREE.MeshPhongMaterial( {
								map: imgTexture,
								bumpMap: imgTexture,
								bumpScale: bumpScale,
								color: diffuseColor,
                                    specular: 1.0,
								reflectivity: 1.0,
								shininess: 1.0,
                                    transparent: true,
                                    opacity : opc
								
							} );
							var mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = XX  * 400 - 200;
							mesh.position.y = YY * 400 - 200;
							mesh.position.z = ((panes-ZZ)/(panes*1.0)) * 600 - 400;
							mesh.userData['stack']=offS;
							mesh.userData['layer']=ZZ;
							mesh.userData['mVal']= DD[e][ZZ];
							scene.add( mesh );
							sampleList.push(mesh);
							samplePosition.push(mesh.position.z);
						}
                        e++;
					}
				}




				function addLabel( name, location ) {
					var textGeo = new THREE.TextBufferGeometry( name, {
						font: font,
						size: 20,
						height: 1,
						curveSegments: 1
					});
					var textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
					var textMesh = new THREE.Mesh( textGeo, textMaterial );
					textMesh.position.copy( location );
					textMesh.userData['T']=true;
					scene.add( textMesh );
					sampleList.push(textMesh);
					samplePosition.push(textMesh.position.z);
				}
				  LARCC  = ["ODS Detection","OAS Detection [Write]","OAS Detection [Execute]","OAS / ODS Detection with latest ED","RP Block",
							  "DAC block","IPS Block","RP_Dynamic","RP_Static LOW","RP_Static MED","RP_Static HIGH","TIE with ATD","MAR","Final Protection"]
							  
				  for (ccxl = 0;ccxl<14;ccxl++) {
					addLabel( LARCC[ccxl], new THREE.Vector3( 260, 0, 200-((600/13)*ccxl)));
				  }
			      //addLabel( "H-Signature", new THREE.Vector3( 260, 0, 200 ) );
                  //addLabel( "C-Signature", new THREE.Vector3( 260, 0, 100 ) );
				  //addLabel( "GTI", new THREE.Vector3( 260, 0, 0 ) );
                  //addLabel( "Real Protect - Behavioral", new THREE.Vector3( 260, 0, -100 ) );
                  //addLabel( "Real Protect - Pre-Execution", new THREE.Vector3( 260, 0, -200 ) );
                  //addLabel( "Final Protection", new THREE.Vector3( 260, 0, -300 ) );

                
                
				// Lights
				scene.add( new THREE.AmbientLight( 0x222222 ) );
                
				var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
				directionalLight.position.set( 1, 1, -2 ).normalize();
				scene.add( directionalLight );
                
                	var directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1 );
				directionalLight.position.set( 1, 1, 2 ).normalize();
				scene.add( directionalLight );

                
				//
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				//

				controls = new THREE.OrbitControls( camera,renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			
			}
			function render() {
				var timer = Date.now() * 0.00025;
				//camera.position.x = Math.cos( timer ) * 800;
				//camera.position.z = Math.sin( timer ) * 800;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}