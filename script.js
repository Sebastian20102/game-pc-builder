// ============================================
// ============================================
// UTILIDADES Y HELPERS
// ============================================

const Utils = {
    animateCountUp(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('es-ES');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString('es-ES');
            }
        }, 16);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

// ============================================
// GENERADOR DE CATALOGO DE HARDWARE (GRANDE)
// ============================================

function generateLargeCatalog() {
    const catalog = {};

    // Stable PRNG for repeatability
    let seed = 54321;
    const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

    // Utility helpers
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // --- CPUs: exact 50 ---
    const cpuList = [];
    const intelSeries = [ {series:'i3', base:100},{series:'i5', base:180},{series:'i7', base:300},{series:'i9', base:600} ];
    const intelGens = ['8th','9th','10th','11th','12th','13th','14th','15th'];
    const amdSeries = [ {series:'Ryzen 3', base:90},{series:'Ryzen 5', base:170},{series:'Ryzen 7', base:320},{series:'Ryzen 9', base:520} ];
    const amdGens = ['2000','3000','4000','5000','6000','7000'];

    let cid = 1;
    // create 25 Intel, 25 AMD (total 50)
    for (let i=0;i<25;i++){
        const s = intelSeries[i % intelSeries.length];
        const gen = intelGens[i % intelGens.length];
        const variant = (i%5===0)?'K': (i%7===0)?'KF': ((i%3===0)?'F':'');
        const cores = (s.series==='i3'?4: s.series==='i5'?6 + (i%3): s.series==='i7'?8 + (i%5):12 + (i%6));
        const threads = cores * 2;
        const socket = (['12th','13th','14th','15th'].includes(gen)) ? 'LGA1700' : (['10th','11th'].includes(gen) ? 'LGA1200' : 'LGA1151');
        const price = Math.round(s.base * (1 + rnd()*1.8));
        cpuList.push({ id:`cpu${cid++}`, brand:'Intel', model:`Intel Core ${s.series.toUpperCase()}-${gen}${variant}`.trim(), series:s.series, generation:gen, variant:variant, cores, threads, baseSpeed:`${3 + Math.floor(rnd()*2)}.0 GHz`, boostSpeed:`${4 + Math.floor(rnd()*2)}.5 GHz`, socket, tdp:`${65 + Math.round(rnd()*220)}W`, price, gamingScore: clamp(Math.round(50 + rnd()*50),50,100), powerScore: clamp(Math.round(40 + rnd()*60),40,100), level: (price>500?'enthusiast': price>300?'pro': price>150?'gaming':'entry') });
    }
    for (let i=0;i<25;i++){
        const s = amdSeries[i % amdSeries.length];
        const gen = amdGens[i % amdGens.length];
        const variant = (i%6===0)?'X': (i%4===0)?'XT':'';
        const cores = (s.series.includes('3')?4: s.series.includes('5')?6 + (i%4): s.series.includes('7')?8 + (i%5):12 + (i%6));
        const threads = cores * 2;
        const socket = (['6000','7000'].includes(gen)) ? 'AM5' : 'AM4';
        const price = Math.round(s.base * (1 + rnd()*1.6));
        cpuList.push({ id:`cpu${cid++}`, brand:'AMD', model:`AMD ${s.series} ${gen}${variant}`.trim(), series:s.series, generation:gen, variant:variant, cores, threads, baseSpeed:`${3 + Math.floor(rnd()*2)}.2 GHz`, boostSpeed:`${4 + Math.floor(rnd()*2)}.6 GHz`, socket, tdp:`${65 + Math.round(rnd()*200)}W`, price, gamingScore: clamp(Math.round(50 + rnd()*50),50,100), powerScore: clamp(Math.round(45 + rnd()*55),45,100), level: (price>500?'enthusiast': price>300?'pro': price>150?'gaming':'entry') });
    }

    // --- GPUs: exact 50 ---
    const gpuList = [];
    const nvidiaFamilies = ['GTX 1060','GTX 1660','RTX 2060','RTX 2070','RTX 3060','RTX 3070','RTX 3080','RTX 3090','RTX 4070','RTX 4080','RTX 4090'];
    const amdFamilies = ['Radeon RX 580','RX 590','RX 5500','RX 5600','RX 5700','RX 6600','RX 6700','RX 6800','RX 6900','RX 7700','RX 7900'];
    let gid = 1;
    // create 25 NVIDIA-like and 25 AMD-like
    for (let i=0;i<25;i++){
        const family = nvidiaFamilies[i % nvidiaFamilies.length];
        const variant = (i%4===0)?'Ti': (i%5===0)?'Super':'';
        const mem = [6,8,10,12,16,24][i % 6];
        const tdp = 100 + Math.round(rnd()*450);
        const price = Math.round(150 + Math.round(tdp*2.5) + (mem*20));
        gpuList.push({ id:`gpu${gid++}`, brand:'NVIDIA', model:`NVIDIA ${family} ${variant}`.trim(), family, variant, memory:`${mem}GB`, clock:`${1 + Math.round(rnd()*2)}.5 GHz`, tdp:`${tdp}W`, price, gamingScore: clamp(Math.round(40 + (tdp/6) + rnd()*20),40,100), powerScore: clamp(Math.round(30 + rnd()*70),30,100), level: (price>1000?'enthusiast': price>500?'pro': price>250?'gaming':'entry') });
    }
    for (let i=0;i<25;i++){
        const family = amdFamilies[i % amdFamilies.length];
        const variant = (i%3===0)?'XT': (i%7===0)?'X':'';
        const mem = [4,6,8,12,16,24][i % 6];
        const tdp = 90 + Math.round(rnd()*420);
        const price = Math.round(120 + Math.round(tdp*2.2) + (mem*18));
        gpuList.push({ id:`gpu${gid++}`, brand:'AMD', model:`AMD ${family} ${variant}`.trim(), family, variant, memory:`${mem}GB`, clock:`${1 + Math.round(rnd()*2)}.3 GHz`, tdp:`${tdp}W`, price, gamingScore: clamp(Math.round(38 + (tdp/6) + rnd()*22),38,100), powerScore: clamp(Math.round(35 + rnd()*65),35,100), level: (price>900?'enthusiast': price>450?'pro': price>220?'gaming':'entry') });
    }

    // --- Motherboards: at least 40 ---
    const mbList = [];
    const mbVendors = ['ASUS','MSI','GIGABYTE','ASRock','EVGA','Biostar','Supermicro'];
    let mbid = 1;
    const sockets = ['LGA1700','LGA1200','LGA1151','AM4','AM5'];
    // make 40 entries mapping to CPU sockets
    for (let i=0;i<40;i++){
        const vendor = pick(mbVendors);
        const socket = pick(sockets);
        const formFactor = pick(['ATX','mATX','ITX']);
        const chipset = socket.startsWith('LGA') ? `Z${690 + (i%5)}` : `X${470 + (i%5)}`;
        const price = Math.round(80 + rnd()*350);
        const compatibility = cpuList.filter(c => {
            if (!c.socket) return false;
            if (socket === 'AM4') return c.socket === 'AM4';
            if (socket === 'AM5') return c.socket === 'AM5';
            return c.socket === socket;
        }).slice(0, 12).map(c=>c.id);
        const supportedRam = (socket === 'AM5' || socket === 'LGA1700') ? 'DDR5' : 'DDR4';
        mbList.push({ id:`mb${mbid++}`, brand:vendor, model:`${vendor} ${chipset} ${formFactor}`, socket, chipset, formFactor, supportedRam, compatibility, price, gamingScore: clamp(Math.round(60 + rnd()*30),60,95), valueScore: clamp(Math.round(55 + rnd()*40),55,95) });
    }

    // --- RAM: at least 30 kits ---
    const ramList = [];
    let ramid = 1;
    const ramTypes = ['DDR4','DDR5'];
    const capacities = [8,16,32,64];
    while (ramList.length < 30){
        const type = pick(ramTypes);
        const cap = pick(capacities);
        const speed = type==='DDR5' ? (4800 + Math.round(rnd()*2400)) : (2400 + Math.round(rnd()*1600));
        const price = Math.round(cap * (type==='DDR5' ? 12 : 6) * (1 + rnd()*0.8));
        ramList.push({ id:`ram${ramid++}`, brand: pick(['Corsair','G.Skill','Kingston','Crucial','Patriot']), model:`${cap}GB ${type} ${speed}MHz`, type, capacity:`${cap}GB`, speed:`${speed}MHz`, latency:`CAS ${16 + Math.round(rnd()*10)}`, tdp:`${5 + Math.round(rnd()*8)}W`, price, gamingScore: clamp(Math.round(55 + rnd()*40),55,95), valueScore: clamp(Math.round(50 + rnd()*45),50,95) });
    }

    // --- Storage: at least 25 ---
    const storageList = [];
    let sid = 1;
    const storageTemplates = [ {type:'NVMe SSD', sizes:[250,500,1000,2000,4000]}, {type:'SATA SSD', sizes:[250,500,1000]}, {type:'HDD', sizes:[1000,2000,4000,8000]} ];
    while (storageList.length < 25){
        const tpl = pick(storageTemplates);
        const size = pick(tpl.sizes);
        const price = Math.round((size/250) * (tpl.type==='NVMe SSD' ? 40 : tpl.type==='SATA SSD' ? 20 : 15));
        storageList.push({ id:`storage${sid++}`, brand: pick(['Samsung','WD','Seagate','Crucial','Kingston']), model:`${tpl.type} ${size}GB`, type: tpl.type, capacity:`${size}GB`, speed: tpl.type==='NVMe SSD'?'3000-7000 MB/s': tpl.type==='SATA SSD'?'500-600 MB/s':'7200 RPM', form: tpl.type==='HDD'?'3.5"':'M.2', price, gamingScore: clamp(Math.round(50 + rnd()*40),50,95), valueScore: clamp(Math.round(50 + rnd()*45),50,95) });
    }

    // --- PSUs: at least 20 ---
    const psuList = [];
    let psid = 1;
    const watts = [450,550,650,750,850,1000,1200];
    while (psuList.length < 20){
        const w = pick(watts);
        const eff = pick(['80+ Bronze','80+ Gold','80+ Platinum']);
        const price = Math.round(w/2 + (eff.includes('Gold')?30: eff.includes('Platinum')?80:10) + rnd()*40);
        psuList.push({ id:`psu${psid++}`, brand: pick(['Corsair','Seasonic','EVGA','Thermaltake','Cooler Master']), model:`${w}W ${eff}`, wattage:`${w}W`, efficiency:eff, modular: rnd()>0.5?'Fully':'Semi', fanless: rnd()>0.92?'Yes':'No', price, gamingScore: clamp(Math.round(60 + rnd()*30),60,95), valueScore: clamp(Math.round(55 + rnd()*35),55,95) });
    }

    // --- Cooling: at least 20 ---
    const coolList = [];
    let coid = 1;
    const coolTypes = ['Air Cooler','AIO 120mm','AIO 240mm','AIO 360mm'];
    while (coolList.length < 20){
        const t = pick(coolTypes);
        const price = Math.round(30 + rnd()*250);
        coolList.push({ id:`cool${coid++}`, brand: pick(['Noctua','Corsair','be quiet!','NZXT','Cooler Master']), model:`${t} ${coid}`, type: t.includes('AIO')?'Liquid':'Air', tdpRating:`${150 + Math.round(rnd()*300)}W`, price, gamingScore: clamp(Math.round(60 + rnd()*30),60,98), valueScore: clamp(Math.round(55 + rnd()*35),55,95) });
    }

    // --- Cases: at least 20 ---
    const caseList = [];
    let caid = 1;
    const caseForms = ['ATX','mATX','ITX'];
    while (caseList.length < 20){
        const form = pick(caseForms);
        const price = Math.round(40 + rnd()*260);
        caseList.push({ id:`case${caid++}`, brand: pick(['Lian Li','Corsair','Fractal','NZXT','Cooler Master']), model:`Case ${form} ${caid}`, formFactor:form, rgb: rnd()>0.5, price, airflow: pick(['Bueno','Muy Bueno','Excelente']), gamingScore: clamp(Math.round(60 + rnd()*30),60,95), valueScore: clamp(Math.round(55 + rnd()*35),55,95) });
    }

    // Peripherals and monitors (kept reasonable)
    const perList = [];
    let perid = 1;
    const perTypes = ['Keyboard','Mouse','Headset','Mousepad'];
    while (perList.length < 30){
        const t = pick(perTypes);
        perList.push({ id:`per${perid++}`, brand: pick(['Corsair','Logitech','Razer','SteelSeries','HyperX']), model:`${t} Model ${perid}`, type:t, features: pick(['RGB','Wireless','Wired']), price: Math.round(15 + rnd()*300), gamingScore: clamp(Math.round(50 + rnd()*45),50,95), valueScore: clamp(Math.round(50 + rnd()*45),50,95) });
    }

    // Consoles small list
    const conList = [ { id:'con1', name:'PlayStation 5', specs:'4K UHD, 120fps', storage:'825GB SSD', price:499, gamingScore:95, valueScore:90 }, { id:'con2', name:'Xbox Series X', specs:'4K UHD, 120fps', storage:'1TB SSD', price:499, gamingScore:94, valueScore:89 }, { id:'con3', name:'Nintendo Switch OLED', specs:'1080p Handheld', storage:'64GB', price:349, gamingScore:88, valueScore:92 } ];

    // Assign to catalog
    catalog.cpu = cpuList;
    catalog.gpu = gpuList;
    catalog.motherboard = mbList;
    catalog.ram = ramList;
    catalog.storage = storageList;
    catalog.psu = psuList;
    catalog.cooling = coolList;
    catalog.case = caseList;
    catalog.monitor = [];
    catalog.peripherals = perList;
    catalog.console = conList;

    // Expose counts for debugging
    catalog._counts = Object.fromEntries(Object.keys(catalog).map(k=>[k, catalog[k].length]));
    return catalog;
}

