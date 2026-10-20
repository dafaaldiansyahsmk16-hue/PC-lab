(() => {
  const parts = [
    {id:'motherboard', name:'Motherboard', short:'Papan utama', symbol:'▤', title:'Kenali motherboard', desc:'Motherboard adalah papan utama yang menghubungkan komponen PC. Perhatikan bentuk dan posisi soketnya.', tip:'Motherboard harus cocok dengan ukuran casing dan jenis prosesor.', action:'Pasang motherboard'},
    {id:'cpu', name:'Prosesor (CPU)', short:'Otak komputer', symbol:'▦', title:'Pasang prosesor (CPU)', desc:'CPU menjalankan instruksi komputer. Pada praktik nyata, cocokkan tanda segitiga dan jangan menekan prosesor dengan paksa.', tip:'Pastikan jenis soket CPU sesuai dengan motherboard.', action:'Pasang prosesor'},
    {id:'ram', name:'RAM', short:'Memori sementara', symbol:'▥', title:'Pasang RAM', desc:'RAM menyimpan data sementara saat komputer bekerja. Perhatikan celah pada RAM agar sesuai dengan slotnya.', tip:'Posisi celah RAM berbeda-beda menurut generasinya.', action:'Pasang RAM'},
    {id:'storage', name:'SSD', short:'Penyimpanan data', symbol:'▰', title:'Pasang SSD', desc:'SSD menyimpan sistem operasi, aplikasi, dan berkas. Pada simulasi ini SSD digambarkan sebagai modul penyimpanan.', tip:'Pastikan jenis dan konektor SSD cocok dengan perangkat.', action:'Pasang SSD'},
    {id:'gpu', name:'Kartu grafis (GPU)', short:'Mengolah grafis', symbol:'▰', title:'Pasang kartu grafis', desc:'GPU membantu mengolah tampilan grafis. Tidak semua PC membutuhkan GPU terpisah karena beberapa CPU memiliki grafis terintegrasi.', tip:'Periksa panjang GPU dan kebutuhan daya sebelum praktik nyata.', action:'Pasang GPU'},
    {id:'psu', name:'Power supply (PSU)', short:'Sumber daya listrik', symbol:'▦', title:'Pasang power supply', desc:'PSU mengubah dan menyalurkan daya listrik ke komponen PC melalui kabel daya yang sesuai.', tip:'Untuk praktik asli, matikan listrik dan ikuti arahan guru. Jangan membuka casing PSU.', action:'Pasang PSU'}
  ];
  const $ = id => document.getElementById(id);
  let mode = 'guided', step = 0, selected = 'motherboard', installed = new Set(), autoRotate = false;
  let scene, camera, renderer, group, meshes = {}, drag = false, lastX = 0, lastY = 0, targetRotX = -0.12, targetRotY = -0.55, zoom = 1, pointerDown = null;
  const order = parts.map(p=>p.id);
  const guideOrder = ['motherboard','cpu','ram','storage','gpu','psu'];
  const saved = (()=>{try{return JSON.parse(localStorage.getItem('pclab-progress')||'{}')}catch(e){return {}}})();
  if (Array.isArray(saved.installed)) installed = new Set(saved.installed.filter(id=>order.includes(id)));
  function save(){try{localStorage.setItem('pclab-progress',JSON.stringify({installed:[...installed],mode}))}catch(e){}}
  function currentPartId(){return mode==='guided'?guideOrder[Math.min(step,guideOrder.length-1)]:selected}
  function notify(msg,type=''){const el=$('feedback');el.textContent=msg;el.className='feedback'+(type?' '+type:'')}
  function renderList(){
    $('componentList').innerHTML='';
    parts.forEach(p=>{
      const b=document.createElement('button');b.className='component-item'+(selected===p.id?' selected':'')+(installed.has(p.id)?' installed':'');
      b.innerHTML=`<span class="part-symbol">${installed.has(p.id)?'✓':p.symbol}</span><span class="part-copy"><b>${p.name}</b><small>${p.short}</small></span><span class="part-state">${installed.has(p.id)?'✓':'›'}</span>`;
      b.addEventListener('click',()=>{selected=p.id;if(mode==='guided'){const idx=guideOrder.indexOf(p.id);if(idx!==step&&!installed.has(p.id)){notify('Mode panduan mengikuti urutan. Selesaikan langkah aktif terlebih dahulu.','error');return}}renderLesson();renderList();highlightPart(p.id);});
      $('componentList').appendChild(b);
    });
    $('installedCount').textContent=`${installed.size} / ${parts.length} terpasang`;
  }
  function renderLesson(){
    const p=parts.find(x=>x.id===currentPartId())||parts[0];
    $('simTitle').textContent=mode==='guided'?'Rakit PC — Mode Panduan':'Rakit PC — Mode Bebas';
    $('lessonTitle').textContent=mode==='guided'?(installed.has(p.id)?p.name+' sudah terpasang':p.title):p.name;
    $('lessonText').textContent=mode==='guided'?p.desc:`${p.short}. ${p.desc} Pilih komponen lain dari daftar untuk merakit dengan urutanmu sendiri.`;
    $('tipTitle').textContent=mode==='guided'?'Tips pemula':'Ingat sebelum praktik';
    $('tipText').textContent=p.tip;
    $('stepBadge').textContent=mode==='guided'?`${String(Math.min(step+1,6)).padStart(2,'0')} / 06`:'MODE BEBAS';
    $('progressText').textContent=mode==='guided'?`Langkah ${Math.min(step+1,6)} dari 6`:`${installed.size} dari 6 komponen terpasang`;
    const pct=Math.round(installed.size/parts.length*100);
    $('progressPercent').textContent=pct+'%';$('progressBar').style.width=pct+'%';
    $('backBtn').disabled=mode==='free'||step===0;
    $('actionBtn').innerHTML=installed.has(p.id)?'Sudah terpasang <span>✓</span>':(mode==='guided'?p.action:'Pasang komponen')+' <span>→</span>';
    $('actionBtn').disabled=installed.has(p.id);
    renderList();updateMeshes();
  }
  function chooseMode(m){
    mode=m;
    $('guidedMode').classList.toggle('active',m==='guided');$('freeMode').classList.toggle('active',m==='free');
    if(m==='guided'){
      step=guideOrder.findIndex(id=>!installed.has(id));if(step<0)step=5;
      selected=guideOrder[step];
      notify(installed.size===6?'Semua komponen selesai. Kamu bisa reset lalu mencoba lagi.':'Ikuti komponen yang sedang disorot, lalu tekan tombol pasang.');
    }else{
      selected=parts.find(p=>!installed.has(p.id))?.id||'motherboard';
      notify('Mode bebas aktif. Pilih komponen mana saja, lalu pasang. Sistem akan memberi umpan balik.');
    }
    renderLesson();
  }
  function installSelected(){
    const id=mode==='guided'?guideOrder[step]:selected;
    if(installed.has(id)){notify('Komponen ini sudah terpasang. Pilih komponen lain.');return}
    if(mode==='guided'&&id!==guideOrder[step]){notify('Belum urut. Selesaikan langkah yang disorot dahulu.','error');return}
    installed.add(id);selected=id;save();
    if(mode==='guided'){
      if(installed.size===6){notify('Hebat! Semua komponen demo sudah terpasang. Reset untuk latihan ulang.','success');renderLesson();return}
      step=guideOrder.findIndex(x=>!installed.has(x));selected=guideOrder[step];
      notify('Benar! '+parts.find(p=>p.id===id).name+' berhasil dipasang. Lanjut ke komponen berikutnya.','success');
    }else{
      notify('Komponen '+parts.find(p=>p.id===id).name+' ditambahkan ke rakitan. Pilih komponen lain untuk melanjutkan.','success');
      const next=parts.find(p=>!installed.has(p.id));if(next)selected=next.id;
      if(installed.size===6)notify('Mantap! Semua komponen demo terpasang. Kamu menyelesaikan mode bebas.','success');
    }
    renderLesson();
  }
  function reset(){
    installed=new Set();step=0;selected='motherboard';save();chooseMode(mode);notify('Simulasi diulang. Mulai lagi dari awal.');
  }
  $('guidedMode').addEventListener('click',()=>chooseMode('guided'));
  $('freeMode').addEventListener('click',()=>chooseMode('free'));
  $('actionBtn').addEventListener('click',installSelected);
  $('backBtn').addEventListener('click',()=>{if(mode==='guided'&&step>0){step--;selected=guideOrder[step];renderLesson();notify('Kamu kembali ke langkah sebelumnya. Komponen yang sudah terpasang tetap tersimpan.')}});
  $('resetBtn').addEventListener('click',()=>{if(confirm('Ulangi simulasi dan hapus progres pemasangan?'))reset()});
  $('helpBtn').addEventListener('click',()=>{$('helpModal').hidden=false});
  $('closeHelp').addEventListener('click',()=>{$('helpModal').hidden=true});
  $('gotItBtn').addEventListener('click',()=>{$('helpModal').hidden=true});
  $('helpModal').addEventListener('click',e=>{if(e.target===$('helpModal'))$('helpModal').hidden=true});

  function mat(color,rough=.5,metal=.2,transparent=false,opacity=1){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,transparent,opacity})}
  function box(w,h,d,material,x,y,z,groupRef=group){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;groupRef.add(m);return m}
  function cylinder(r1,r2,h,material,x,y,z,segments=32){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),material);m.position.set(x,y,z);m.castShadow=true;group.add(m);return m}
  function buildScene(){
    const root=$('threeRoot');
    if(!window.THREE){root.innerHTML='<div class="no-webgl">Model 3D tidak dapat dimuat. Periksa koneksi internet lalu muat ulang.</div>';return}
    scene=new THREE.Scene();scene.background=null;
    camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(5.5,4.1,7.6);camera.lookAt(0,1.5,0);
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputEncoding=THREE.sRGBEncoding;
    root.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0x9dcaff,0x0a1220,1.45));
    const key=new THREE.DirectionalLight(0xd8ecff,2.1);key.position.set(4,7,5);key.castShadow=true;scene.add(key);
    const blueLight=new THREE.PointLight(0x148aff,1.3,10);blueLight.position.set(-3,2,3);scene.add(blueLight);
    const greenLight=new THREE.PointLight(0x27e3b3,.65,8);greenLight.position.set(2,1,3);scene.add(greenLight);
    const floor=new THREE.Mesh(new THREE.CircleGeometry(4,48),mat(0x0b1a2a,.9,0));floor.rotation.x=-Math.PI/2;floor.position.y=-.04;floor.scale.set(1.1,1.1,1.1);scene.add(floor);
    group=new THREE.Group();scene.add(group);
    const dark=mat(0x172b40,.38,.7),edge=mat(0x45647e,.3,.75),black=mat(0x07111c,.4,.35),board=mat(0x163e42,.55,.25),blue=mat(0x159bff,.28,.45),silver=mat(0x9bb2c6,.3,.75),gold=mat(0xd6aa4b,.3,.7),glass=mat(0x3b82b8,.2,.25,true,.15);
    // Case: open-front frame with dark side rails
    box(2.6,.12,1.65,dark,0,0,0);box(2.6,.12,1.65,dark,0,3.25,0);
    box(.12,3.25,1.65,edge,-1.24,1.62,0);box(.12,3.25,1.65,edge,1.24,1.62,0);
    box(2.45,3.15,.08,black,0,1.62,-.79);
    // Front glass outline and side panel
    box(2.35,.07,.07,edge,0,.08,.83);box(2.35,.07,.07,edge,0,3.16,.83);
    box(.07,3.0,.07,edge,-1.15,1.62,.83);box(.07,3.0,.07,edge,1.15,1.62,.83);
    box(2.22,2.88,.025,glass,0,1.62,.82);
    // Fans on front plane
    for(let y of [.65,1.62,2.59]){
      const ring=cylinder(.34,.34,.06,edge,0,y,.9,32);ring.rotation.x=Math.PI/2;
      const hub=cylinder(.12,.12,.07,blue,0,y,.95,24);hub.rotation.x=Math.PI/2;
      for(let i=0;i<4;i++){const a=i*Math.PI/2;const blade=box(.08,.24,.025,blue,Math.cos(a)*.16,y+Math.sin(a)*.16,.96);blade.rotation.z=a;}
    }
    // Motherboard plate on inside back
    meshes.motherboard=box(1.7,2.45,.12,board,.05,1.7,-.62);
    // decorative board traces
    for(let i=0;i<5;i++)box(.025,.8,.025,mat(0x2f9b90,.6,.3),-.62+i*.22,1.6,-.54);
    // CPU socket
    meshes.cpu=box(.48,.48,.15,silver,-.18,2.2,-.48);
    box(.36,.36,.035,mat(0x26394a,.3,.55),-.18,2.2,-.38);
    box(.25,.25,.04,mat(0x68d6d0,.25,.6),-.18,2.2,-.34);
    // RAM slots and sticks
    for(let i=0;i<2;i++){box(.16,1.05,.09,black,.48+i*.22,2.12,-.46);meshes['ram'+i]=box(.12,.82,.1,mat(0x1c9c90,.4,.4),.48+i*.22,2.12,-.39)}
    // GPU body
    meshes.gpu=box(1.45,.34,.42,dark,.12,1.1,-.28);
    box(1.25,.08,.06,blue,.12,1.1,-.04);
    for(let x of [-.32,.12,.56]){const fan=cylinder(.12,.12,.04,edge,x,1.1,-.04,24);fan.rotation.x=Math.PI/2}
    // PSU bottom right and SSD
    meshes.psu=box(.86,.56,.66,black,.65,.42,-.25);
    box(.68,.06,.04,edge,.65,.42,.1);
    meshes.storage=box(.48,.22,.12,silver,-.65,.58,-.4);
    // small cables
    const curveMat=mat(0x1e80d7,.6,.25);
    const cablePoints=[new THREE.Vector3(.65,.65,-.1),new THREE.Vector3(.6,1.0,-.2),new THREE.Vector3(.3,1.5,-.35),new THREE.Vector3(-.1,2.0,-.35)];
    const curve=new THREE.CatmullRomCurve3(cablePoints);const cable=new THREE.Mesh(new THREE.TubeGeometry(curve,24,.025,6,false),curveMat);group.add(cable);
    // case feet
    box(.42,.12,.5,black,-.82,-.08,.08);box(.42,.12,.5,black,.82,-.08,.08);
    const floorGrid=new THREE.GridHelper(10,20,0x17334d,0x10253a);floorGrid.position.y=-.02;scene.add(floorGrid);
    updateMeshes();
    const resize=()=>{const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};
    window.addEventListener('resize',resize);resize();
    renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;pointerDown={x:e.clientX,y:e.clientY};renderer.domElement.setPointerCapture?.(e.pointerId)});
    renderer.domElement.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;targetRotY+=dx*.009;targetRotX=Math.max(-.7,Math.min(.65,targetRotX+dy*.006));lastX=e.clientX;lastY=e.clientY});
    const stop=()=>{drag=false;setTimeout(()=>pointerDown=null,0)};
    renderer.domElement.addEventListener('pointerup',stop);renderer.domElement.addEventListener('pointercancel',stop);
    renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.72,Math.min(1.45,zoom+(e.deltaY>0?-.06:.06)))},{passive:false});
    const animate=()=>{requestAnimationFrame(animate);if(!renderer)return;if(autoRotate&&!drag)targetRotY+=.003;group.rotation.y+=(targetRotY-group.rotation.y)*.08;group.rotation.x+=(targetRotX-group.rotation.x)*.08;camera.position.set(5.5/zoom,4.1/zoom,7.6/zoom);camera.lookAt(0,1.55,0);renderer.render(scene,camera)};
    animate();
  }
  function updateMeshes(){
    if(!meshes||!group)return;
    const colorOn=0x2bd9a2,colorOff=0x163e42;
    if(meshes.motherboard)meshes.motherboard.material.color.setHex(installed.has('motherboard')?colorOn:colorOff);
    if(meshes.cpu)meshes.cpu.material.color.setHex(installed.has('cpu')?0x4ddac4:0x9bb2c6);
    ['ram0','ram1'].forEach(k=>{if(meshes[k])meshes[k].material.color.setHex(installed.has('ram')?0x39dfaa:0x1c9c90)});
    if(meshes.storage)meshes.storage.material.color.setHex(installed.has('storage')?0x39dfaa:0x9bb2c6);
    if(meshes.gpu)meshes.gpu.material.color.setHex(installed.has('gpu')?0x31d8a3:0x172b40);
    if(meshes.psu)meshes.psu.material.color.setHex(installed.has('psu')?0x31d8a3:0x07111c);
    if(selected&&meshes[selected]&&meshes[selected].material&&meshes[selected].material.emissive){meshes[selected].material.emissive.setHex(0x063b59)}
  }
  function highlightPart(id){targetRotY=id==='gpu'?-.2:id==='psu'?.4:-.55;updateMeshes()}
  $('rotateBtn').addEventListener('click',()=>{autoRotate=!autoRotate;$('rotateBtn').style.color=autoRotate?'#55e8bc':'';$('rotateBtn').title=autoRotate?'Matikan putar otomatis':'Putar otomatis'});
  $('zoomInBtn').addEventListener('click',()=>{zoom=Math.max(.72,zoom-.1)});
  $('zoomOutBtn').addEventListener('click',()=>{zoom=Math.min(1.45,zoom+.1)});
  $('centerBtn').addEventListener('click',()=>{targetRotX=-.12;targetRotY=-.55;zoom=1;autoRotate=false;$('rotateBtn').style.color=''});
  buildScene();
  chooseMode('guided');
  if(installed.size){notify('Progres sebelumnya ditemukan di perangkat ini. Kamu bisa lanjut atau tekan ↻ untuk mengulang.','success')}
})();