import { DestinationType } from '../types/destination';

export const destinations: DestinationType[] = [
  {
    id: "cres",
    name: "Otok Cres",
    description: "Discover the tranquil bays and pristine waters of Cres Island, where nature meets serenity.",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d10ddee29b04f8a477ba8.jpeg",
    gallery: [
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d631f4537b34fbb608fcb.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d631fe64e963e605d52dd.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d631f63c40ffdfd2d3c51.webp",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d631faedcfa9847edaa3e.jpeg"
    ],
    activities: [
      "swimming",
      "snorkeling",
      "beach_activities",
      "historical_tours",
      "photography",
      "cliff_jumping",
      "dolphin_watching"
    ],
    routes: [
      {
        id: 'beli_route',
        name: 'Beli Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "beli",
            name: "Beli",
            description: "Historic coastal village",
            distance: "8 NM",
            duration: "30min",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d64042c395e1ba6965599.jpeg"
          }
        ]
      },
      {
        id: 'kruscica_route',
        name: 'Kruščica Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "kruscica",
            name: "Uvala Kruščica",
            description: "Beautiful secluded bay",
            distance: "15 NM",
            duration: "1h",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d64eebe5edc358f342a71.jpeg"
          }
        ]
      },
      {
        id: 'cres_town_route',
        name: 'Cres Town Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "grad_cres",
            name: "Grad Cres",
            description: "Main town of Cres island",
            distance: "32 NM",
            duration: "1.5h",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d64eeee29b061c64819f6.jpeg"
          }
        ]
      }
    ]
  },
  {
    id: "rab",
    name: "Otok Rab",
    description: "Experience the golden sandy beaches and medieval charm of Rab Island.",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d10dd2c395e0a8995b230.jpeg",
    gallery: [
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6713aedcfa008cedac1f.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6713ee29b019c4481ac6.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6713e64e966e715d5455.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6713c444a1e254c16133.jpeg"
    ],
    activities: [
      "swimming",
      "beach_activities",
      "historical_tours",
      "photography",
      "medieval_architecture",
      "local_cuisine"
    ],
    routes: [
      {
        id: 'san_marino_route',
        name: 'San Marino Beach Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "plaza_san_marino",
            name: "Plaza San Marino",
            description: "Beautiful sandy beach",
            distance: "29 NM",
            duration: "1.5h",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6713aedcfa739bedac20.jpeg"
          }
        ]
      },
      {
        id: 'rab_town_route',
        name: 'Rab Town Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "grad_rab",
            name: "Grad Rab",
            description: "Historic medieval town",
            distance: "33 NM",
            duration: "2h",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d6826aedcfa24f5edb568.jpeg"
          }
        ]
      },
      {
        id: 'gonar_route',
        name: 'Gonar Bay Route',
        waypoints: [
          {
            id: "malinska",
            name: "Malinska",
            description: "Starting point",
            distance: "0 NM",
            duration: "0h",
            image: null
          },
          {
            id: "gonar",
            name: "Gonar",
            description: "Scenic bay",
            distance: "27 NM",
            duration: "1.5h",
            image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d68264537b379a2609cdb.jpeg"
          }
        ]
      }
    ]
  },
  {
    id: "grgur",
    name: "Otok Grgur",
    description: "Meet the friendly deer and explore the hidden gems of Grgur Island.",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d10dd570e5987c7064dee.jpeg",
    gallery: [
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679dec784537b3bb65616362.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679dec78e64e9611695e081b.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679dec78be5edce0b935205b.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679dec7863c40f1ffc2e0e7b.jpeg"
    ],
    activities: [
      "swimming",
      "snorkeling",
      "island_exploration",
      "bird_watching"
    ],
    waypoints: [
      {
        id: "malinska",
        name: "Malinska",
        description: "Starting point",
        distance: "0 NM",
        duration: "0h",
        image: null
      },
      {
        id: "luka_sveti_grgur",
        name: "Luka Sveti Grgur",
        description: "Main port and deer watching area",
        distance: "28 NM",
        duration: "1.5h",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679dec7863c40f1ffc2e0e7b.jpeg"
      }
    ]
  },
  {
    id: "plavnik",
    name: "Otok Plavnik",
    description: "Explore the mysterious Love Cave and crystal-clear waters of Plavnik Island.",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d10ddf336dd167f62a9e5.jpeg",
    gallery: [
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9e4537b32418616590.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9e63c40fd1782e1105.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9e4537b369e2616592.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9eaedcfa0175ee751e.jpeg"
    ],
    activities: [
      "swimming",
      "snorkeling",
      "cave_exploration",
      "photography",
      "bird_watching"
    ],
    waypoints: [
      {
        id: "malinska",
        name: "Malinska",
        description: "Starting point",
        distance: "0 NM",
        duration: "0h",
        image: null
      },
      {
        id: "uvala_krusija",
        name: "Uvala Krusija",
        description: "Beautiful bay with crystal clear water",
        distance: "15 NM",
        duration: "1h",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9e4537b3659161658f.jpeg"
      },
      {
        id: "ljubavna_spilja",
        name: "Ljubavna špilja",
        description: "Mysterious Love Cave",
        distance: "1 NM",
        duration: "5min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679def9eaedcfa47a2ee751d.jpeg"
      }
    ]
  },
  {
    id: "krk_tour",
    name: "Krug oko Krka",
    description: "Take a scenic journey around Krk Island, discovering its diverse coastline and hidden bays.",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e09c0aedcfaa73eee84d1.jpeg",
    gallery: [
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37aa63c40f38ea2e7bd1.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37aaaedcfa95c0eedf99.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37ec63c40f0c082e7c0d.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37ece64e965db75e7dae.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e384fe64e9612c45e7e3a.jpeg",
      "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e3850be5edc4e7135a6bc.jpeg"
    ],
    activities: [
      "swimming",
      "sightseeing",
      "island_hopping",
      "photography",
      "local_cuisine",
      "beach_activities",
      "cave_exploration",
      "historical_tours"
    ],
    waypoints: [
      {
        id: "malinska",
        name: "Malinska",
        description: "Starting point",
        distance: "0 NM",
        duration: "0h",
        image: null
      },
      {
        id: "bujna",
        name: "Bujna",
        description: "First stop on our journey",
        distance: "4 NM",
        duration: "20min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37aa63c40f38ea2e7bd1.jpeg"
      },
      {
        id: "ljubavna_spilja_plavnik",
        name: "Ljubavna špilja (Plavnik)",
        description: "Mysterious Love Cave",
        distance: "10 NM",
        duration: "45min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37aaaedcfa95c0eedf99.jpeg"
      },
      {
        id: "golden_beach",
        name: "Golden Beach",
        description: "Beautiful golden sandy beach",
        distance: "5 NM",
        duration: "25min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37ec63c40f0c082e7c0d.jpeg"
      },
      {
        id: "baska",
        name: "Baška",
        description: "Famous coastal town",
        distance: "8 NM",
        duration: "40min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e37ece64e965db75e7dae.jpeg"
      },
      {
        id: "mala_luka",
        name: "Mala Luka",
        description: "Charming small bay",
        distance: "5 NM",
        duration: "25min",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e384fe64e9612c45e7e3a.jpeg"
      },
      {
        id: "krcki_most",
        name: "Krčki most",
        description: "Iconic Krk Bridge",
        distance: "20 NM",
        duration: "1.5h",
        image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679e3850be5edc4e7135a6bc.jpeg"
      },
      {
        id: "malinska_return",
        name: "Return to Malinska",
        description: "Complete the circle back to starting point",
        distance: "8 NM",
        duration: "40min",
        image: null
      }
    ]
  },
  {
    id: "custom",
    name: "Your own idea?",
    description: "Have a specific destination in mind? Let us help you plan your perfect boat trip!",
    image: "https://assets.cdn.filesafe.space/M4krpnwvjmupM7QGr4NX/media/679d10ddb3a2e195413f6cb6.jpeg"
  }
];