const HardwareDatabase = generateLargeCatalog();

// ============================================
// ORGANIZADOR POR POTENCIA / RENDIMIENTO
// ============================================

// Helper: parse integer from strings like '650W', '12GB', '6000MHz', '3000-7000 MB/s'
function parseNumber(str){
    if (!str && str !== 0) return 0;
    if (typeof str === 'number') return str;
    const m = (''+str).match(/\d+(?:\.\d+)?/g);
    if (!m) return 0;
    // take largest number found (e.g., range '3000-7000' -> 7000)
    return Math.max(...m.map(x=>parseFloat(x)));
}

function computeTierFromMetric(items, metricKey){
    if (!Array.isArray(items) || items.length === 0) return;
    let vals = items.map(i => (i[metricKey] != null ? i[metricKey] : 0));
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = (max - min) || 1;
    items.forEach(it => {
        const v = (it[metricKey] != null ? it[metricKey] : 0);
        const norm = Math.round(((v - min) / range) * 100);
        it._powerScore = norm;
        if (norm < 60) it.powerTier = 'entry';
        else if (norm < 75) it.powerTier = 'mid';
        else if (norm < 90) it.powerTier = 'high';
        else it.powerTier = 'enthusiast';
    });
}

// CPU: multi-core performance estimate
function cpuMetric(cpu){
    const cores = cpu.cores || parseNumber(cpu.cores) || 1;
    const base = parseNumber(cpu.baseSpeed || cpu.base || '3') || 3;
    const gaming = cpu.gamingScore || 50;
    // cores * baseGHz weighted plus gamingScore
    return cores * base * 20 + gaming * 1.5;
}

