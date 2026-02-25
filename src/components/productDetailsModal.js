export { getProductDetails };


function getProductDetails(product) {
    const name = product.name.toLowerCase();
    
    // SMARTPHONE BESCHREIBUNGEN (Kategorie 1)
    if (product.productGroupId === 1) {
        
        // iPhone Modelle
        if (name.includes('iphone 15 pro max')) {
            return {
                description: "Das iPhone 15 Pro Max definiert Premium-Smartphones neu: Mit dem revolutionären A17 Pro Chip, Titanium-Design und der besten iPhone-Kamera aller Zeiten. Das 6,7 Zoll Super Retina XDR Display mit ProMotion sorgt für brillante Darstellung, während die Action-Taste neue Möglichkeiten eröffnet.",
                features: [
                    "6,7 Zoll Super Retina XDR Display mit ProMotion",
                    "A17 Pro Chip für ultimative Performance",
                    "Pro Kamera-System mit 48MP Hauptkamera",
                    "Titanium Design - leichter und stärker",
                    "Action Button für individuelle Funktionen",
                    "USB-C Anschluss mit USB 3 Geschwindigkeit"
                ],
                specifications: {
                    "Display": "6,7 Zoll Super Retina XDR",
                    "Prozessor": "A17 Pro Chip",
                    "Kamera": "48MP Pro Kamera-System",
                    "Speicher": "256GB / 512GB / 1TB",
                    "Akkulaufzeit": "Bis zu 29h Videowiedergabe",
                    "Material": "Titanium mit Ceramic Shield"
                },
                warranty: "2 Jahre Apple Garantie - Bei Erwerb erhalten Sie 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung bis 3 Jahre",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,8/5"
            };
        }
        
        if (name.includes('iphone 15')) {
            return {
                description: "Das iPhone 15 bringt Pro-Features für alle: Mit dem A16 Bionic Chip, verbesserter Kamera und dem neuen USB-C Anschluss. Das 6,1 Zoll Super Retina XDR Display zeigt alles in brillanten Farben, während die 48MP Kamera professionelle Fotos ermöglicht.",
                features: [
                    "6,1 Zoll Super Retina XDR Display",
                    "A16 Bionic Chip mit 6-Core CPU",
                    "48MP Hauptkamera mit 2x Zoom",
                    "USB-C Anschluss für universelle Kompatibilität",
                    "Dynamic Island für intuitive Interaktion",
                    "Crash Detection und Notfall SOS"
                ],
                specifications: {
                    "Display": "6,1 Zoll Super Retina XDR",
                    "Prozessor": "A16 Bionic Chip",
                    "Kamera": "48MP + 12MP Ultra Wide",
                    "Speicher": "128GB / 256GB / 512GB",
                    "Akkulaufzeit": "Bis zu 20h Videowiedergabe",
                    "Farben": "Rosa, Gelb, Grün, Blau, Schwarz"
                },
                warranty: "2 Jahre Apple Garantie - Bei Erwerb erhalten Sie 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung bis 3 Jahre",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,6/5"
            };
        }
        
        // Samsung Modelle
        if (name.includes('samsung galaxy z fold')) {
            return {
                description: "Das Samsung Galaxy Z Fold7 vereint Flexibilität und Leistung: Ein großes, faltbares Display für produktives Multitasking, kompakt zusammengeklappt für unterwegs. Hochwertiges Design, starke Performance und smarte Software-Features sorgen für nahtloses Arbeiten, Streaming und Gaming.",
                features: [
                    "7,6 Zoll faltbares Dynamic AMOLED Display",
                    "Snapdragon 8 Gen 3 Prozessor",
                    "50MP Triple-Kamera mit Zoom",
                    "Multitasking mit bis zu 3 Apps gleichzeitig",
                    "S Pen Unterstützung (separat erhältlich)",
                    "IPX8 Wasserschutz"
                ],
                specifications: {
                    "Haupt-Display": "7,6 Zoll Dynamic AMOLED",
                    "Cover-Display": "6,2 Zoll Dynamic AMOLED",
                    "Prozessor": "Snapdragon 8 Gen 3",
                    "RAM": "12GB",
                    "Speicher": "256GB / 512GB / 1TB",
                    "Akku": "4400 mAh mit 25W Schnellladen"
                },
                warranty: "2 Jahre Samsung Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 2-3 Werktagen",
                rating: "Produktbewertung 4,4/5"
            };
        }
        
        if (name.includes('samsung galaxy s24')) {
            return {
                description: "Das Samsung Galaxy S24 Ultra setzt neue Maßstäbe für Android-Flaggschiffe. Mit dem S Pen, 200MP Kamera und AI-Features wird jeder zum Profi-Fotografen. Das 6,8 Zoll Dynamic AMOLED Display mit 120Hz sorgt für flüssige Darstellung in jeder Situation.",
                features: [
                    "6,8 Zoll Dynamic AMOLED 2X Display",
                    "200MP Hauptkamera mit 100x Space Zoom",
                    "Integrierter S Pen für präzise Bedienung",
                    "Galaxy AI für intelligente Funktionen",
                    "Snapdragon 8 Gen 3 für Galaxy",
                    "Titanium-Rahmen für Premium-Haptik"
                ],
                specifications: {
                    "Display": "6,8 Zoll Dynamic AMOLED 2X",
                    "Prozessor": "Snapdragon 8 Gen 3 für Galaxy",
                    "Kamera": "200MP + 50MP + 12MP + 10MP",
                    "RAM": "12GB",
                    "Speicher": "256GB / 512GB / 1TB",
                    "Akku": "5000 mAh mit 45W Schnellladen"
                },
                warranty: "2 Jahre Samsung Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,7/5"
            };
        }
        
        // Xiaomi Modelle
        if (name.includes('xiaomi 14') || name.includes('mi 13')) {
            return {
                description: "Das Xiaomi 14 bietet Flagship-Performance zum fairen Preis. Mit Leica-Kamera, Snapdragon 8 Gen 3 und 120W HyperCharge wird Premium-Technologie für jeden zugänglich. Das 6,36 Zoll AMOLED Display zeigt Inhalte in brillanter Qualität.",
                features: [
                    "6,36 Zoll AMOLED Display mit 120Hz",
                    "Leica Kamera-System mit 50MP",
                    "Snapdragon 8 Gen 3 Prozessor",
                    "120W HyperCharge - 100% in 18 Minuten",
                    "MIUI 15 basierend auf Android 14",
                    "Metallrahmen mit Gorilla Glass Victus"
                ],
                specifications: {
                    "Display": "6,36 Zoll AMOLED 120Hz",
                    "Prozessor": "Snapdragon 8 Gen 3",
                    "Kamera": "50MP Leica Triple-Kamera",
                    "RAM": "8GB / 12GB",
                    "Speicher": "256GB / 512GB",
                    "Akku": "4610 mAh mit 120W Laden"
                },
                warranty: "2 Jahre Xiaomi Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 2-3 Werktagen",
                rating: "Produktbewertung 4,5/5"
            };
        }
        
        // OnePlus Modelle
        if (name.includes('oneplus')) {
            return {
                description: "Das OnePlus 12 kombiniert Geschwindigkeit mit Eleganz. Der Snapdragon 8 Gen 3, 100W SuperVOOC Laden und das Hasselblad Kamera-System machen es zum perfekten Smartphone für Power-User. OxygenOS bietet eine saubere Android-Erfahrung.",
                features: [
                    "6,82 Zoll AMOLED Display mit 120Hz",
                    "Hasselblad Kamera für natürliche Farben",
                    "100W SuperVOOC Schnellladen",
                    "Snapdragon 8 Gen 3 für Top-Performance",
                    "OxygenOS - sauberes Android",
                    "Alert Slider für schnelle Profile"
                ],
                specifications: {
                    "Display": "6,82 Zoll AMOLED 120Hz",
                    "Prozessor": "Snapdragon 8 Gen 3",
                    "Kamera": "50MP Hasselblad Triple-Kamera",
                    "RAM": "12GB / 16GB",
                    "Speicher": "256GB / 512GB",
                    "Akku": "5400 mAh mit 100W Laden"
                },
                warranty: "2 Jahre OnePlus Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 2-3 Werktagen",
                rating: "Produktbewertung 4,4/5"
            };
        }
        
        // Nokia Modelle
        if (name.includes('nokia')) {
            return {
                description: "Das Nokia XR21 steht für Robustheit und Zuverlässigkeit. Mit IP68/IP69K Schutz, 3 Jahren Android Updates und 2-Tage Akkulaufzeit ist es der perfekte Begleiter für alle, die ein unverwüstliches Smartphone benötigen.",
                features: [
                    "6,49 Zoll Full HD+ Display",
                    "IP68/IP69K Schutz vor Wasser und Staub",
                    "MIL-STD-810H Militärstandard",
                    "2-Tage Akkulaufzeit mit 4800 mAh",
                    "3 Jahre Android Updates garantiert",
                    "64MP Dual-Kamera mit Zeiss Optik"
                ],
                specifications: {
                    "Display": "6,49 Zoll IPS LCD",
                    "Prozessor": "Snapdragon 695 5G",
                    "Kamera": "64MP + 8MP Dual-Kamera",
                    "RAM": "6GB",
                    "Speicher": "128GB (erweiterbar)",
                    "Akku": "4800 mAh mit 33W Laden"
                },
                warranty: "3 Jahre Nokia Garantie - 14 Tage Rückgaberecht und erweiterte Garantieoptionen",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,2/5"
            };
        }
    }
    
    // GAMING BESCHREIBUNGEN (Kategorie 2)
    if (product.productGroupId === 2) {
        
        // PlayStation Konsolen
        if (name.includes('playstation 5') || name.includes('ps5')) {
            return {
                description: "Die PlayStation 5 revolutioniert Gaming mit ultraschneller SSD, 3D-Audio und haptischem Feedback. Ray-Tracing und 4K-Gaming bei bis zu 120fps sorgen für ein unvergleichliches Spielerlebnis. Der DualSense Controller bringt Spiele zum Leben.",
                features: [
                    "Custom AMD Zen 2 CPU mit 8 Kernen",
                    "Ultra-schnelle SSD für Ladezeiten unter 1 Sekunde",
                    "Ray-Tracing für realistische Beleuchtung",
                    "4K Gaming mit bis zu 120fps",
                    "3D-Audio Tempest Engine",
                    "DualSense Controller mit haptischem Feedback"
                ],
                specifications: {
                    "CPU": "AMD Zen 2, 8 Kerne, 3.5 GHz",
                    "GPU": "AMD RDNA 2, 10.28 TFLOPS",
                    "Speicher": "16GB GDDR6",
                    "SSD": "825GB Custom SSD",
                    "Auflösung": "Bis zu 8K, 4K Standard",
                    "Audio": "3D-Audio Tempest Engine"
                },
                warranty: "2 Jahre Sony Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,9/5"
            };
        }

        if (name.includes('playstation 3') || name.includes('ps3')) {
    return {
        description: "Die PlayStation 3 war Sonys revolutionäre Gaming-Konsole mit Blu-ray Player und Cell Prozessor. Mit exklusiven Titeln wie The Last of Us, Uncharted und God of War bietet sie eine riesige Spielebibliothek. Perfekt für Retro-Gaming und Multimedia-Entertainment.",
        features: [
            "Cell Prozessor für kraftvolle Performance",
            "Integrierter Blu-ray Player",
            "PlayStation Network für Online-Gaming",
            "Abwärtskompatibilität zu PS1 Spielen",
            "Wireless Controller mit SIXAXIS Motion",
            "Multimedia-Hub für Filme und Musik"
        ],
        specifications: {
            "CPU": "Cell Broadband Engine",
            "GPU": "NVIDIA RSX Reality Synthesizer", 
            "Speicher": "256MB XDR + 256MB GDDR3",
            "Festplatte": "160GB / 320GB / 500GB",
            "Auflösung": "Bis zu 1080p Full HD",
            "Anschlüsse": "HDMI, USB, Ethernet"
        },
        warranty: "1 Jahr Gebrauchtgeräte-Garantie - 14 Tage Rückgaberecht",
        delivery: "Lieferung in 1-2 Werktagen",
        rating: "Produktbewertung 4,3/5"
    };
}
        
        // Xbox Konsolen
        if (name.includes('xbox series x') || name.includes('xbox')) {
            return {
                description: "Die Xbox Series X ist die mächtigste Xbox aller Zeiten. Mit 12 TFLOPS GPU-Power, Quick Resume und Smart Delivery erlebst du Spiele in 4K mit 60fps oder 120fps. Game Pass Ultimate macht tausende Spiele sofort verfügbar.",
                features: [
                    "12 TFLOPS Custom AMD RDNA 2 GPU",
                    "Quick Resume - zwischen Spielen wechseln",
                    "Smart Delivery für optimierte Spielversionen",
                    "4K Gaming mit 60fps, bis zu 120fps",
                    "1TB Custom NVMe SSD",
                    "Abwärtskompatibilität zu 4 Generationen"
                ],
                specifications: {
                    "CPU": "AMD Zen 2, 8 Kerne, 3.8 GHz",
                    "GPU": "AMD RDNA 2, 12 TFLOPS",
                    "Speicher": "16GB GDDR6",
                    "SSD": "1TB Custom NVMe SSD",
                    "Auflösung": "4K nativ, bis zu 8K",
                    "Audio": "Spatial Audio, Dolby Atmos"
                },
                warranty: "2 Jahre Microsoft Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,7/5"
            };
        }
        
        // Nintendo Switch
        if (name.includes('nintendo switch') || name.includes('switch')) {
            return {
                description: "Die Nintendo Switch OLED bietet Gaming-Flexibilität pur: Zuhause am TV oder unterwegs als Handheld. Das lebendige 7 Zoll OLED Display, verbesserter Kickstand und 64GB interner Speicher machen sie zur ultimativen Gaming-Konsole für alle.",
                features: [
                    "7 Zoll OLED Display mit lebendigen Farben",
                    "Flexibles Gaming: TV, Tisch, Handheld",
                    "Verbesserter breiter Kickstand",
                    "64GB interner Speicher (erweiterbar)",
                    "Enhanced Audio für besseren Sound",
                    "Kabelgebundenes LAN über Docking-Station"
                ],
                specifications: {
                    "Display": "7 Zoll OLED, 1280 x 720",
                    "CPU": "NVIDIA Custom Tegra",
                    "Speicher": "4GB RAM",
                    "Interner Speicher": "64GB",
                    "Akkulaufzeit": "4,5 - 9 Stunden",
                    "Gewicht": "420g (Konsole)"
                },
                warranty: "2 Jahre Nintendo Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,6/5"
            };
        }
        
        // Gaming Headsets (Sony)
        if (name.includes('sony') || name.includes('wh-1000xm4') || name.includes('headset')) {
            return {
                description: "Das Sony WH-1000XM4 Gaming Headset bietet branchenführende Noise Cancelling Technologie. Mit 30 Stunden Akkulaufzeit, Touch-Steuerung und High-Resolution Audio wird jede Gaming-Session zum Erlebnis. Perfekt für PC, PlayStation und mobile Gaming.",
                features: [
                    "Branchenführende Noise Cancelling Technologie",
                    "30 Stunden Akkulaufzeit",
                    "Touch-Steuerung am rechten Ohrpolster",
                    "High-Resolution Audio für kristallklaren Sound",
                    "Multipoint-Verbindung für 2 Geräte gleichzeitig",
                    "Schnellladefunktion: 10 Min = 5h Wiedergabe"
                ],
                specifications: {
                    "Treiber": "40mm dynamische Treiber",
                    "Frequenzbereich": "4Hz - 40kHz",
                    "Akkulaufzeit": "30 Stunden mit ANC",
                    "Gewicht": "254g",
                    "Anschlüsse": "USB-C, 3,5mm Klinke",
                    "Bluetooth": "Version 5.0"
                },
                warranty: "2 Jahre Sony Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,5/5"
            };
        }
        
        // Gaming Mäuse (Logitech)
        if (name.includes('logitech') || name.includes('gaming mouse') || name.includes('maus')) {
            return {
                description: "Die Logitech G Pro X Superlight ist die ultimative Gaming-Maus für Esports-Profis. Mit nur 63g Gewicht, HERO 25K Sensor und LIGHTSPEED Wireless-Technologie bietet sie präzise Kontrolle ohne Kompromisse. Perfekt für FPS und MOBA Games.",
                features: [
                    "Ultraleicht: nur 63g für ermüdungsfreies Gaming",
                    "HERO 25K Sensor mit bis zu 25.600 DPI",
                    "LIGHTSPEED Wireless - schneller als kabelgebunden",
                    "Bis zu 70 Stunden Akkulaufzeit",
                    "PTFE-Füße für reibungslose Gleitung",
                    "Programmierbare Tasten mit G HUB Software"
                ],
                specifications: {
                    "Sensor": "HERO 25K",
                    "DPI": "100 - 25.600 DPI",
                    "Polling Rate": "1000 Hz (1ms)",
                    "Akkulaufzeit": "Bis zu 70 Stunden",
                    "Gewicht": "63g",
                    "Tasten": "5 programmierbare Tasten"
                },
                warranty: "2 Jahre Logitech Garantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,8/5"
            };
        }
        
        // Gaming Keyboards
        if (name.includes('keyboard') || name.includes('tastatur')) {
            return {
                description: "Die mechanische Gaming-Tastatur mit RGB-Beleuchtung und Cherry MX Switches bietet präzise Eingaben und langlebige Qualität. Anti-Ghosting, programmierbare Makros und individuell anpassbare Beleuchtung machen sie zur perfekten Wahl für Gamer.",
                features: [
                    "Cherry MX Red Switches für schnelle Reaktion",
                    "RGB-Beleuchtung mit 16,8 Millionen Farben",
                    "Anti-Ghosting und N-Key Rollover",
                    "Programmierbare Makro-Tasten",
                    "Abnehmbares USB-C Kabel",
                    "Aluminium-Rahmen für Langlebigkeit"
                ],
                specifications: {
                    "Switch-Typ": "Cherry MX Red mechanisch",
                    "Layout": "QWERTZ Deutsch",
                    "Beleuchtung": "RGB pro Taste",
                    "Anschluss": "USB-C (abnehmbar)",
                    "Polling Rate": "1000 Hz",
                    "Material": "Aluminium + ABS"
                },
                warranty: "2 Jahre Herstellergarantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 1-2 Werktagen",
                rating: "Produktbewertung 4,6/5"
            };
        }
        
        // Gaming Monitore
        if (name.includes('monitor') || name.includes('display')) {
            return {
                description: "Der 27 Zoll Gaming-Monitor mit 144Hz und 1ms Reaktionszeit bietet flüssiges Gaming ohne Verzögerungen. G-Sync/FreeSync Technologie eliminiert Screen-Tearing, während das IPS-Panel brillante Farben und weite Blickwinkel liefert.",
                features: [
                    "27 Zoll QHD (2560x1440) IPS Display",
                    "144Hz Bildwiederholrate für flüssiges Gaming",
                    "1ms Reaktionszeit (MPRT)",
                    "G-Sync Compatible / FreeSync Premium",
                    "HDR10 Unterstützung für lebendige Farben",
                    "Höhenverstellbarer ergonomischer Standfuß"
                ],
                specifications: {
                    "Bildschirmgröße": "27 Zoll (68,6 cm)",
                    "Auflösung": "2560 x 1440 (QHD)",
                    "Panel-Typ": "IPS",
                    "Bildwiederholrate": "144Hz",
                    "Reaktionszeit": "1ms MPRT",
                    "Anschlüsse": "DisplayPort 1.4, HDMI 2.0, USB Hub"
                },
                warranty: "3 Jahre Herstellergarantie - 14 Tage Rückgaberecht und gegen Aufpreis Garantieverlängerung",
                delivery: "Lieferung in 2-3 Werktagen",
                rating: "Produktbewertung 4,7/5"
            };
        }

    }

    // PC BESCHREIBUNGEN (Kategorie 3)
if (product.productGroupId === 3) {
    
    // MacBook Modelle
    if (name.includes('macbook pro') || name.includes('macbook')) {
        return {
            description: "Das MacBook Pro mit M3 Chip revolutioniert mobile Computing. Mit bis zu 22 Stunden Akkulaufzeit, Liquid Retina XDR Display und Studio-Qualität Mikrofonen ist es perfekt für Kreative, Entwickler und Profis. macOS Sonoma bringt neue Produktivitäts-Features.",
            features: [
                "Apple M3 Chip mit 8-Core CPU und 10-Core GPU",
                "14 Zoll Liquid Retina XDR Display",
                "Bis zu 22 Stunden Akkulaufzeit",
                "Studio-Qualität 3-Mikrofon Array",
                "MagSafe 3 Laden + 2x Thunderbolt 4",
                "Force Touch Trackpad und Touch ID"
            ],
            specifications: {
                "Prozessor": "Apple M3 Chip",
                "Display": "14 Zoll Liquid Retina XDR",
                "RAM": "8GB / 16GB / 32GB",
                "Speicher": "512GB / 1TB / 2TB SSD",
                "Grafik": "10-Core GPU",
                "Gewicht": "1,55 kg"
            },
            warranty: "1 Jahr Apple Garantie - 14 Tage Rückgaberecht und gegen Aufpreis AppleCare+ bis 3 Jahre",
            delivery: "Lieferung in 2-3 Werktagen",
            rating: "Produktbewertung 4,8/5"
        };
    }
    
    // Dell Laptops
    if (name.includes('dell xps') || name.includes('dell')) {
        return {
            description: "Das Dell XPS 13 Plus kombiniert elegantes Design mit kraftvoller Performance. Der Intel Core i7 der 13. Generation, 13,4 Zoll InfinityEdge Display und Premium-Materialien machen es zum idealen Ultrabook für Business und Kreativität.",
            features: [
                "Intel Core i7-1360P der 13. Generation",
                "13,4 Zoll InfinityEdge OLED Display",
                "Nahezu randloses Design mit 91% Screen-to-Body",
                "Precision Touchpad mit haptischem Feedback",
                "Thunderbolt 4 für schnelle Datenübertragung",
                "Premium CNC-gefrästes Aluminium"
            ],
            specifications: {
                "Prozessor": "Intel Core i7-1360P",
                "Display": "13,4 Zoll OLED 3456x2160",
                "RAM": "16GB / 32GB LPDDR5",
                "Speicher": "512GB / 1TB PCIe SSD",
                "Grafik": "Intel Iris Xe",
                "Gewicht": "1,24 kg"
            },
            warranty: "2 Jahre Dell Premium Support - 14 Tage Rückgaberecht und erweiterte Garantieoptionen",
            delivery: "Lieferung in 3-5 Werktagen",
            rating: "Produktbewertung 4,6/5"
        };
    }
    
    // HP Laptops
    if (name.includes('hp pavilion') || name.includes('hp elitebook') || name.includes('hp')) {
        return {
            description: "Das HP EliteBook 840 G10 ist das ultimative Business-Notebook. Mit Intel vPro Technologie, Sicherheits-Features der Enterprise-Klasse und 14 Zoll Display bietet es Produktivität und Sicherheit für anspruchsvolle Profis.",
            features: [
                "Intel Core i7 vPro der 13. Generation",
                "14 Zoll Full HD IPS Anti-Glare Display",
                "HP Sure View Privacy Screen",
                "Fingerprint Reader und IR-Kamera",
                "MIL-STD 810H getestet für Robustheit",
                "HP Fast Charge - 50% in 30 Minuten"
            ],
            specifications: {
                "Prozessor": "Intel Core i7-1355U vPro",
                "Display": "14 Zoll Full HD IPS",
                "RAM": "16GB / 32GB DDR4",
                "Speicher": "512GB / 1TB PCIe SSD",
                "Grafik": "Intel Iris Xe",
                "Gewicht": "1,36 kg"
            },
            warranty: "3 Jahre HP Care Pack - 14 Tage Rückgaberecht und erweiterte Business-Garantie",
            delivery: "Lieferung in 2-4 Werktagen",
            rating: "Produktbewertung 4,5/5"
        };
    }
    
    // Desktop PCs
    if (name.includes('desktop') || name.includes('tower') || name.includes('pc')) {
        return {
            description: "Der High-Performance Desktop PC mit Intel Core i9 und NVIDIA RTX 4080 bietet ultimative Power für Gaming, Content Creation und professionelle Anwendungen. Mit 32GB DDR5 RAM und 2TB NVMe SSD ist er bereit für jede Herausforderung.",
            features: [
                "Intel Core i9-13900K Prozessor",
                "NVIDIA GeForce RTX 4080 16GB",
                "32GB DDR5-5600 RAM",
                "2TB NVMe PCIe 4.0 SSD",
                "Wasserkühlung für optimale Temperaturen",
                "RGB-Beleuchtung und Tempered Glass"
            ],
            specifications: {
                "CPU": "Intel Core i9-13900K",
                "GPU": "NVIDIA RTX 4080 16GB",
                "RAM": "32GB DDR5-5600",
                "Speicher": "2TB NVMe PCIe 4.0",
                "Mainboard": "Z790 Chipset",
                "Netzteil": "850W 80+ Gold"
            },
            warranty: "3 Jahre Premium Garantie - 14 Tage Rückgaberecht und kostenloser Vor-Ort-Service",
            delivery: "Lieferung in 5-7 Werktagen",
            rating: "Produktbewertung 4,7/5"
        };
    }
    
    // Mini PCs
    if (name.includes('mini pc') || name.includes('nuc')) {
        return {
            description: "Der kompakte Mini PC im NUC-Format bietet überraschende Performance auf kleinstem Raum. Mit Intel Core i5, 16GB RAM und 512GB SSD ist er perfekt für Office, Multimedia und als platzsparende Workstation.",
            features: [
                "Intel Core i5-1340P Prozessor",
                "16GB DDR4 SO-DIMM RAM",
                "512GB NVMe SSD",
                "Intel Iris Xe Grafik",
                "4x USB-A, 2x Thunderbolt 4",
                "WLAN 6E und Bluetooth 5.3"
            ],
            specifications: {
                "CPU": "Intel Core i5-1340P",
                "RAM": "16GB DDR4 SO-DIMM",
                "Speicher": "512GB NVMe SSD",
                "Grafik": "Intel Iris Xe",
                "Anschlüsse": "2x Thunderbolt 4, 4x USB-A",
                "Abmessungen": "117 x 112 x 51 mm"
            },
            warranty: "3 Jahre Intel Garantie - 14 Tage Rückgaberecht und erweiterte Support-Optionen",
            delivery: "Lieferung in 2-3 Werktagen",
            rating: "Produktbewertung 4,4/5"
        };
    }
    
    // All-in-One PCs
    if (name.includes('all in one') || name.includes('aio')) {
        return {
            description: "Der 27 Zoll All-in-One PC kombiniert elegantes Design mit kraftvoller Performance. Das 4K IPS Display, integrierte Webcam und kabellose Maus/Tastatur machen ihn zur perfekten Lösung für moderne Arbeitsplätze und Home Office.",
            features: [
                "27 Zoll 4K IPS Touch-Display",
                "Intel Core i7 der 12. Generation",
                "Integrierte 5MP Webcam mit Privacy Shutter",
                "Stereo-Lautsprecher mit Audio-Optimierung",
                "Kabellose Maus und Tastatur inklusive",
                "Höhenverstellbarer ergonomischer Standfuß"
            ],
            specifications: {
                "Display": "27 Zoll 4K IPS Touch",
                "CPU": "Intel Core i7-12700",
                "RAM": "16GB DDR4",
                "Speicher": "1TB NVMe SSD",
                "Grafik": "Intel UHD 770",
                "Webcam": "5MP mit Windows Hello"
            },
            warranty: "2 Jahre Premium-Garantie - 14 Tage Rückgaberecht und kostenloser Abhol-Service",
            delivery: "Lieferung in 3-5 Werktagen",
            rating: "Produktbewertung 4,5/5"
        };
    }
    
    // Tablets
    if (name.includes('tablet') || name.includes('ipad')) {
        return {
            description: "Das Premium-Tablet mit 12,9 Zoll Display und M2 Chip bietet Laptop-Performance im portablen Format. Mit Apple Pencil Unterstützung und Magic Keyboard ist es perfekt für Kreative, Studenten und mobile Professionals.",
            features: [
                "12,9 Zoll Liquid Retina XDR Display",
                "Apple M2 Chip mit 8-Core CPU",
                "Apple Pencil (2. Generation) kompatibel",
                "Magic Keyboard und Smart Connector",
                "12MP Ultra Wide Frontkamera",
                "Bis zu 10 Stunden Akkulaufzeit"
            ],
            specifications: {
                "Display": "12,9 Zoll Liquid Retina XDR",
                "Prozessor": "Apple M2 Chip",
                "Speicher": "128GB / 256GB / 512GB / 1TB",
                "Kamera": "12MP Wide + 10MP Ultra Wide",
                "Akkulaufzeit": "Bis zu 10 Stunden",
                "Gewicht": "682g (Wi-Fi Modell)"
            },
            warranty: "1 Jahr Apple Garantie - 14 Tage Rückgaberecht und gegen Aufpreis AppleCare+ verfügbar",
            delivery: "Lieferung in 1-2 Werktagen",
            rating: "Produktbewertung 4,6/5"
        };
    }
    
    // Workstations
    if (name.includes('workstation') || name.includes('professional')) {
        return {
            description: "Die professionelle Workstation mit Xeon Prozessor und Quadro Grafik ist optimiert für CAD, 3D-Rendering und wissenschaftliche Anwendungen. ECC-RAM und ISV-Zertifizierungen garantieren maximale Stabilität und Kompatibilität.",
            features: [
                "Intel Xeon W-2295 Prozessor",
                "NVIDIA Quadro RTX A5000 24GB",
                "64GB ECC DDR4 Registered RAM",
                "2TB NVMe SSD + 4TB HDD",
                "ISV-Zertifiziert für professionelle Software",
                "Redundante Netzteilversorgung"
            ],
            specifications: {
                "CPU": "Intel Xeon W-2295 (18 Kerne)",
                "GPU": "NVIDIA Quadro RTX A5000 24GB",
                "RAM": "64GB ECC DDR4 Registered",
                "Speicher": "2TB NVMe + 4TB HDD",
                "Mainboard": "C621 Chipset",
                "Netzteil": "1000W Redundant"
            },
            warranty: "5 Jahre NBD On-Site Garantie - 14 Tage Rückgaberecht und 24/7 Professional Support",
            delivery: "Lieferung in 7-10 Werktagen",
            rating: "Produktbewertung 4,9/5"
        };
    }
}

    
    // WASCHMASCHINEN BESCHREIBUNGEN (Kategorie 4)
if (product.productGroupId === 4) {
    
    // Miele Waschmaschinen
    if (name.includes('miele')) {
        return {
            description: "Die Miele W1 Waschmaschine steht für deutsche Ingenieurskunst und 20 Jahre Garantie. Mit TwinDos Dosierung, PowerWash Technologie und A+++ Energieeffizienz bietet sie perfekte Waschergebnisse bei minimalem Verbrauch. Für höchste Ansprüche entwickelt.",
            features: [
                "TwinDos automatische Dosierung",
                "PowerWash 2.0 für kraftvolle Reinigung",
                "CapDosing für spezielle Textilpflege",
                "QuickPowerWash - sauber in 49 Minuten",
                "SteamCare Dampffunktion gegen Knitterfalten",
                "20 Jahre Garantie auf Motor und Laugenbehälter"
            ],
            specifications: {
                "Fassungsvermögen": "9 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1600 U/min",
                "Wasserverbrauch": "130 Liter pro Zyklus",
                "Programme": "12 Waschprogramme",
                "Abmessungen": "85 x 59,6 x 64,3 cm"
            },
            warranty: "20 Jahre Garantie auf Motor - 2 Jahre Vollgarantie und kostenloser Kundendienst",
            delivery: "Lieferung und Anschluss in 3-5 Werktagen",
            rating: "Produktbewertung 4,9/5"
        };
    }
    
    // LG Waschmaschinen
    if (name.includes('lg') || name.includes('front load')) {
        return {
            description: "Die LG AI DD Waschmaschine mit künstlicher Intelligenz erkennt automatisch Gewebeart und Beladungsmenge. TurboWash spart Zeit, Steam Technologie schont die Fasern und die Inverter Motor Technologie sorgt für 10 Jahre Garantie auf den Motor.",
            features: [
                "AI DD erkennt Gewebe automatisch",
                "TurboWash 360° - sauber in 39 Minuten",
                "Steam Technologie für Allergikerfreundlichkeit",
                "6 Motion DirectDrive für optimale Pflege",
                "SmartThinQ App für Remote-Steuerung",
                "Inverter DirectDrive Motor - 10 Jahre Garantie"
            ],
            specifications: {
                "Fassungsvermögen": "8 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1400 U/min",
                "Wasserverbrauch": "125 Liter pro Zyklus",
                "Programme": "14 Waschprogramme",
                "Abmessungen": "85 x 60 x 56 cm"
            },
            warranty: "10 Jahre Motorgarantie - 2 Jahre Vollgarantie und SmartDiagnose Support",
            delivery: "Lieferung und Aufstellung in 2-4 Werktagen",
            rating: "Produktbewertung 4,6/5"
        };
    }
    
    // Bosch Waschmaschinen
    if (name.includes('bosch')) {
        return {
            description: "Die Bosch Serie 8 Waschmaschine mit i-DOS automatischer Dosierung und ActiveOxygen Fleckenentfernung bietet perfekte Waschergebnisse. AntiVibration Design sorgt für leisen Betrieb, während EcoSilence Drive für Langlebigkeit steht.",
            features: [
                "i-DOS automatische Waschmitteldosierung",
                "ActiveOxygen Fleckenentfernung ohne Vorbehandlung",
                "AntiVibration Design für leisen Betrieb",
                "SpeedPerfect - 65% schneller waschen",
                "AllergyPlus für Allergiker zertifiziert",
                "EcoSilence Drive - 10 Jahre Motorgarantie"
            ],
            specifications: {
                "Fassungsvermögen": "8 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1500 U/min",
                "Wasserverbrauch": "137 Liter pro Zyklus",
                "Programme": "15 Waschprogramme",
                "Abmessungen": "84,8 x 59,8 x 55 cm"
            },
            warranty: "10 Jahre Motorgarantie - 2 Jahre Herstellergarantie und kostenlose Hotline",
            delivery: "Lieferung und Anschluss in 2-4 Werktagen",
            rating: "Produktbewertung 4,7/5"
        };
    }
    
    // Samsung Waschmaschinen
    if (name.includes('samsung')) {
        return {
            description: "Die Samsung AddWash Waschmaschine mit EcoBubble Technologie löst Waschmittel bereits in kaltem Wasser optimal auf. Die AddWash Klappe ermöglicht nachträgliches Hinzufügen vergessener Wäschestücke, während Digital Inverter für Energieeffizienz sorgt.",
            features: [
                "EcoBubble für effektives Waschen bei niedrigen Temperaturen",
                "AddWash Klappe für nachträgliches Hinzufügen",
                "Digital Inverter Motor - 20 Jahre Garantie",
                "SchaumAktiv Technologie für tiefe Reinigung",
                "SmartCheck Selbstdiagnose über App",
                "Hygiene Steam für 99,9% Bakterienentfernung"
            ],
            specifications: {
                "Fassungsvermögen": "9 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1400 U/min",
                "Wasserverbrauch": "136 Liter pro Zyklus",
                "Programme": "16 Waschprogramme",
                "Abmessungen": "85 x 60 x 60 cm"
            },
            warranty: "20 Jahre Motorgarantie - 2 Jahre Vollgarantie und SmartCheck Diagnose",
            delivery: "Lieferung und Aufstellung in 3-5 Werktagen",
            rating: "Produktbewertung 4,5/5"
        };
    }
    
    // AEG Waschmaschinen
    if (name.includes('aeg')) {
        return {
            description: "Die AEG ProSteam Waschmaschine mit Dampftechnologie reduziert Knitterfalten um bis zu 30%. ÖKOMix Technologie aktiviert das Waschmittel vor dem Waschgang, während ProSense Beladungserkennung Zeit und Energie spart.",
            features: [
                "ProSteam Dampftechnologie gegen Knitterfalten",
                "ÖKOMix mischt Waschmittel optimal vor",
                "ProSense Beladungserkennung",
                "NonStop 60min Programm für schnelle Wäsche",
                "Woolmark Blue Zertifizierung für Wolle",
                "Inverter Motor für leisen Betrieb"
            ],
            specifications: {
                "Fassungsvermögen": "8 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1600 U/min",
                "Wasserverbrauch": "127 Liter pro Zyklus",
                "Programme": "10 Waschprogramme",
                "Abmessungen": "85 x 60 x 58 cm"
            },
            warranty: "2 Jahre Herstellergarantie - 14 Tage Rückgaberecht und erweiterte Garantieoptionen",
            delivery: "Lieferung und Anschluss in 2-4 Werktagen",
            rating: "Produktbewertung 4,4/5"
        };
    }
    
    // Siemens Waschmaschinen
    if (name.includes('siemens')) {
        return {
            description: "Die Siemens iQ700 Waschmaschine mit sensoFresh Geruchsentfernung und intelligentDosing System bietet höchsten Komfort. speedPack XL Programme sparen Zeit, während iQdrive Motor für 10 Jahre Garantie und leisen Betrieb steht.",
            features: [
                "sensoFresh entfernt Gerüche ohne Waschen",
                "intelligentDosing automatische Dosierung",
                "speedPack XL für schnelle Programme",
                "antiFlecken System für 16 Fleckenarten",
                "Outdoor/Imprägnieren Programm",
                "iQdrive Motor - 10 Jahre Garantie"
            ],
            specifications: {
                "Fassungsvermögen": "9 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1500 U/min",
                "Wasserverbrauch": "132 Liter pro Zyklus",
                "Programme": "17 Waschprogramme",
                "Abmessungen": "84,8 x 59,8 x 59 cm"
            },
            warranty: "10 Jahre Motorgarantie - 2 Jahre Vollgarantie und Home Connect Support",
            delivery: "Lieferung und Anschluss in 3-5 Werktagen",
            rating: "Produktbewertung 4,6/5"
        };
    }
    
    // Beko Waschmaschinen
    if (name.includes('beko')) {
        return {
            description: "Die Beko Waschmaschine mit AquaWave Schontrommel und SteamCure Dampftechnologie bietet schonende Pflege für alle Textilien. RecycledTub aus recycelten Plastikflaschen und ProSmart Inverter Motor stehen für Nachhaltigkeit und Effizienz.",
            features: [
                "AquaWave Schontrommel für sanfte Pflege",
                "SteamCure Dampf gegen Bakterien und Allergene",
                "RecycledTub aus recycelten Materialien",
                "Fast+ Programme - bis zu 50% schneller",
                "ProSmart Inverter Motor",
                "HomeWhiz App-Steuerung"
            ],
            specifications: {
                "Fassungsvermögen": "8 kg",
                "Energieeffizienz": "A+++",
                "Schleuderdrehzahl": "1400 U/min",
                "Wasserverbrauch": "140 Liter pro Zyklus",
                "Programme": "15 Waschprogramme",
                "Abmessungen": "84 x 60 x 54 cm"
            },
            warranty: "2 Jahre Herstellergarantie - 14 Tage Rückgaberecht und kostenlose Serviceline",
            delivery: "Lieferung und Aufstellung in 2-4 Werktagen",
            rating: "Produktbewertung 4,3/5"
        };
    }
    
    // Waschtrockner
    if (name.includes('waschtrockner') || name.includes('washer dryer')) {
        return {
            description: "Der 2-in-1 Waschtrockner kombiniert Waschen und Trocknen in einem Gerät. Mit Wärmepumpen-Technologie, AutoDry Sensor und NonStop Programmen ist er die platzsparende Lösung für moderne Haushalte ohne separaten Trockenraum.",
            features: [
                "Waschen 10kg / Trocknen 6kg Kapazität",
                "Wärmepumpen-Technologie für Energieeffizienz",
                "AutoDry Sensor verhindert Übertrocknung",
                "NonStop Programme - waschen und trocknen ohne Unterbrechung",
                "Knitterschutz und Dampfglättung",
                "Selbstreinigender Kondensator"
            ],
            specifications: {
                "Waschen": "10 kg",
                "Trocknen": "6 kg",
                "Energieeffizienz Waschen": "A+++",
                "Energieeffizienz Trocknen": "A",
                "Schleuderdrehzahl": "1400 U/min",
                "Abmessungen": "85 x 60 x 59 cm"
            },
            warranty: "2 Jahre Vollgarantie - 14 Tage Rückgaberecht und kostenlose Beratung",
            delivery: "Lieferung und Anschluss in 4-6 Werktagen",
            rating: "Produktbewertung 4,4/5"
        };
    }
        return {
        description: "Hochwertiges Elektronikprodukt mit modernster Technologie.",
        features: [
            "Hochwertige Verarbeitung",
            "Modernste Technologie", 
            "Benutzerfreundliches Design",
            "Zuverlässige Performance"
        ],
        specifications: {
            "Typ": "Elektronikgerät",
            "Qualität": "Premium"
        },
        warranty: "2 Jahre Herstellergarantie",
        delivery: "Lieferung in 2-3 Werktagen",
        rating: "Produktbewertung 4,0/5"
    };
}
}