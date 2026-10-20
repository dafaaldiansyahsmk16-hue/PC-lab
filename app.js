(() => {
const $=id=>document.getElementById(id);
const missions=[
 {title:'Siapkan meja kerja',desc:'Kita mulai dari dasar. Kenali meja kerja dan pilih obeng yang tepat sebelum membuka casing.',objective:'Pilih obeng plus',detail:'Obeng plus digunakan untuk melepas sekrup casing. Dalam praktik nyata, matikan PC dan cabut kabel listrik dahulu.',tool:'screwdriver',target:'caseScrews',action:'Lepas sekrup casing',tag:'STAGE 01 / 12',scene:'Persiapan meja kerja',success:'Bagus! Sekrup casing sudah dilepas. Berikutnya buka panel samping.'},
 {title:'Buka panel samping',desc:'Panel samping perlu dibuka agar bagian dalam casing bisa dijangkau.',objective:'Gunakan tangan setelah sekrup lepas',detail:'Pegang panel dengan stabil dan simpan sekrup di tempat aman supaya tidak hilang.',tool:'hand',target:'sidePanel',action:'Lepas panel samping',tag:'STAGE 02 / 12',scene:'Membuka casing',success:'Panel terbuka. Bagian dalam casing sekarang terlihat.'},
 {title:'Pasang motherboard',desc:'Motherboard dipasang pada dudukan casing. Pastikan lubang baut sejajar dengan standoff.',objective:'Pilih motherboard',detail:'Jangan letakkan motherboard langsung menyentuh logam casing. Dudukan standoff mencegah hubungan pendek.',tool:'hand',target:'motherboard',action:'Posisikan motherboard',tag:'STAGE 03 / 12',scene:'Memasang motherboard',success:'Motherboard sudah berada di posisinya. Kencangkan dengan sekrup yang sesuai.'},
 {title:'Kencangkan baut motherboard',desc:'Baut motherboard menjaga papan tetap stabil. Jangan terlalu kencang.',objective:'Gunakan obeng plus',detail:'Gunakan baut yang benar dan kencangkan secukupnya. Jangan memaksa baut jika ulir tidak cocok.',tool:'screwdriver',target:'boardScrews',action:'Kencangkan baut',tag:'STAGE 04 / 12',scene:'Mengencangkan motherboard',success:'Motherboard terpasang dengan stabil.'},
 {title:'Pasang prosesor (CPU)',desc:'CPU harus cocok dengan soket motherboard. Perhatikan tanda arah dan jangan menekan paksa.',objective:'Pilih CPU',detail:'Di perangkat asli, buka pengunci soket dengan hati-hati dan ikuti tanda segitiga pada CPU.',tool:'hand',target:'cpu',action:'Pasang CPU',tag:'STAGE 05 / 12',scene:'Memasang CPU',success:'CPU terpasang pada soket secara virtual. Berikutnya pasang RAM.'},
 {title:'Pasang RAM',desc:'RAM masuk ke slot yang sesuai. Posisi takik pada modul harus cocok dengan slot.',objective:'Pilih RAM',detail:'Tekan rata di kedua sisi hanya sesuai instruksi motherboard. Jangan memasukkan RAM terbalik.',tool:'hand',target:'ram',action:'Pasang RAM',tag:'STAGE 06 / 12',scene:'Memasang RAM',success:'RAM sudah terpasang. PC kini memiliki memori sementara.'},
 {title:'Pasang SSD',desc:'SSD menjadi tempat menyimpan sistem operasi dan berkas. Periksa tipe dan konektornya.',objective:'Pilih SSD',detail:'Simulasi ini menampilkan SSD sebagai modul sederhana. SSD M.2 dan SATA memiliki cara pemasangan berbeda.',tool:'screwdriver',target:'storage',action:'Pasang SSD',tag:'STAGE 07 / 12',scene:'Memasang penyimpanan',success:'SSD terpasang. Sekarang tambahkan kartu grafis.'},
 {title:'Pasang kartu grafis',desc:'GPU membantu mengolah grafis. Tidak semua PC membutuhkan kartu grafis terpisah.',objective:'Pilih GPU',detail:'Periksa panjang kartu, slot PCIe, dan kebutuhan daya sebelum memilih GPU untuk PC nyata.',tool:'hand',target:'gpu',action:'Pasang GPU',tag:'STAGE 08 / 12',scene:'Memasang kartu grafis',success:'GPU sudah terpasang pada slot ekspansi virtual.'},
 {title:'Pasang power supply',desc:'PSU menyediakan daya untuk komponen. Posisi pemasangannya bergantung pada desain casing.',objective:'Pilih PSU',detail:'Jangan pernah membuka unit PSU. Untuk praktik nyata, pastikan kabel listrik terlepas dan ikuti arahan guru.',tool:'hand',target:'psu',action:'Pasang PSU',tag:'STAGE 09 / 12',scene:'Memasang power supply',success:'PSU terpasang. Berikutnya hubungkan kabel daya.'},
 {title:'Hubungkan kabel',desc:'Komponen membutuhkan koneksi daya dan data yang tepat agar sistem bisa berjalan.',objective:'Pilih kabel daya',detail:'Konektor utama umumnya meliputi ATX motherboard dan CPU power. Jangan memaksa konektor yang tidak cocok.',tool:'cable',target:'cables',action:'Hubungkan kabel',tag:'STAGE 10 / 12',scene:'Menghubungkan kabel',success:'Kabel utama tersambung dalam simulasi. Periksa kembali sebelum menutup casing.'},
 {title:'Tutup panel casing',desc:'Sebelum menutup panel, pastikan tidak ada kabel yang menghalangi kipas dan semua komponen terpasang.',objective:'Gunakan tangan',detail:'Dalam praktik nyata, rapikan kabel tanpa menarik konektor. Jangan menyalakan PC jika ada bagian yang longgar.',tool:'hand',target:'sidePanel',action:'Pasang panel samping',tag:'STAGE 11 / 12',scene:'Merapikan dan menutup casing',success:'Panel terpasang kembali. Saatnya tes boot virtual!'},
 {title:'Tes nyala / boot',desc:'Tahap akhir: lakukan pemeriksaan virtual untuk melihat apakah rakitan berhasil menyala.',objective:'Pilih tombol daya',detail:'Pada PC asli, periksa semua koneksi dan ikuti prosedur guru. Simulasi ini hanya menunjukkan hasil belajar secara sederhana.',tool:'power',target:'powerButton',action:'Nyalakan PC',tag:'STAGE 12 / 12',scene:'Uji PC pertama kali',success:'POST SIMULASI BERHASIL! Kamu menyelesaikan rangkaian perakitan PC.'}
];
const tools=[{id:'screwdriver',label:'Obeng plus',symbol:'⊕'},{id:'hand',label:'Tangan',symbol:'✋'},{id:'cable',label:'Kabel daya',symbol:'⌁'},{id:'power',label:'Tombol daya',symbol:'⏻'}];
const components=[['caseScrews','Sekrup casing','⌁'],['sidePanel','Panel samping','▱'],['motherboard','Motherboard','▤'],['cpu','Prosesor / CPU','▦'],['ram','RAM','▥'],['storage','SSD','▰'],['gpu','Kartu grafis','▰'],['psu','Power supply','▣'],['cables','Kabel daya','⌁'],['powerButton','Tombol daya','⏻']];
let stage=0,selectedTool='screwdriver',done=new Set(),selectedTarget=null,autoRotate=false,zoom=1,scene,camera,renderer,rig,parts={},hitMeshes=[],targetX=-.08,targetY=-.55,dragging=false,lastX=0,lastY=0;
const saved=(()=>{try{return JSON.parse(localStorage.getItem('pcbuildquest-v1')||'{}')}catch(e){return {}}})();
if(Array.isArray(saved.done))done=new Set(saved.done);
function save(){try{localStorage.setItem('pcbuildquest-v1',JSON.stringify({done:[...done],stage}))}catch(e){}}
function say(t,type=''){const el=$('feedback');el.textContent=t;el.className='feedback'+(type?' '+type)}
function makeMat(c,r=.45,m=.25,trans=false,op=1){return new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,transparent:trans,opacity:op})}
function addBox(name,w,h,d,mat,x,y,z,hit=false){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;o.userData.target=name;rig.add(o);if(hit)hitMeshes.push(o);return o}
function addCyl(name,r,h,mat,x,y,z,hit=false){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),mat);o.position.set(x,y,z);o.userData.target=name;rig.add(o);if(hit)hitMeshes.push(o);return o}
function build(){
 const root=$('threeRoot');if(!window.THREE){root.innerHTML='<div class="no-webgl">Model 3D tidak bisa dimuat. Periksa koneksi internet lalu muat ulang.</div>';return}
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(5.8,4.3,7.7);
 renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputEncoding=THREE.sRGBEncoding;root.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0xb9ddff,0x101521,1.5));const light=new THREE.DirectionalLight(0xe1f2ff,2.0);light.position.set(4,8,6);light.castShadow=true;scene.add(light);const neon=new THREE.PointLight(0x168cff,1.3,9);neon.position.set(-3,2,3);scene.add(neon);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(4,48),makeMat(0x0b1b2b,.9,0));floor.rotation.x=-Math.PI/2;floor.position.y=-.13;scene.add(floor);const grid=new THREE.GridHelper(10,20,0x1a3b56,0x10283b);grid.position.y=-.12;scene.add(grid);
 rig=new THREE.Group();scene.add(rig);
 const dark=makeMat(0x172a3d,.4,.7),metal=makeMat(0x526e86,.3,.8),black=makeMat(0x07111c,.5,.25),glass=makeMat(0x3996cf,.18,.35,true,.14),board=makeMat(0x1b4b47,.55,.2),blue=makeMat(0x1b9bff,.25,.5),gold=makeMat(0xd5a84f,.3,.7),silver=makeMat(0xa9bbca,.3,.7),green=makeMat(0x2ce0ad,.25,.4);
 // Case base, roof, frame and back plate
 addBox('case',2.8,.14,1.8,dark,0,0,0,true);addBox('case',2.8,.14,1.8,dark,0,3.35,0);
 addBox('case',.13,3.35,1.8,metal,-1.34,1.66,0);addBox('case',.13,3.35,1.8,metal,1.34,1.66,0);
 addBox('case',2.6,3.15,.1,black,0,1.65,-.84);
 // removable side panel in front, initially present
 parts.sidePanel=addBox('sidePanel',2.56,3.05,.045,glass,0,1.66,.93,true);
 addBox('case',2.65,.07,.08,metal,0,.1,.93);addBox('case',2.65,.07,.08,metal,0,3.2,.93);
 // front fan trio
 for(let y of [.7,1.65,2.6]){const ring=addCyl('case',.32,.06,metal,0,y,.99);ring.rotation.x=Math.PI/2;const hub=addCyl('case',.1,.07,blue,0,y,1.04);hub.rotation.x=Math.PI/2;for(let i=0;i<4;i++){let a=i*Math.PI/2;let blade=addBox('case',.07,.22,.025,blue,Math.cos(a)*.16,y+Math.sin(a)*.16,1.05);blade.rotation.z=a}}
 // screw heads on panel
 parts.caseScrews=[];[[-1.18,.24],[1.18,.24],[-1.18,3.06],[1.18,3.06]].forEach(([x,y])=>{const s=addCyl('caseScrews',.07,.035,gold,x,y,.98,true);s.rotation.x=Math.PI/2;parts.caseScrews.push(s)});
 // internal components, initially hidden behind panel but still in scene
 parts.motherboard=addBox('motherboard',1.8,2.55,.1,board,.02,1.75,-.65,true);
 // board traces and standoffs
 for(let i=0;i<5;i++)addBox('motherboard',.025,.8,.025,makeMat(0x41a99b,.6,.3),-.65+i*.27,1.75,-.58);
 for(let x of [-.7,.7])for(let y of [.65,2.85])addCyl('motherboard',.045,.06,gold,x,y,-.56);
 parts.cpu=addBox('cpu',.43,.43,.13,silver,-.22,2.28,-.48,true);addBox('cpu',.31,.31,.04,makeMat(0x62d7d2,.25,.5),-.22,2.28,-.4);
 parts.ram=[];for(let i=0;i<2;i++){const r=addBox('ram',.14,1,.1,makeMat(0x1c9f8b,.4,.4),.42+i*.23,2.15,-.44,true);parts.ram.push(r)}
 parts.storage=addBox('storage',.5,.18,.14,silver,-.65,.65,-.42,true);
 parts.gpu=addBox('gpu',1.48,.34,.44,dark,.12,1.16,-.24,true);addBox('gpu',1.2,.06,.05,blue,.12,1.16,.0);for(let x of [-.32,.12,.56]){const f=addCyl('gpu',.12,.04,metal,x,1.16,.04);f.rotation.x=Math.PI/2}
 parts.psu=addBox('psu',.86,.55,.68,black,.67,.43,-.22,true);addBox('psu',.55,.04,.04,metal,.67,.43,.14);
 // screw targets for board
 parts.boardScrews=[];[[-.7,.65],[.7,.65],[-.7,2.85],[.7,2.85]].forEach(([x,y])=>{const s=addCyl('boardScrews',.045,.04,gold,x,y,-.48,true);s.rotation.x=Math.PI/2;parts.boardScrews.push(s)});
 // cables and power button
 parts.cables=addBox('cables',.06,.85,.06,blue,.55,1.1,-.12,true);parts.powerButton=addCyl('powerButton',.11,.05,green,1.43,2.9,.4,true);
 // case feet
 addBox('case',.45,.12,.45,black,-.85,-.1,.2);addBox('case',.45,.12,.45,black,.85,-.1,.2);
 // loose screwdriver floating beside the case
 parts.screwdriver=addBox('screwdriver',.12,.75,.12,makeMat(0x268bdb,.35,.45),-2.1,.5,.2,true);parts.screwdriver.rotation.z=-.5;
 const resize=()=>{let w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};window.addEventListener('resize',resize);resize();
 renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture?.(e.pointerId)});
 renderer.domElement.addEventListener('pointermove',e=>{if(!dragging)return;targetY+=(e.clientX-lastX)*.009;targetX=Math.max(-.65,Math.min(.5,targetX+(e.clientY-lastY)*.006));lastX=e.clientX;lastY=e.clientY});
 renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);
 renderer.domElement.addEventListener('click',e=>{const rect=renderer.domElement.getBoundingClientRect(),mouse=new THREE.Vector2(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1),ray=new THREE.Raycaster();ray.setFromCamera(mouse,camera);const hits=ray.intersectObjects(hitMeshes,false);if(hits.length){const id=hits[0].object.userData.target;if(id){selectedTarget=id;const m=missions[stage];if(id===m.target){$('tapNote').textContent='Objek benar dipilih: '+m.objective;$('tapNote').classList.add('show');setTimeout(()=>$('tapNote').classList.remove('show'),1600);say('Objek target terpilih. Sekarang lakukan aksi dengan alat yang benar.','good')}else say('Itu bukan target misi ini. Baca petunjuk dan cari objek yang sesuai.','bad')}}});
 function animate(){requestAnimationFrame(animate);if(autoRotate&&!dragging)targetY+=.003;rig.rotation.y+=(targetY-rig.rotation.y)*.08;rig.rotation.x+=(targetX-rig.rotation.x)*.08;camera.position.set(5.8/zoom,4.3/zoom,7.7/zoom);camera.lookAt(0,1.55,0);renderer.render(scene,camera)}animate();
}
function renderTools(){const grid=$('toolGrid');grid.innerHTML='';tools.forEach(t=>{const b=document.createElement('button');b.className='tool-btn'+(selectedTool===t.id?' active':'');b.innerHTML=`<span class="tool-symbol">${t.symbol}</span><span>${t.label}</span>`;b.onclick=()=>{selectedTool=t.id;renderTools();say('Alat dipilih: '+t.label+'. Sekarang pilih target misi di model 3D atau lakukan aksi.');};grid.appendChild(b)})}
function renderInventory(){const root=$('inventory');root.innerHTML='';components.forEach(c=>{const d=document.createElement('div');d.className='inventory-item'+(done.has(c[0])?' done':'');d.innerHTML=`<span class="inv-icon">${done.has(c[0])?'✓':c[2]}</span><span><b>${c[1]}</b><small>${done.has(c[0])?'Selesai':'Belum selesai'}</small></span>`;root.appendChild(d)});const count=components.filter(c=>done.has(c[0])).length;$('inventoryCount').textContent=`${count} / ${components.length}`;}
function renderMission(){
 const m=missions[stage];$('sceneTitle').textContent=m.scene;$('missionTitle').textContent=m.title;$('missionDesc').textContent=m.desc;$('objectiveTitle').textContent=m.objective;$('objectiveText').textContent=m.detail;$('stageChip').textContent=String(stage+1).padStart(2,'0')+' / 12';$('sceneTagStep').textContent=m.tag;
 const pct=Math.round((stage+(done.has(m.target)?1:0))/missions.length*100);$('progressPct').textContent=pct+'%';$('progressFill').style.width=pct+'%';$('progressLabel').textContent='Progres misi '+(stage+1)+' dari 12';
 $('levelNumber').textContent=String(Math.min(12,Math.floor(done.size/2)+1)).padStart(2,'0');$('prevBtn').disabled=stage===0;
 $('actionBtn').innerHTML=(stage===11&&done.has('powerButton')?'Misi selesai':' '+m.action)+' <span>→</span>';
 // stage-related object visibility and highlights
 if(parts.sidePanel)parts.sidePanel.visible=!done.has('sidePanel');
 if(parts.caseScrews)parts.caseScrews.forEach(o=>o.visible=!done.has('caseScrews'));
 if(parts.motherboard)parts.motherboard.visible=done.has('sidePanel');
 if(parts.cpu)parts.cpu.visible=done.has('motherboard');
 if(parts.ram)parts.ram.forEach(o=>o.visible=done.has('cpu'));
 if(parts.storage)parts.storage.visible=done.has('ram');
 if(parts.gpu)parts.gpu.visible=done.has('storage');
 if(parts.psu)parts.psu.visible=done.has('gpu');
 if(parts.cables)parts.cables.visible=done.has('psu');
 if(parts.boardScrews)parts.boardScrews.forEach(o=>o.visible=done.has('motherboard')&&!done.has('boardScrews'));
 if(parts.powerButton)parts.powerButton.visible=done.has('sidePanel');
 renderTools();renderInventory();
}
function performAction(){
 const m=missions[stage];
 if(done.has(m.target)){say('Misi ini sudah selesai. Lanjut ke misi berikutnya.','good');return}
 if(selectedTool!==m.tool){say('Alat belum tepat. Misi ini membutuhkan: '+tools.find(t=>t.id===m.tool).label+'. Coba pilih alat yang benar.','bad');return}
 if(selectedTarget&&selectedTarget!==m.target){say('Objek yang dipilih belum tepat. Cari '+m.objective.toLowerCase()+' pada model.','bad');return}
 if(!selectedTarget&&stage!==0){say('Pilih objek yang sesuai pada model 3D terlebih dahulu.','bad');return}
 done.add(m.target);selectedTarget=null;
 // mission 3 and 4 are separate targets; inventory tracks screws separately
 if(stage===2)done.add('motherboard');if(stage===3)done.add('boardScrews');
 if(stage===4)done.add('cpu');if(stage===5)done.add('ram');if(stage===6)done.add('storage');if(stage===7)done.add('gpu');if(stage===8)done.add('psu');if(stage===9)done.add('cables');if(stage===10)done.add('sidePanel');if(stage===11)done.add('powerButton');
 if(stage===0){done.add('caseScrews');}
 save();say(m.success,'good');
 if(stage<missions.length-1){stage++;const next=missions[stage];selectedTool=next.tool;renderMission();say(m.success+' Berikutnya: '+next.title+'.','good')}
 else{renderMission();$('actionBtn').textContent='Selesai! ✓';$('sceneTitle').textContent='PC berhasil dirakit';$('missionTitle').textContent='Selamat, teknisi!';$('missionDesc').textContent='Kamu menuntaskan semua misi. Ini adalah hasil latihan virtual, bukan bukti bahwa perangkat fisik pasti akan berhasil menyala.';$('objectiveTitle').textContent='POST SIMULASI BERHASIL';$('objectiveText').textContent='Nilai latihan: '+Math.round(done.size/components.length*100)+'% komponen/misi selesai. Ulangi untuk berlatih lagi.';say('Misi selesai! Kamu berhasil menyelesaikan Build Quest. Tekan ⟳ di bagian atas untuk reset tampilan atau muat ulang halaman untuk progres yang tersimpan.','good')}
}
function resetGame(){if(!confirm('Reset semua misi dan mulai dari awal?'))return;done=new Set();stage=0;selectedTarget=null;selectedTool='screwdriver';save();renderMission();say('Game direset. Mulai dari persiapan meja kerja.')}
$('actionBtn').addEventListener('click',performAction);$('prevBtn').addEventListener('click',()=>{if(stage>0){stage--;selectedTarget=null;selectedTool=missions[stage].tool;renderMission();say('Kembali ke misi sebelumnya. Progres yang sudah selesai tetap tersimpan.')}});
$('resetView').addEventListener('click',resetGame);$('resetCam').addEventListener('click',()=>{targetX=-.08;targetY=-.55;zoom=1;autoRotate=false;$('rotate').style.color=''});$('rotate').addEventListener('click',()=>{autoRotate=!autoRotate;$('rotate').style.color=autoRotate?'#43ddb1':''});$('zoomIn').addEventListener('click',()=>zoom=Math.max(.72,zoom-.1));$('zoomOut').addEventListener('click',()=>zoom=Math.min(1.4,zoom+.1));
$('helpBtn').onclick=()=>{$('helpModal').hidden=false};$('closeHelp').onclick=$('closeHelp2').onclick=()=>{$('helpModal').hidden=true};$('helpModal').addEventListener('click',e=>{if(e.target===$('helpModal'))$('helpModal').hidden=true});
build();renderMission();
if(done.size)say('Progres sebelumnya ditemukan di browser ini. Kamu bisa lanjut atau reset game.','good');
})();