// GPU: gaming performance index
function gpuMetric(gpu){
    const gaming = gpu.gamingScore || 50;
    const mem = parseNumber(gpu.memory || gpu.mem || '8') || 8;
    // prefer gamingScore and memory, penalize very high TDP slightly
    const tdp = parseNumber(gpu.tdp || '0') || 0;
    return gaming * 2 + mem * 6 - Math.min(tdp/50, 10);
}

// RAM: frequency & latency efficiency
function ramMetric(ram){
    const speed = parseNumber(ram.speed || '2400');
    const latencyMatch = (''+(ram.latency||'')).match(/\d+/);
    const latency = latencyMatch ? parseInt(latencyMatch[0],10) : 16;
    const cap = parseNumber(ram.capacity || ram.capacityGB || '16') || 16;
    return (speed / Math.max(latency,1)) * Math.log2(Math.max(cap,1));
}

// Storage: NVMe > SATA > HDD based on speed string
function storageMetric(s){
    const speedStr = s.speed || s.model || '';
    const top = parseNumber(speedStr);
    // HDD fallback: RPM -> lower
    if (/RPM/i.test(speedStr) || /HDD/i.test(s.type || '')) return top || 150;
    return top || (s.type && s.type.includes('NVMe') ? 3000 : 500);
}

// PSU: wattage * efficiency multiplier
function psuMetric(p){
    const watt = parseNumber(p.wattage || p.model || p.watt || '550') || 550;
    const eff = (p.efficiency || '').toLowerCase();
    const mult = eff.includes('platinum') ? 1.15 : eff.includes('gold') ? 1.08 : 1.0;
    return watt * mult;
}

// Cooling: tdpRating number
function coolerMetric(c){
    return parseNumber(c.tdpRating || c.tdp || '150') || 150;
}

// Case: airflow and (maxGpuLength if available)
function caseMetric(cs){
    const airflowMap = { 'Excelente': 100, 'Muy Bueno': 80, 'Bueno': 60, 'High': 95, 'Medium': 75, 'Low': 50 };
    const airflow = airflowMap[cs.airflow] || parseNumber(cs.airflow) || 60;
    const gpuLen = parseNumber(cs.maxGpuLength || cs.maxGpu || '300') || 300;
    return airflow + (gpuLen / 10);
}

// Main organizer: annotate and sort arrays in-place, and return organized object
Utils.organizeComponentsByPower = function(components){
    if (!components || typeof components !== 'object') return components;

    // CPUs
    if (Array.isArray(components.cpu)){
        components.cpu.forEach(c=> c._metric = cpuMetric(c));
        computeTierFromMetric(components.cpu, '_metric');
        components.cpu.sort((a,b)=> b._metric - a._metric);
    }

    // GPUs
    if (Array.isArray(components.gpu)){
        components.gpu.forEach(g=> g._metric = gpuMetric(g));
        computeTierFromMetric(components.gpu, '_metric');
        components.gpu.sort((a,b)=> b._metric - a._metric);
    }

    // RAM
    if (Array.isArray(components.ram)){
        components.ram.forEach(r=> r._metric = ramMetric(r));
        computeTierFromMetric(components.ram, '_metric');
        components.ram.sort((a,b)=> b._metric - a._metric);
    }

    // Storage
    if (Array.isArray(components.storage)){
        components.storage.forEach(s=> s._metric = storageMetric(s));
        computeTierFromMetric(components.storage, '_metric');
        // prefer higher speed
        components.storage.sort((a,b)=> b._metric - a._metric);
    }

    // PSUs
    if (Array.isArray(components.psu)){
        components.psu.forEach(p=> p._metric = psuMetric(p));
        computeTierFromMetric(components.psu, '_metric');
        components.psu.sort((a,b)=> b._metric - a._metric);
    }

    // Coolers
    if (Array.isArray(components.cooling)){
        components.cooling.forEach(c=> c._metric = coolerMetric(c));
        computeTierFromMetric(components.cooling, '_metric');
        components.cooling.sort((a,b)=> b._metric - a._metric);
    }

    // Cases
    if (Array.isArray(components.case)){
        components.case.forEach(ca=> ca._metric = caseMetric(ca));
        computeTierFromMetric(components.case, '_metric');
        components.case.sort((a,b)=> b._metric - a._metric);
    }

    return components;
};

