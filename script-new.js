// ============================================
// GAMERVERSE - JAVASCRIPT ES6+ AMPLIADO
// Sistema Completo con PC Builder y más
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
// BASE DE DATOS EXPANDIDA DE HARDWARE
// ============================================

const HardwareDatabase = {
    cpu: [
        { id: 'cpu1', name: 'Intel Core i9-14900K', brand: 'Intel', cores: 24, threads: 32, baseSpeed: '3.2 GHz', boostSpeed: '6.0 GHz', socket: 'LGA1700', tdp: '253W', price: 589, gamingScore: 95, powerScore: 70, valueScore: 80 },
        { id: 'cpu2', name: 'AMD Ryzen 9 7950X3D', brand: 'AMD', cores: 16, threads: 32, baseSpeed: '4.2 GHz', boostSpeed: '5.7 GHz', socket: 'AM5', tdp: '162W', price: 549, gamingScore: 98, powerScore: 85, valueScore: 90 },
        { id: 'cpu3', name: 'Intel Core i7-14700K', brand: 'Intel', cores: 20, threads: 28, baseSpeed: '3.4 GHz', boostSpeed: '5.6 GHz', socket: 'LGA1700', tdp: '253W', price: 419, gamingScore: 92, powerScore: 65, valueScore: 85 },
        { id: 'cpu4', name: 'AMD Ryzen 7 7700X', brand: 'AMD', cores: 8, threads: 16, baseSpeed: '4.5 GHz', boostSpeed: '5.4 GHz', socket: 'AM5', tdp: '105W', price: 299, gamingScore: 90, powerScore: 90, valueScore: 95 },
        { id: 'cpu5', name: 'Intel Core i5-14600K', brand: 'Intel', cores: 14, threads: 20, baseSpeed: '3.5 GHz', boostSpeed: '5.3 GHz', socket: 'LGA1700', tdp: '181W', price: 319, gamingScore: 88, powerScore: 80, valueScore: 92 },
        { id: 'cpu6', name: 'AMD Ryzen 5 7600X', brand: 'AMD', cores: 6, threads: 12, baseSpeed: '4.7 GHz', boostSpeed: '5.3 GHz', socket: 'AM5', tdp: '95W', price: 229, gamingScore: 85, powerScore: 92, valueScore: 98 }
    ],

    gpu: [
        { id: 'gpu1', name: 'NVIDIA RTX 4090', brand: 'NVIDIA', memory: '24GB GDDR6X', clockSpeed: '2.52 GHz', cudaCores: 16384, tdp: '450W', price: 1599, gamingScore: 100, powerScore: 50, valueScore: 70 },
        { id: 'gpu2', name: 'NVIDIA RTX 4080 Super', brand: 'NVIDIA', memory: '16GB GDDR6X', clockSpeed: '2.55 GHz', cudaCores: 10240, tdp: '320W', price: 999, gamingScore: 95, powerScore: 65, valueScore: 80 },
        { id: 'gpu3', name: 'AMD Radeon RX 7900 XTX', brand: 'AMD', memory: '24GB GDDR6', clockSpeed: '2.5 GHz', streamProcessors: 6144, tdp: '420W', price: 799, gamingScore: 92, powerScore: 60, valueScore: 85 },
        { id: 'gpu4', name: 'NVIDIA RTX 4070 Ti', brand: 'NVIDIA', memory: '12GB GDDR6X', clockSpeed: '2.61 GHz', cudaCores: 7680, tdp: '285W', price: 729, gamingScore: 88, powerScore: 75, valueScore: 88 },
        { id: 'gpu5', name: 'NVIDIA RTX 4060 Ti', brand: 'NVIDIA', memory: '8GB GDDR6', clockSpeed: '2.535 GHz', cudaCores: 4352, tdp: '165W', price: 449, gamingScore: 78, powerScore: 88, valueScore: 92 },
        { id: 'gpu6', name: 'AMD Radeon RX 7700 XT', brand: 'AMD', memory: '12GB GDDR6', clockSpeed: '2.544 GHz', streamProcessors: 2560, tdp: '245W', price: 379, gamingScore: 75, powerScore: 82, valueScore: 95 }
    ],

    motherboard: [
        { id: 'mb1', name: 'ASUS ROG Maximus Z790', brand: 'ASUS', socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', tdp: 'N/A', price: 389, compatibility: ['cpu1', 'cpu3', 'cpu5'], gamingScore: 92, valueScore: 85 },
        { id: 'mb2', name: 'MSI MPG B850E EDGE WiFi', brand: 'MSI', socket: 'AM5', chipset: 'B850E', formFactor: 'ATX', tdp: 'N/A', price: 329, compatibility: ['cpu2', 'cpu4', 'cpu6'], gamingScore: 90, valueScore: 88 },
        { id: 'mb3', name: 'GIGABYTE Z790 AORUS Elite', brand: 'GIGABYTE', socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', tdp: 'N/A', price: 279, compatibility: ['cpu1', 'cpu3', 'cpu5'], gamingScore: 88, valueScore: 90 },
        { id: 'mb4', name: 'ASRock X870-E STEEL LEGEND', brand: 'ASRock', socket: 'AM5', chipset: 'X870-E', formFactor: 'ATX', tdp: 'N/A', price: 349, compatibility: ['cpu2', 'cpu4', 'cpu6'], gamingScore: 91, valueScore: 87 }
    ],

    ram: [
        { id: 'ram1', name: 'Corsair Dominator Platinum RGB 64GB', capacity: '64GB', speed: '6000MHz', type: 'DDR5', latency: 'CAS 30', tdp: '14W', price: 399, gamingScore: 95, powerScore: 95, valueScore: 75 },
        { id: 'ram2', name: 'G.Skill Flare X5 32GB', capacity: '32GB', speed: '5600MHz', type: 'DDR5', latency: 'CAS 28', tdp: '10W', price: 199, gamingScore: 92, powerScore: 95, valueScore: 90 },
        { id: 'ram3', name: 'Kingston Fury Beast 32GB', capacity: '32GB', speed: '5200MHz', type: 'DDR5', latency: 'CAS 30', tdp: '9W', price: 149, gamingScore: 88, powerScore: 95, valueScore: 95 },
        { id: 'ram4', name: 'Crucial Pro 32GB', capacity: '32GB', speed: '6000MHz', type: 'DDR5', latency: 'CAS 30', tdp: '10W', price: 179, gamingScore: 90, powerScore: 95, valueScore: 92 }
    ],

    storage: [
        { id: 'storage1', name: 'Samsung 990 Pro 4TB', capacity: '4TB', type: 'NVMe SSD', speed: '7,100 MB/s', form: 'M.2', price: 399, gamingScore: 100, powerScore: 95, valueScore: 85 },
        { id: 'storage2', name: 'WD Black SN850X 2TB', capacity: '2TB', type: 'NVMe SSD', speed: '7,100 MB/s', form: 'M.2', price: 179, gamingScore: 98, powerScore: 95, valueScore: 90 },
        { id: 'storage3', name: 'Crucial P5 Plus 1TB', capacity: '1TB', type: 'NVMe SSD', speed: '6,600 MB/s', form: 'M.2', price: 89, gamingScore: 95, powerScore: 95, valueScore: 95 },
        { id: 'storage4', name: 'Seagate BarraCuda Pro 8TB', capacity: '8TB', type: 'HDD', speed: '7,200 RPM', form: '3.5"', price: 129, gamingScore: 70, powerScore: 80, valueScore: 85 }
    ],

    psu: [
        { id: 'psu1', name: 'Corsair RM1000e', wattage: '1000W', efficiency: '80+ Gold', modular: 'Fully', fanless: 'No', price: 219, gamingScore: 95, powerScore: 100, valueScore: 85 },
        { id: 'psu2', name: 'EVGA SuperNOVA 1000 GA', wattage: '1000W', efficiency: '80+ Gold', modular: 'Fully', fanless: 'No', price: 179, gamingScore: 92, powerScore: 100, valueScore: 92 },
        { id: 'psu3', name: 'Seasonic Focus GX-850', wattage: '850W', efficiency: '80+ Gold', modular: 'Fully', fanless: 'No', price: 149, gamingScore: 90, powerScore: 95, valueScore: 95 },
        { id: 'psu4', name: 'Thermaltake Toughpower SFX', wattage: '750W', efficiency: '80+ Gold', modular: 'Fully', fanless: 'No', price: 129, gamingScore: 88, powerScore: 95, valueScore: 95 }
    ],

    cooling: [
        { id: 'cool1', name: 'Noctua NH-D15 (Aire)', type: 'Air Cooler', tdpRating: '250W', price: 99, type: 'Air', gamingScore: 90, valueScore: 95 },
        { id: 'cool2', name: 'CORSAIR iCUE H150i Elite (AIO)', type: 'Liquid Cooler', tdpRating: '350W', price: 189, type: 'Liquid', gamingScore: 95, valueScore: 88 },
        { id: 'cool3', name: 'be quiet! Dark Rock Pro 4', type: 'Air Cooler', tdpRating: '250W', price: 89, type: 'Air', gamingScore: 92, valueScore: 96 },
        { id: 'cool4', name: 'NZXT Kraken X73 (AIO)', type: 'Liquid Cooler', tdpRating: '380W', price: 279, type: 'Liquid', gamingScore: 98, valueScore: 85 }
    ],

    case: [
        { id: 'case1', name: 'Lian Li LANCOOL 3', formFactor: 'ATX', price: 119, airflow: 'Excelente', gamingScore: 92, valueScore: 90 },
        { id: 'case2', name: 'CORSAIR Crystal 570X', formFactor: 'ATX', price: 139, airflow: 'Muy Bueno', gamingScore: 90, valueScore: 88 },
        { id: 'case3', name: 'Fractal Design Core 1000', formFactor: 'ATX', price: 59, airflow: 'Bueno', gamingScore: 85, valueScore: 95 },
        { id: 'case4', name: 'NZXT H510 Flow', formFactor: 'ATX', price: 99, airflow: 'Excelente', gamingScore: 88, valueScore: 92 }
    ],

    monitor: [
        { id: 'mon1', name: 'ASUS ROG Swift Pro 360Hz', hertz: '360Hz', resolution: '1440p', panel: 'IPS', price: 599, gamingScore: 98, valueScore: 80 },
        { id: 'mon2', name: 'MSI MPG 321UR-QD', hertz: '144Hz', resolution: '4K', panel: 'IPS', price: 799, gamingScore: 96, valueScore: 78 },
        { id: 'mon3', name: 'LG 27GP850', hertz: '144Hz', resolution: '1440p', panel: 'IPS', price: 399, gamingScore: 92, valueScore: 90 },
        { id: 'mon4', name: 'Dell S2721DGF', hertz: '165Hz', resolution: '1440p', panel: 'IPS', price: 449, gamingScore: 93, valueScore: 88 }
    ],

    peripherals: [
        { id: 'per1', name: 'Corsair K95 Platinum XT', type: 'Teclado', switches: 'Mecánico', price: 199, gamingScore: 95, valueScore: 85 },
        { id: 'per2', name: 'Logitech G PRO X2', type: 'Mouse', dpi: '32000', price: 149, gamingScore: 98, valueScore: 90 },
        { id: 'per3', name: 'SteelSeries Arctis Pro', type: 'Headset', drivers: '40mm', price: 349, gamingScore: 96, valueScore: 88 },
        { id: 'per4', name: 'Razer DeathAdder V3', type: 'Mouse', dpi: '30000', price: 69, gamingScore: 92, valueScore: 95 }
    ],

    console: [
        { id: 'con1', name: 'PlayStation 5', specs: '4K UHD, 120fps', storage: '825GB SSD', price: 499, gamingScore: 95, valueScore: 90 },
        { id: 'con2', name: 'Xbox Series X', specs: '4K UHD, 120fps', storage: '1TB SSD', price: 499, gamingScore: 94, valueScore: 89 },
        { id: 'con3', name: 'Nintendo Switch OLED', specs: '1080p Handheld', storage: '64GB', price: 349, gamingScore: 88, valueScore: 92 }
    ]
};

// ============================================
// BASE DE DATOS AMPLIADA DE VIDEOJUEGOS
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
// BASE DE DATOS DE BUILDS PROFESIONALES
// ============================================

const BuildsDatabase = [
    {
        tier: 'Entry Level',
        price: 700,
        cpu: 'AMD Ryzen 5 7600X',
        gpu: 'NVIDIA RTX 4060',
        motherboard: 'MSI MPG B850E',
        ram: 'Kingston Fury Beast 32GB',
        storage: 'Crucial P5 Plus 1TB',
        psu: 'Seasonic Focus GX-850',
        cooling: 'Noctua NH-D15',
        case: 'Fractal Design Core 1000',
        specs: [
            { name: 'CPU', value: 'AMD Ryzen 5 7600X' },
            { name: 'GPU', value: 'RTX 4060' },
            { name: 'RAM', value: '32GB DDR5' },
            { name: 'SSD', value: '1TB NVMe' },
            { name: 'Fuente', value: '850W 80+ Gold' }
        ],
        fps: [
            { game: 'Valorant', fps: 240 },
            { game: 'CS:GO', fps: 300 },
            { game: 'Fortnite', fps: 144 },
            { game: 'Cyberpunk 2077', fps: 60 }
        ],
        use: 'Ideal para eSports competitivo, juegos indie y gaming casual',
        tdp: 185
    },
    {
        tier: 'Gaming Profesional',
        price: 1800,
        cpu: 'Intel Core i7-14700K',
        gpu: 'NVIDIA RTX 4070 Ti',
        motherboard: 'ASUS ROG Maximus Z790',
        ram: 'G.Skill Flare X5 32GB',
        storage: 'WD Black SN850X 2TB',
        psu: 'Corsair RM1000e',
        cooling: 'CORSAIR iCUE H150i Elite',
        case: 'Lian Li LANCOOL 3',
        specs: [
            { name: 'CPU', value: 'Intel Core i7-14700K' },
            { name: 'GPU', value: 'RTX 4070 Ti' },
            { name: 'RAM', value: '32GB DDR5' },
            { name: 'SSD', value: '2TB NVMe' },
            { name: 'Fuente', value: '1000W 80+ Gold' }
        ],
        fps: [
            { game: 'Cyberpunk 2077', fps: 110 },
            { game: 'Avatar FoP', fps: 95 },
            { game: 'Alan Wake 2', fps: 120 },
            { game: 'Valorant', fps: 280 }
        ],
        use: 'Para gaming AAA en 1440p 100+ FPS y streaming',
        tdp: 538
    },
    {
        tier: 'Ultra Gaming Pro',
        price: 3200,
        cpu: 'AMD Ryzen 9 7950X3D',
        gpu: 'NVIDIA RTX 4090',
        motherboard: 'ASRock X870-E STEEL LEGEND',
        ram: 'Corsair Dominator Platinum RGB 64GB',
        storage: 'Samsung 990 Pro 4TB',
        psu: 'Corsair RM1000e',
        cooling: 'NZXT Kraken X73',
        case: 'CORSAIR Crystal 570X',
        specs: [
            { name: 'CPU', value: 'AMD Ryzen 9 7950X3D' },
            { name: 'GPU', value: 'RTX 4090' },
            { name: 'RAM', value: '64GB DDR5' },
            { name: 'SSD', value: '4TB NVMe' },
            { name: 'Fuente', value: '1000W 80+ Gold' }
        ],
        fps: [
            { game: '4K Max Settings', fps: 240 },
            { game: 'Streaming + Gaming', fps: 120 },
            { game: 'Ray Tracing Ultra', fps: 100 },
            { game: 'Multi-Monitor 1440p', fps: 280 }
        ],
        use: 'Para streamers profesionales, 4K ultra gaming y producción de contenido',
        tdp: 615
    }
];

// ============================================
// CLASE PRINCIPAL GAMERVERSE
// ============================================

class GamerVerse {
    constructor() {
        this.currentComponentType = 'cpu';
        this.currentBuild = {
            cpu: null,
            motherboard: null,
            gpu: null,
            ram: null,
            storage: null,
            psu: null,
            cooling: null,
            case: null
        };
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
    // HERO SECTION
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
    // NOTICIAS
    // ============================================

    renderNewsCards() {
        const newsGrid = document.querySelector('.news-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');

        const newsData = [
            { id: 1, title: 'RTX 5090 superará los 600 TFLOPS en gaming', summary: 'NVIDIA anuncia especificaciones de la próxima generación Blackwell para gaming profesional.', category: 'pc', date: '2024-12-08' },
            { id: 2, title: 'PS5 Pro logra 120 FPS en más de 50 títulos', summary: 'La nueva consola profesional de Sony marca un antes y después en el rendimiento.', category: 'consolas', date: '2024-12-07' },
            { id: 3, title: 'Call of Duty bate récords con 100M de jugadores', summary: 'Black Ops 6 se convierte en el lanzamiento más grande de Call of Duty en historia.', category: 'esports', date: '2024-12-06' },
            { id: 4, title: 'Intel Core Ultra 3 destroza benchmarks', summary: 'Los nuevos procesadores Arrow Lake toman el primer lugar en rendimiento por watt.', category: 'pc', date: '2024-12-05' },
            { id: 5, title: 'Pokémon Legends Z lanza en Nintendo Switch 2', summary: 'Nuevo juego exclusivo con gráficos revolucionarios.', category: 'consolas', date: '2024-12-04' }
        ];

        const displayNews = (filter = 'all') => {
            const filtered = filter === 'all' ? newsData : newsData.filter(n => n.category === filter);
            newsGrid.innerHTML = filtered.map(news => `
                <article class="news-card">
                    <div class="news-image"></div>
                    <div class="news-content">
                        <span class="news-badge">${news.category.toUpperCase()}</span>
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
    // VIDEOJUEGOS AMPLIADOS
    // ============================================

    renderGameCards() {
        const gamesGrid = document.querySelector('.games-grid');
        const searchInput = document.getElementById('searchGames');
        const platformFilter = document.getElementById('platformFilter');
        const genreFilter = document.getElementById('genreFilter');
        const modeFilter = document.getElementById('modeFilter');
        const typeFilter = document.getElementById('typeFilter');
        const fpsFilter = document.getElementById('fpsFilter');
        const yearFilter = document.getElementById('yearFilter');

        const displayGames = (games) => {
            gamesGrid.innerHTML = games.map(game => `
                <div class="game-card" onclick="this.scrollIntoView({behavior: 'smooth'})">
                    <div class="game-image">${game.emoji}</div>
                    <div class="game-info">
                        <h3 class="game-title">${game.title}</h3>
                        <span class="game-genre">${game.genre[0]}</span>
                        <p class="game-year">${game.year}</p>
                        <div class="game-meta">
                            <small>${game.type.toUpperCase()}</small>
                            <small>${game.minFPS}-${game.recommendedFPS} FPS</small>
                        </div>
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
                filtered = filtered.filter(g => g.genre.some(genre => genre.toLowerCase().includes(genreFilter.value)));
            }
            if (modeFilter.value) {
                filtered = filtered.filter(g => g.mode.includes(modeFilter.value));
            }
            if (typeFilter.value) {
                filtered = filtered.filter(g => g.type === typeFilter.value);
            }
            if (fpsFilter.value) {
                const fpsMap = { low: 60, mid: 144, high: 240 };
                filtered = filtered.filter(g => g.recommendedFPS >= fpsMap[fpsFilter.value]);
            }
            if (yearFilter.value) {
                filtered = filtered.filter(g => g.year == yearFilter.value);
            }

            displayGames(filtered);
        }, 300);

        searchInput.addEventListener('input', filterGames);
        platformFilter.addEventListener('change', filterGames);
        genreFilter.addEventListener('change', filterGames);
        modeFilter.addEventListener('change', filterGames);
        typeFilter.addEventListener('change', filterGames);
        fpsFilter.addEventListener('change', filterGames);
        yearFilter.addEventListener('change', filterGames);

        displayGames(GamesDatabase);
    }

    // ============================================
    // COMPARADOR DE HARDWARE
    // ============================================

    setupHardwareComparator() {
        const componentBtns = document.querySelectorAll('.component-btn');
        const component1Select = document.getElementById('component1');
        const component2Select = document.getElementById('component2');

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
                components.map(c => `<option value="${c.id}">${c.name} - $${c.price}</option>`).join('');
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

        const specs = Object.keys(comp1).filter(k => !['id', 'gamingScore', 'powerScore', 'valueScore', 'compatibility'].includes(k));

        let html = '<table><thead><tr><th>Especificación</th><th>' + comp1.name + '</th><th>' + comp2.name + '</th></tr></thead><tbody>';

        specs.forEach(spec => {
            html += `<tr><td class="spec-label">${spec.charAt(0).toUpperCase() + spec.slice(1).replace(/([A-Z])/g, ' $1')}</td><td class="spec-value">${comp1[spec]}</td><td class="spec-value">${comp2[spec]}</td></tr>`;
        });

        html += '</tbody></table>';
        comparisonTable.innerHTML = html;

        this.updatePerformanceIndicators(comp1, comp2);
    }

    updatePerformanceIndicators(comp1, comp2) {
        const indicators = [
            { id: 'gamingPerformance', score1: comp1.gamingScore, score2: comp2.gamingScore },
            { id: 'powerConsumption', score1: comp1.powerScore || 80, score2: comp2.powerScore || 80 },
            { id: 'valuePerformance', score1: comp1.valueScore, score2: comp2.valueScore }
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
    // PC BUILDER INTERACTIVO
    // ============================================

    setupPCBuilder() {
        const builderSelects = document.querySelectorAll('.builder-select');
        const saveBuildBtn = document.getElementById('saveBuildBtn');
        const resetBuildBtn = document.getElementById('resetBuildBtn');

        builderSelects.forEach(select => {
            const category = select.dataset.category;
            const components = HardwareDatabase[category] || [];
            
            const options = components.map(c => `<option value="${c.id}">${c.name} - $${c.price}</option>`).join('');
            select.innerHTML = `<option value="">Selecciona ${category}...</option>` + options;

            select.addEventListener('change', () => {
                const selectedId = select.value;
                if (selectedId) {
                    const component = components.find(c => c.id === selectedId);
                    this.currentBuild[category] = component;
                }
                this.updateBuildSummary();
            });
        });

        saveBuildBtn?.addEventListener('click', () => {
            const buildName = prompt('¿Nombre para tu build?', 'Mi Build Gamer');
            if (buildName) {
                localStorage.setItem('savedBuild', JSON.stringify({
                    name: buildName,
                    build: this.currentBuild,
                    date: new Date().toLocaleDateString('es-ES')
                }));
                alert(`Build "${buildName}" guardado exitosamente!`);
            }
        });

        resetBuildBtn?.addEventListener('click', () => {
            builderSelects.forEach(select => select.value = '');
            this.currentBuild = { cpu: null, motherboard: null, gpu: null, ram: null, storage: null, psu: null, cooling: null, case: null };
            this.updateBuildSummary();
        });
    }

    updateBuildSummary() {
        const summaryContent = document.getElementById('buildSummaryContent');
        const totalPrice = document.getElementById('totalPrice');
        const totalTDP = document.getElementById('totalTDP');
        const buildScore = document.getElementById('buildScore');
        const buildTier = document.getElementById('buildTier');
        const buildFPS = document.getElementById('buildFPS');

        let price = 0;
        let tdp = 0;
        let score = 0;
        let componentCount = 0;
        let html = '';

        const componentLabels = {
            cpu: '🔷 CPU',
            motherboard: '🔷 Motherboard',
            gpu: '🔷 GPU',
            ram: '🔷 RAM',
            storage: '🔷 Almacenamiento',
            psu: '🔷 Fuente',
            cooling: '🔷 Refrigeración',
            case: '🔷 Gabinete'
        };

        Object.entries(this.currentBuild).forEach(([key, component]) => {
            if (component) {
                price += component.price || 0;
                tdp += parseInt(component.tdp) || 0;
                score += (component.gamingScore || 0);
                componentCount++;
                html += `<div class="build-component"><div class="component-name">${componentLabels[key]}</div><div class="component-value">${component.name} - $${component.price}</div></div>`;
            }
        });

        score = componentCount > 0 ? Math.round(score / componentCount) : 0;

        summaryContent.innerHTML = html || '<p class="placeholder">Selecciona componentes para ver el resumen...</p>';
        totalPrice.textContent = `$${Utils.formatPrice(price)}`;
        totalTDP.textContent = `${tdp}W`;
        buildScore.textContent = `${score}%`;

        // Determinar tier
        let tier = 'Incompleto';
        if (componentCount === 8) {
            if (price < 1000) tier = 'Entry Level';
            else if (price < 2000) tier = 'Gaming Pro';
            else tier = 'Ultra Pro';
        }
        buildTier.textContent = tier;

        // FPS estimados
        if (componentCount > 0) {
            const gamesList = [
                { name: 'Valorant', baseScore: 90 },
                { name: 'Cyberpunk', baseScore: 50 },
                { name: 'Fortnite', baseScore: 70 }
            ];
            
            buildFPS.innerHTML = gamesList.map(game => {
                const estimatedFPS = Math.round((score / 100) * 240 * (game.baseScore / 80));
                return `<div class="fps-item-build"><div class="fps-game-name">${game.name}</div><div class="fps-game-value">${Math.min(estimatedFPS, 300)} FPS</div></div>`;
            }).join('');
        }
    }

    // ============================================
    // BUILDS RECOMENDADOS
    // ============================================

    renderBuildCards() {
        const buildsGrid = document.querySelector('.builds-grid');

        buildsGrid.innerHTML = BuildsDatabase.map((build, idx) => `
            <div class="build-card">
                <span class="build-tier">${build.tier}</span>
                <h3 class="build-title">${build.tier}</h3>
                <div class="build-price">$${Utils.formatPrice(build.price)}</div>
                
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
                                <div class="fps-value">${fps.fps} FPS</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="build-use">
                    ${build.use}
                </div>

                <button class="build-button" onclick="alert('Build agregado a lista de favoritos!')">
                    <i class="fas fa-heart"></i> Favoritar
                </button>
            </div>
        `).join('');
    }

    // ============================================
    // OPINIONES DE COMUNIDAD
    // ============================================

    renderReviews() {
        const reviewsContainer = document.querySelector('.reviews-container');
        
        const reviewsData = [
            { name: 'Carlos Gamer', rating: 5, comment: 'Portal increíble para comparar hardware. Me ayudó a elegir mi build perfecta.' },
            { name: 'Luna Pro', rating: 5, comment: 'Las animaciones son suaves y el diseño gaming es impresionante.' },
            { name: 'Alex Streamer', rating: 4, comment: 'Excelente información, muy detallado y profesional.' },
            { name: 'Delta Gaming', rating: 5, comment: 'La mejor plataforma para gamers competitivos.' },
            { name: 'Nova Esports', rating: 5, comment: 'Finalmente una página que entiende lo que necesitamos.' }
        ];

        reviewsContainer.innerHTML = reviewsData.map(review => `
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
    // ANIMACIONES DE ESTADÍSTICAS
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
    // ANIMACIONES AL SCROLL
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
    // INTERSECTION OBSERVER
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
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new GamerVerse();
});