// Run organizer once so data is annotated and sorted for builder/comparator
Utils.organizeComponentsByPower(HardwareDatabase);

// ============================================
// BASE DE DATOS DE VIDEOJUEGOS
// ============================================

// ============================================
// BASE DE DATOS DE VIDEOJUEGOS
// ============================================

const GamesDatabase = [
    // 2024 - AAA Titles
    { id: 1, title: 'Cyberpunk 2077: Phantom Liberty', genre: ['Action', 'RPG'], platform: 'pc', year: 2024, emoji: '🌆', type: 'aaa', mode: ['single', 'multi'], minFPS: 60, recommendedFPS: 144, price: 60 },
    { id: 2, title: 'Dragon\'s Dogma 2', genre: ['RPG', 'Action'], platform: 'pc', year: 2024, emoji: '🐉', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 3, title: 'Final Fantasy VII Rebirth', genre: ['RPG'], platform: 'ps5', year: 2024, emoji: '⚔️', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 4, title: 'Helldivers 2', genre: ['Action', 'Shooter'], platform: 'pc', year: 2024, emoji: '💣', type: 'aaa', mode: ['coop', 'multi'], minFPS: 60, recommendedFPS: 144, price: 40 },
    { id: 5, title: 'Star Wars Outlaws', genre: ['Action', 'Adventure'], platform: 'pc', year: 2024, emoji: '⭐', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 6, title: 'Black Myth: Wukong', genre: ['Action', 'RPG'], platform: 'pc', year: 2024, emoji: '🧙', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 60 },
    { id: 7, title: 'S.T.A.L.K.E.R. 2', genre: ['FPS', 'RPG'], platform: 'xbox', year: 2024, emoji: '🔫', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 144, price: 70 },
    { id: 8, title: 'Indiana Jones and the Great Circle', genre: ['Adventure', 'Action'], platform: 'xbox', year: 2024, emoji: '🎩', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 9, title: 'Metaphor ReFantazio', genre: ['RPG'], platform: 'ps5', year: 2024, emoji: '🃏', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 60, price: 70 },
    { id: 10, title: 'College Football 25', genre: ['Sports'], platform: 'xbox', year: 2024, emoji: '🏈', type: 'aaa', mode: ['single', 'multi'], minFPS: 60, recommendedFPS: 120, price: 60 },
    
    // 2024 - Competitivos & eSports
    { id: 11, title: 'Call of Duty: Black Ops 6', genre: ['FPS'], platform: 'pc', year: 2024, emoji: '💥', type: 'esports', mode: ['single', 'multi'], minFPS: 120, recommendedFPS: 240, price: 70 },
    { id: 12, title: 'EA Sports FC 25', genre: ['Sports'], platform: 'pc', year: 2024, emoji: '⚽', type: 'aaa', mode: ['single', 'multi'], minFPS: 60, recommendedFPS: 120, price: 60 },
    { id: 13, title: 'Tekken 8', genre: ['Fighting'], platform: 'pc', year: 2024, emoji: '👊', type: 'esports', mode: ['single', 'multi'], minFPS: 120, recommendedFPS: 240, price: 60 },
    { id: 14, title: 'Fortnite Chapter 6', genre: ['Battle Royale'], platform: 'pc', year: 2024, emoji: '🎮', type: 'aaa', mode: ['multi'], minFPS: 144, recommendedFPS: 240, price: 0 },
    
    // 2024 - Indie & Horror
    { id: 15, title: 'Palworld', genre: ['Adventure', 'Action'], platform: 'pc', year: 2024, emoji: '📦', type: 'indie', mode: ['single', 'coop', 'multi'], minFPS: 60, recommendedFPS: 120, price: 30 },
    { id: 16, title: 'Silent Hill 2 Remake', genre: ['Horror'], platform: 'ps5', year: 2024, emoji: '👻', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 17, title: 'Elden Ring: Shadow of the Erdtree', genre: ['RPG', 'Action'], platform: 'pc', year: 2024, emoji: '⚔️', type: 'aaa', mode: ['single', 'multi'], minFPS: 60, recommendedFPS: 144, price: 40 },
    
    // 2023 - Clásicos recientes
    { id: 18, title: 'Baldur\'s Gate 3', genre: ['RPG'], platform: 'pc', year: 2023, emoji: '🗡️', type: 'aaa', mode: ['single', 'coop'], minFPS: 60, recommendedFPS: 100, price: 60 },
    { id: 19, title: 'Alan Wake 2', genre: ['Action', 'Horror'], platform: 'xbox', year: 2023, emoji: '💀', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 60 },
    { id: 20, title: 'Zelda Tears of the Kingdom', genre: ['Adventure'], platform: 'switch', year: 2023, emoji: '🗝️', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 60, price: 70 },
    { id: 21, title: 'Street Fighter 6', genre: ['Fighting'], platform: 'pc', year: 2023, emoji: '🥊', type: 'esports', mode: ['single', 'multi'], minFPS: 120, recommendedFPS: 240, price: 40 },
    { id: 22, title: 'Starfield', genre: ['RPG', 'Adventure'], platform: 'xbox', year: 2023, emoji: '🚀', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 23, title: 'Diablo IV', genre: ['RPG', 'Action'], platform: 'pc', year: 2023, emoji: '😈', type: 'aaa', mode: ['single', 'multi'], minFPS: 60, recommendedFPS: 120, price: 70 },
    { id: 24, title: 'Hogwarts Legacy', genre: ['RPG', 'Adventure'], platform: 'pc', year: 2023, emoji: '🪄', type: 'aaa', mode: ['single'], minFPS: 60, recommendedFPS: 100, price: 60 },
    { id: 25, title: 'Valorant', genre: ['FPS'], platform: 'pc', year: 2023, emoji: '🎯', type: 'esports', mode: ['multi'], minFPS: 240, recommendedFPS: 300, price: 0 },
    
    // Indie
    { id: 26, title: 'Hades', genre: ['Action', 'Adventure'], platform: 'pc', year: 2023, emoji: '🔥', type: 'indie', mode: ['single'], minFPS: 60, recommendedFPS: 120, price: 25 },
    { id: 27, title: 'Pizza Tower', genre: ['Puzzle', 'Action'], platform: 'pc', year: 2023, emoji: '🍕', type: 'indie', mode: ['single'], minFPS: 60, recommendedFPS: 144, price: 15 },
];

// ============================================
// BASE DE DATOS DE NOTICIAS
// ============================================

const NewsDatabase = [
    {
        id: 1,
        title: 'RTX 5090 superará los 600 TFLOPS en gaming',
        summary: 'NVIDIA anuncia especificaciones de la próxima generación Blackwell para gaming profesional.',
        category: 'pc',
        date: '2024-12-08'
    },
    {
        id: 2,
        title: 'PS5 Pro logra 120 FPS en más de 50 títulos',
        summary: 'La nueva consola profesional de Sony marca un antes y después en el rendimiento de séptima generación.',
        category: 'consolas',
        date: '2024-12-07'
    },
    {
        id: 3,
        title: 'Call of Duty bate récords con 100M de jugadores en día 1',
        summary: 'Black Ops 6 se convierte en el lanzamiento más grande de Call of Duty en historia.',
        category: 'esports',
        date: '2024-12-06'
    },
    {
        id: 4,
        title: 'Baldur\'s Gate 4 confirmado para 2026',
        summary: 'Larian Studios comienza producción del próximo título de su aclamada franquicia de RPG.',
        category: 'pc',
        date: '2024-12-05'
    },
    {
        id: 5,
        title: 'Intel Core Ultra 3 destroza benchmarks gaming',
        summary: 'Los nuevos procesadores Arrow Lake toman el primer lugar en rendimiento por watt.',
        category: 'pc',
        date: '2024-12-04'
    },
    {
        id: 6,
        title: 'Pokémon Legends Z lanza en Nintendo Switch 2',
        summary: 'Nuevo juego exclusivo para la consola next-gen de Nintendo con gráficos revolucionarios.',
        category: 'consolas',
        date: '2024-12-03'
    },
    {
        id: 7,
        title: 'Valorant World Championship 2024 estableció récord de audiencia',
        summary: 'Más de 50 millones de espectadores presenciaron la final global del shooter competitivo.',
        category: 'esports',
        date: '2024-12-02'
    },
    {
        id: 8,
        title: 'Samsung SSD NVMe 3 llega a 14,000 MB/s',
        summary: 'Nueva generación de almacenamiento duplica la velocidad del modelo anterior.',
        category: 'pc',
        date: '2024-12-01'
    },
    {
        id: 9,
        title: 'Mobile gaming generó $100B en 2024',
        summary: 'Los juegos para dispositivos móviles representan casi el 50% del mercado global gaming.',
        category: 'mobile',
        date: '2024-11-30'
    },
    {
        id: 10,
        title: 'League of Legends Worlds 2024 coronó nuevo campeón',
        summary: 'T1 se lleva el trofeo en la competencia de eSports más grande del mundo.',
        category: 'esports',
        date: '2024-11-28'
    }
];

// ============================================
// BASE DE DATOS DE BUILDS
// ============================================

const BuildsDatabase = [
    {
        tier: 'Gama Baja',
        price: '$700',
        cpu: 'AMD Ryzen 5 5500',
        gpu: 'NVIDIA RTX 4060',
        ram: '16GB DDR4',
        storage: 'SSD 512GB',
        psu: '550W',
        specs: [
            { name: 'CPU', value: 'Ryzen 5 5500' },
            { name: 'GPU', value: 'RTX 4060' },
            { name: 'RAM', value: '16GB' },
            { name: 'SSD', value: '512GB' }
        ],
        fps: [
            { game: 'Valorant', fps: 240 },
            { game: 'CS:GO', fps: 300 },
            { game: 'Fortnite', fps: 144 }
        ],
        use: 'Ideal para eSports competitivo y juegos indie'
    },
    {
        tier: 'Gama Media',
        price: '$1,400',
        cpu: 'Intel Core i7-13700K',
        gpu: 'NVIDIA RTX 4070',
        ram: '32GB DDR5',
        storage: 'SSD 1TB',
        psu: '750W',
        specs: [
            { name: 'CPU', value: 'Core i7-13700K' },
            { name: 'GPU', value: 'RTX 4070' },
            { name: 'RAM', value: '32GB' },
            { name: 'SSD', value: '1TB' }
        ],
        fps: [
            { game: 'Cyberpunk 2077', fps: 100 },
            { game: 'Avatar FoP', fps: 85 },
            { game: 'Alan Wake 2', fps: 110 }
        ],
        use: 'Perfecto para juegos AAA en 1440p 60+ FPS'
    },
    {
        tier: 'Gama Alta',
        price: '$2,800',
        cpu: 'AMD Ryzen 9 7950X3D',
        gpu: 'NVIDIA RTX 4090',
        ram: '64GB DDR5',
        storage: 'SSD 2TB',
        psu: '1000W',
        specs: [
            { name: 'CPU', value: 'Ryzen 9 7950X3D' },
            { name: 'GPU', value: 'RTX 4090' },
            { name: 'RAM', value: '64GB' },
            { name: 'SSD', value: '2TB' }
        ],
        fps: [
            { game: '4K Max Settings', fps: 240 },
            { game: 'Streaming + Gaming', fps: 120 },
            { game: 'Ray Tracing Ultra', fps: 100 }
        ],
        use: 'Para streamers y gaming ultra 4K a máxima calidad'
    }
];

// ============================================
// BASE DE DATOS DE OPINIONES
// ============================================

const ReviewsDatabase = [
    {
        name: 'Carlos Gamer',
        rating: 5,
        comment: 'Portal increíble para comparar hardware. Me ayudó a elegir mi build perfecta.'
    },
    {
        name: 'Luna Pro',
        rating: 5,
        comment: 'Las animaciones son suaves y el diseño gaming es impresionante. Recomendado 100%'
    },
    {
        name: 'Alex Streamer',
        rating: 4,
        comment: 'Excelente información, pero me gustaría más componentes en el comparador.'
    },
    {
        name: 'Delta Gaming',
        rating: 5,
        comment: 'La mejor plataforma para gamers competitivos. Interface pulida y profesional.'
    },
    {
        name: 'Nova Esports',
        rating: 5,
        comment: 'Finalmente una página que entiende lo que necesitan los gamers profesionales.'
    }
];

// ============================================
// INICIALIZACIÓN Y RENDERIZADO
// ============================================

class GamerVerse {
    constructor() {
        this.currentComponentType = 'cpu';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderNewsCards();
        this.renderGameCards();
        this.renderBuildCards();
        this.renderReviews();
        this.setupHardwareComparator();
        this.setupPCBuilder();
        this.animateStatistics();
        this.setupHeroCanvas();
        this.setupScrollAnimations();
        this.setupObserverAnimations();
    }

    // ============================================
    // NAVEGACIÓN
    // ============================================

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                navMenu?.classList.remove('active');
            });
        });

        // Actualizar nav activo al hacer scroll
        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateActiveNav();
        }, 100));
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // HERO SECTION CON CANVAS
    // ============================================

    setupHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        const ctx = canvas?.getContext('2d');

        if (!canvas) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ============================================
    // RENDERIZADO DE NOTICIAS
    // ============================================

    renderNewsCards() {
        const newsGrid = document.querySelector('.news-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');

        const displayNews = (filter = 'all') => {
            const filtered = filter === 'all' 
                ? NewsDatabase 
                : NewsDatabase.filter(n => n.category === filter);

            newsGrid.innerHTML = filtered.map(news => `
                <article class="news-card" onclick="this.scrollIntoView({behavior: 'smooth'})">
                    <div class="news-image">
                        <span class="news-badge">${news.category.toUpperCase()}</span>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-summary">${news.summary}</p>
                        <p class="news-date">${new Date(news.date).toLocaleDateString('es-ES')}</p>
                    </div>
                </article>
            `).join('');
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                displayNews(btn.dataset.filter);
            });
        });

        displayNews();
    }

    // ============================================
    // RENDERIZADO DE VIDEOJUEGOS
    // ============================================

    renderGameCards() {
        const gamesGrid = document.querySelector('.games-grid');
        const searchInput = document.getElementById('searchGames');
        const platformFilter = document.getElementById('platformFilter');
        const genreFilter = document.getElementById('genreFilter');
        const yearFilter = document.getElementById('yearFilter');
        const modal = document.getElementById('gameModal');
        const modalBody = document.getElementById('modalBody');

        const displayGames = (games) => {
            gamesGrid.innerHTML = games.map(game => `
                <div class="game-card" onclick="document.getElementById('gameModal').style.display='block'; document.getElementById('modalBody').innerHTML='<h2>${game.title}</h2><p style=\"color: var(--accent-cyan);\">Género: ${game.genre}</p><p>Plataforma: ${game.platform.toUpperCase()}</p><p>Año: ${game.year}</p><p>Descripción completa y análisis detallado en breve.</p>'">
                    <div class="game-image">${game.emoji}</div>
                    <div class="game-info">
                        <h3 class="game-title">${game.title}</h3>
                        <span class="game-genre">${game.genre}</span>
                        <p class="game-year">${game.year}</p>
                    </div>
                </div>
            `).join('');
        };

        const filterGames = Utils.debounce(() => {
            let filtered = GamesDatabase;

            if (searchInput.value) {
                filtered = filtered.filter(g => g.title.toLowerCase().includes(searchInput.value.toLowerCase()));
            }
            if (platformFilter.value) {
                filtered = filtered.filter(g => g.platform === platformFilter.value);
            }
            if (genreFilter.value) {
                filtered = filtered.filter(g => g.genre.toLowerCase().includes(genreFilter.value.toLowerCase()));
            }
            if (yearFilter.value) {
                filtered = filtered.filter(g => g.year == yearFilter.value);
            }

            displayGames(filtered);
        }, 300);

        searchInput.addEventListener('input', filterGames);
        platformFilter.addEventListener('change', filterGames);
        genreFilter.addEventListener('change', filterGames);
        yearFilter.addEventListener('change', filterGames);

        // Cerrar modal
        document.querySelector('.close')?.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        displayGames(GamesDatabase);
    }

    // ============================================
    // COMPARADOR DE HARDWARE
    // ============================================

    setupHardwareComparator() {
        const componentBtns = document.querySelectorAll('.component-btn');
        const component1Select = document.getElementById('component1');
        const component2Select = document.getElementById('component2');
        const comparisonTable = document.getElementById('comparisonTable');

        componentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                componentBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentComponentType = btn.dataset.type;
                this.updateComponentSelects();
            });
        });

        const handleComparison = () => {
            this.compareComponents();
        };

        component1Select.addEventListener('change', handleComparison);
        component2Select.addEventListener('change', handleComparison);

        this.updateComponentSelects();
    }

    updateComponentSelects() {
        const component1 = document.getElementById('component1');
        const component2 = document.getElementById('component2');
        const components = HardwareDatabase[this.currentComponentType] || [];

        const createOptions = (components) => {
            return '<option value="">Selecciona un componente...</option>' +
                components.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        };

        component1.innerHTML = createOptions(components);
        component2.innerHTML = createOptions(components);
    }

    compareComponents() {
        const component1Id = document.getElementById('component1').value;
        const component2Id = document.getElementById('component2').value;
        const comparisonTable = document.getElementById('comparisonTable');

        if (!component1Id || !component2Id) {
            comparisonTable.innerHTML = '<p class="placeholder-text">Selecciona dos componentes para ver la comparación</p>';
            return;
        }

        const components = HardwareDatabase[this.currentComponentType];
        const comp1 = components.find(c => c.id === component1Id);
        const comp2 = components.find(c => c.id === component2Id);

        if (!comp1 || !comp2) return;

        const specs = Object.keys(comp1).filter(k => !['id', 'gamingScore', 'powerScore', 'valueScore'].includes(k));

        let html = '<table><thead><tr><th>Especificación</th><th>' + comp1.name + '</th><th>' + comp2.name + '</th></tr></thead><tbody>';

        specs.forEach(spec => {
            html += `<tr><td class="spec-label">${spec.charAt(0).toUpperCase() + spec.slice(1)}</td><td class="spec-value">${comp1[spec]}</td><td class="spec-value">${comp2[spec]}</td></tr>`;
        });

        html += '</tbody></table>';
        comparisonTable.innerHTML = html;

        this.updatePerformanceIndicators(comp1, comp2);
    }

    updatePerformanceIndicators(comp1, comp2) {
        const indicators = [
            { id: 'gamingPerformance', label: 'Rendimiento Gaming', score1: comp1.gamingScore, score2: comp2.gamingScore },
            { id: 'powerConsumption', label: 'Consumo Energético', score1: comp1.powerScore, score2: comp2.powerScore },
            { id: 'valuePerformance', label: 'Valor/Rendimiento', score1: comp1.valueScore, score2: comp2.valueScore }
        ];

        indicators.forEach(indicator => {
            const element = document.getElementById(indicator.id);
            element.innerHTML = `
                <div class="bar-item">
                    <div class="bar-label">
                        <span>${comp1.name}</span>
                        <span class="bar-value">${indicator.score1}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--width: ${indicator.score1}%"></div>
                    </div>
                </div>
                <div class="bar-item">
                    <div class="bar-label">
                        <span>${comp2.name}</span>
                        <span class="bar-value">${indicator.score2}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--width: ${indicator.score2}%"></div>
                    </div>
                </div>
            `;
        });
    }

    // ============================================
    // PC BUILDER - INTEGRACIÓN CON CATÁLOGO AMPLIO
    // ============================================

    setupPCBuilder() {
        // Map of builder select IDs to catalog categories
        const mapping = {
            builderCPU: 'cpu',
            builderMotherboard: 'motherboard',
            builderGPU: 'gpu',
            builderRAM: 'ram',
            builderStorage: 'storage',
            builderPSU: 'psu',
            builderCooling: 'cooling',
            builderCase: 'case'
        };

        // Populate selects and add search inputs
        Object.keys(mapping).forEach(selectId => {
            const select = document.getElementById(selectId);
            if (!select) return;
            const category = mapping[selectId];
            this.populateSelectWithCategory(select, category);
            this.addSearchFilterToSelect(select);
            // On change, update summary
            select.addEventListener('change', () => this.updateBuildSummary());
        });

        // CPU -> Motherboard compatibility filtering
        const cpuSelect = document.getElementById('builderCPU');
        const mbSelect = document.getElementById('builderMotherboard');
        cpuSelect?.addEventListener('change', () => {
            const cpuId = cpuSelect.value;
            this.filterMotherboardsByCPU(cpuId);
            this.updateBuildSummary();
        });

        // Save / Reset actions
        document.getElementById('saveBuildBtn')?.addEventListener('click', () => {
            const build = this.collectCurrentBuild();
            if (!build) return alert('Selecciona al menos un componente antes de guardar.');
            const saved = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
            saved.push(build);
            localStorage.setItem('savedBuilds', JSON.stringify(saved));
            alert('Build guardada en localStorage');
        });

        document.getElementById('resetBuildBtn')?.addEventListener('click', () => {
            Object.keys(mapping).forEach(id => {
                const s = document.getElementById(id);
                if (s) s.value = '';
            });
            this.updateBuildSummary();
        });

        // Initial summary
        this.updateBuildSummary();
    }

    populateSelectWithCategory(selectElem, category) {
        const items = HardwareDatabase[category] || [];
        // Create options (keep concise labels)
        const frag = document.createDocumentFragment();
        const empty = document.createElement('option');
        empty.value = '';
        empty.textContent = selectElem.querySelector('option')?.textContent || 'Selecciona...';
        frag.appendChild(empty);
        items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name + (item.price ? ` — $${Utils.formatPrice(item.price)}` : '');
            frag.appendChild(opt);
        });
        selectElem.innerHTML = '';
        selectElem.appendChild(frag);
    }

    addSearchFilterToSelect(selectElem) {
        // Insert a lightweight input above the select to filter options client-side
        const wrapper = selectElem.parentElement;
        if (!wrapper) return;
        if (wrapper.querySelector('.select-search')) return; // already added
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Buscar...';
        input.className = 'select-search';
        input.style.marginBottom = '8px';
        input.addEventListener('input', Utils.debounce((e) => {
            const q = e.target.value.toLowerCase();
            Array.from(selectElem.options).forEach(opt => {
                if (!opt.value) return opt.hidden = q.length > 0 && !opt.text.toLowerCase().includes(q);
                opt.hidden = q.length > 0 && !opt.text.toLowerCase().includes(q);
            });
        }, 200));
        wrapper.insertBefore(input, selectElem);
    }

    filterMotherboardsByCPU(cpuId) {
        const mbSelect = document.getElementById('builderMotherboard');
        if (!mbSelect) return;
        const motherboards = HardwareDatabase['motherboard'] || [];
        if (!cpuId) {
            this.populateSelectWithCategory(mbSelect, 'motherboard');
            return;
        }
        // Find motherboards compatible with selected CPU
        const compatible = motherboards.filter(mb => Array.isArray(mb.compatibility) ? mb.compatibility.includes(cpuId) : true);
        // If no explicit compatibility arrays, fallback to socket match
        if (compatible.length === 0) {
            const cpu = [].concat(HardwareDatabase.cpu || []).find(c => c.id === cpuId);
            if (cpu) {
                const socket = cpu.socket;
                const bySocket = motherboards.filter(mb => mb.socket && mb.socket === socket);
                if (bySocket.length) compatible.push(...bySocket);
            }
        }
        // Populate select with compatible list
        mbSelect.innerHTML = '<option value="">Selecciona Motherboard...</option>' + compatible.map(m => `<option value="${m.id}">${m.name} — $${Utils.formatPrice(m.price)}</option>`).join('');
    }

    collectCurrentBuild() {
        const ids = ['builderCPU','builderMotherboard','builderGPU','builderRAM','builderStorage','builderPSU','builderCooling','builderCase'];
        const build = {};
        let any = false;
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const cat = el.dataset.category;
            const val = el.value;
            if (val) {
                any = true;
                const item = (HardwareDatabase[cat]||[]).find(i=>i.id===val);
                build[cat] = item || null;
            } else build[cat] = null;
        });
        if (!any) return null;
        build.meta = { date: new Date().toISOString() };
        return build;
    }

    updateBuildSummary() {
        const summaryEl = document.getElementById('buildSummaryContent');
        const totalPriceEl = document.getElementById('totalPrice');
        const totalTdpEl = document.getElementById('totalTDP');
        const buildScoreEl = document.getElementById('buildScore');
        const buildTierEl = document.getElementById('buildTier');
        const fpsGrid = document.getElementById('buildFPS');

        const ids = ['builderCPU','builderMotherboard','builderGPU','builderRAM','builderStorage','builderPSU','builderCooling','builderCase'];
        let html = '';
        let price = 0;
        let tdp = 0;
        let scoreSum = 0;
        let scoreCount = 0;

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const cat = el.dataset.category;
            const val = el.value;
            if (val) {
                const item = (HardwareDatabase[cat]||[]).find(i=>i.id===val);
                if (item) {
                    html += `<div class="build-component"><strong>${item.name}</strong><div class="component-price">$${Utils.formatPrice(item.price || 0)}</div></div>`;
                    price += Number(item.price || 0);
                    // try to extract numeric TDP if present
                    const t = item.tdp || item.tdpRating || item.wattage || '0W';
                    const tnum = parseInt(String(t).replace(/[^0-9]/g, '')) || 0;
                    tdp += tnum;
                    if (item.gamingScore) { scoreSum += item.gamingScore; scoreCount++; }
                }
            }
        });

        if (!html) html = '<p class="placeholder">Selecciona componentes para ver el resumen...</p>';
        summaryEl.innerHTML = html;

        totalPriceEl.textContent = `$${Utils.formatPrice(price)}`;
        totalTdpEl.textContent = `${tdp}W`;
        const avgScore = scoreCount ? Math.round(scoreSum/scoreCount) : 0;
        buildScoreEl.textContent = `${avgScore}%`;

        // Tier logic
        let tier = 'Sin configuración';
        if (price > 3000) tier = 'Ultra';
        else if (price > 1500) tier = 'Pro';
        else if (price > 600) tier = 'Media';
        else if (price > 200) tier = 'Básica';
        buildTierEl.textContent = tier;

        // Simple FPS estimation for a few sample games
        const sampleGames = [
            { title: 'Valorant', base: 90 },
            { title: 'Cyberpunk 2077', base: 40 },
            { title: 'Fortnite', base: 70 }
        ];
        fpsGrid.innerHTML = sampleGames.map(g => {
            const est = Math.min(300, Math.round((avgScore/100) * 240 * (g.base/80)));
            return `<div class="fps-item"><div class="game-name">${g.title}</div><div class="fps-value">${est} FPS</div></div>`;
        }).join('');

        // Run compatibility validation and show warnings if any
        this.validateCurrentBuild();
    }

    validateCurrentBuild() {
        const warnings = [];
        const cpuId = document.getElementById('builderCPU')?.value;
        const mbId = document.getElementById('builderMotherboard')?.value;
        const ramId = document.getElementById('builderRAM')?.value;
        const psuId = document.getElementById('builderPSU')?.value;

        const getItem = (category, id) => (HardwareDatabase[category]||[]).find(i=>i.id===id);

        // CPU vs Motherboard
        if (cpuId && mbId) {
            const cpu = [].concat(HardwareDatabase.cpu||[]).find(c=>c.id===cpuId);
            const mb = getItem('motherboard', mbId);
            if (cpu && mb) {
                // prefer explicit compatibility arrays
                if (Array.isArray(mb.compatibility) && mb.compatibility.length) {
                    if (!mb.compatibility.includes(cpuId)) warnings.push('CPU y Motherboard parecen incompatibles (no listados como compatibles).');
                } else if (cpu.socket && mb.socket && cpu.socket !== mb.socket && !(mb.socket === 'AM4/AM5' && cpu.socket.startsWith('AM'))) {
                    warnings.push('CPU y Motherboard pueden ser incompatibles por socket.');
                }
            }
        }

        // RAM vs Motherboard
        if (ramId && mbId) {
            const ram = getItem('ram', ramId);
            const mb = getItem('motherboard', mbId);
            if (ram && mb && mb.supportedRam && ram.type && ram.type !== mb.supportedRam) {
                warnings.push(`La RAM seleccionada (${ram.type}) no es compatible con la placa (espera ${mb.supportedRam}).`);
            }
        }

        // PSU watt check: estimate TDP from CPU+GPU+Cooling
        let totalTdp = 0;
        ['builderCPU','builderGPU','builderCooling'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const cat = el.dataset.category;
            const val = el.value;
            if (val) {
                const item = getItem(cat, val);
                if (item) {
                    const t = item.tdp || item.tdpRating || item.wattage || '0W';
                    totalTdp += parseInt(String(t).replace(/[^0-9]/g, '')) || 0;
                }
            }
        });
        if (psuId) {
            const psu = getItem('psu', psuId);
            if (psu) {
                const watt = parseInt(String(psu.wattage || '').replace(/[^0-9]/g,'')) || 0;
                if (watt && totalTdp > Math.round(watt * 0.85)) {
                    warnings.push('La fuente puede ser insuficiente: TDP estimado cercano al límite de la PSU.');
                }
            }
        }

        // Case vs Motherboard form factor
        const caseId = document.getElementById('builderCase')?.value;
        if (caseId && mbId) {
            const cs = getItem('case', caseId);
            const mb = getItem('motherboard', mbId);
            if (cs && mb && cs.formFactor && mb.formFactor && cs.formFactor === 'mATX' && mb.formFactor === 'ATX') {
                warnings.push('El gabinete seleccionado podría no aceptar la placa (factor de forma mATX vs ATX).');
            }
        }

        const warnEl = document.getElementById('buildWarnings');
        const saveBtn = document.getElementById('saveBuildBtn');
        if (warnings.length) {
            warnEl.innerHTML = `<ul>${warnings.map(w=>`<li>⚠️ ${w}</li>`).join('')}</ul>`;
            if (saveBtn) saveBtn.disabled = true;
        } else {
            if (warnEl) warnEl.innerHTML = '';
            if (saveBtn) saveBtn.disabled = false;
        }
    }

    // ============================================
    // RENDERIZADO DE BUILDS
    // ============================================

    renderBuildCards() {
        const buildsGrid = document.querySelector('.builds-grid');

        buildsGrid.innerHTML = BuildsDatabase.map(build => `
            <div class="build-card">
                <span class="build-tier">${build.tier}</span>
                <h3 class="build-title">${build.tier}</h3>
                <div class="build-price">${build.price}</div>
                
                <div class="build-specs">
                    ${build.specs.map(spec => `
                        <div class="spec-item">
                            <span class="spec-name">${spec.name}</span>
                            <span>${spec.value}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="fps-section">
                    <h4 style="margin-bottom: 15px; color: var(--accent-cyan);">FPS Estimados</h4>
                    <div class="fps-grid">
                        ${build.fps.map(fps => `
                            <div class="fps-item">
                                <div class="game-name">${fps.game}</div>
                                <div class="fps-value">${fps.fps}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="build-use">
                    ${build.use}
                </div>

                <button class="build-button">
                    <i class="fas fa-cart-plus"></i> Configurar Build
                </button>
            </div>
        `).join('');
    }

    // ============================================
    // RENDERIZADO DE OPINIONES
    // ============================================

    renderReviews() {
        const reviewsContainer = document.querySelector('.reviews-container');

        reviewsContainer.innerHTML = ReviewsDatabase.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <div class="review-rating">
                        ${Array.from({ length: 5 }, (_, i) => `
                            <i class="fas fa-star star" style="color: ${i < review.rating ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'}"></i>
                        `).join('')}
                    </div>
                </div>
                <p class="review-text">"${review.comment}"</p>
            </div>
        `).join('');
    }

    // ============================================
    // ANIMACIÓN DE ESTADÍSTICAS
    // ============================================

    animateStatistics() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const target = parseInt(entry.target.dataset.value);
                    Utils.animateCountUp(entry.target, target);
                    entry.target.dataset.animated = 'true';
                }
            });
        });

        statNumbers.forEach(el => observer.observe(el));
    }

    // ============================================
    // ANIMACIONES AL HACER SCROLL
    // ============================================

    setupScrollAnimations() {
        const handleScroll = Utils.throttle(() => {
            document.querySelectorAll('.news-card, .game-card, .build-card, .review-card').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    // ============================================
    // INTERSECTION OBSERVER PARA ANIMACIONES
    // ============================================

    setupObserverAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// ============================================
// INICIALIZAR APLICACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new GamerVerse();
});
