// Historical links retain the dates printed on the old backup page when available.
const historicalBackups = [
  ["main-us", "2022-07-07", "/v3/backups/files/07_Jul_2022.zip", 39215445],
  ["main-us", "2022-12-18", "/v3/backups/files/18_Dec_2022.zip", 42364400],
  ["legacy-us", "2022-07-16", "/v3/backups/files/16_Jul_2022.zip", 1135910846],
  ["main-cn", "2024-06-22", "/main-cn-backups/main-cn_worlds_22jun2024.tar.gz", 2499817346],
  ["main-cn", "2024-01-28", "/main-cn-backups/main-cn_worlds_28jan2024.tar.gz", 2499815731],
  ["main-cn", "2023-08-25", "/main-cn-backups/main-cn_worlds_25aug2023.tar.gz", 2499799678],
  ["main-cn", "2023-08-01", "/main-cn-backups/main-cn_worlds_01aug2023.tar.gz", 2176628379],
  ["main-cn", "2023-07-25", "/main-cn-backups/main-cn_worlds_25jul2023.tar.gz", 1997117360],
  ["main-cn", "2023-07-18", "/main-cn-backups/main-cn_worlds_18jul2023.tar.gz", 1513433882],
  ["main-cn", "2023-06-17", "/main-cn-backups/main-cn_worlds_17jun2023.tar.gz", 1513096216],
  ["main-cn", "2023-05-30", "/main-cn-backups/main-cn_worlds_30may2023.tar.gz", 1513117619],
  ["main-cn", "2023-05-18", "/main-cn-backups/main-cn_worlds_18may2023.tar.gz", 1512398294],
  ["main-cn", "2023-05-04", "/main-cn-backups/main-cn_worlds_04may2023.tar.gz", 1512399315],
  ["main-cn", "2023-04-23", "/main-cn-backups/main-cn_worlds_23apr2023.tar.gz", 1512363679],
  ["main-cn", "2023-04-14", "/main-cn-backups/main-cn_worlds_14apr2023.tar.gz", 1512933100],
  ["main-cn", "2023-04-03", "/main-cn-backups/main-cn_worlds_03apr2023.tar.gz", 1511849661],
  ["main-cn", "2023-03-22", "/main-cn-backups/main-cn_worlds_22mar2023.tar.gz", 1511840409],
  ["main-cn", "2023-03-07", "/main-cn-backups/main-cn_worlds_07mar2023.tar.gz", 1511869309],
  ["main-cn", "2023-02-25", "/main-cn-backups/main-cn_worlds_25feb2023.tar.gz", 1511800482],
  ["main-cn", "2023-02-20", "/main-cn-backups/main-cn_worlds_20feb2023.tar.gz", 1511548910],
  ["main-cn", "2023-02-14", "/main-cn-backups/main-cn_worlds_14feb2023.tar.gz", 1511450500],
  ["main-cn", "2023-02-05", "/main-cn-backups/main-cn_worlds_05feb2023.tar.gz", 1510895645],
  ["shengshan", "2023-02-06", "/shengshan-backups/shengshan_worlds_06feb2023.tar.gz", 465471658],
  ["shengshan", "2023-04-10", "/shengshan-backups/shengshan_worlds_10apr2023.tar.gz", 467121877],
  ["playground-cn", "2024-12-19", "/playground-cn-backups/playground-cn_worlds_19dec2024.tar.gz", 34765083],
  ["playground-cn", "2024-03-18", "/playground-cn-backups/playground-cn_worlds_18mar2024.tar.gz", 28765467],
  ["playground-cn", "2024-03-04", "/playground-cn-backups/playground-cn_worlds_04mar2024.tar.gz", 22009648],
  ["playground-cn", "2023-06-17", "/playground-cn-backups/playground-cn_worlds_17jun2023.tar.gz", 15804860],
  ["playground-cn", "2023-03-07", "/playground-cn-backups/playground-cn_worlds_07mar2023.tar.gz", 7159144],
  ["train-cn", "2026-02-22", "/mc-synology-backups/train-cn/train-cn_world_22feb2026.tar.gz", 3670956664],
  ["train-cn", "2026-01-25", "/mc-synology-backups/train-cn/train-cn_world_25jan2026.tar.gz", 795570375],
  ["train-cn", "2025-12-20", "/train-cn-backups/train-cn_worlds_20dec2025.tar.gz", 731678547],
  ["train-cn", "2025-09-13", "/train-cn-backups/train-cn_worlds_13sep2025.tar.gz", 618376274],
  ["train-cn", "2025-08-29", "/train-cn-backups/train-cn_worlds_29aug2025.tar.gz", 587678975],
  ["train-cn", "2025-08-26", "/train-cn-backups/train-cn_worlds_26aug2025.tar.gz", 558092836],
  ["train-cn", "2025-08-21", "/train-cn-backups/train-cn_worlds_21aug2025.tar.gz", 555809072],
  ["train-cn", "2025-08-11", "/train-cn-backups/train-cn_worlds_11aug2025.tar.gz", 522861675],
  ["train-cn", "2024-06-22", "/train-cn-backups/train-cn_worlds_22jun2024.tar.gz", 493281842],
  ["train-cn", "2024-06-04", "/train-cn-backups/train-cn_worlds_04jun2024.tar.gz", 483035878],
  ["train-cn", "2024-02-17", "/train-cn-backups/train-cn_worlds_17feb2024.tar.gz", 459777261],
  ["train-cn", "2024-01-28", "/train-cn-backups/train-cn_worlds_28jan2024.tar.gz", 416777517],
  ["train-cn", "2023-10-18", "/train-cn-backups/train-cn_worlds_18oct2023.tar.gz", 400853637],
  ["train-cn", "2023-10-09", "/train-cn-backups/train-cn_worlds_09oct2023.tar.gz", 199647894],
  ["train-cn", "2023-09-17", "/train-cn-backups/train-cn_worlds_17sep2023.tar.gz", 133768629],
  ["train-cn", "2023-09-07", "/train-cn-backups/train-cn_worlds_07sep2023.tar.gz", 29449471],
  ["create-cn", "2026-02-22", "/mc-synology-backups/create-cn/create-cn_world_22feb2026.tar.gz", 6699847824],
  ["create-cn", "2026-01-25", "/mc-synology-backups/create-cn/create-cn_world_25jan2026.tar.gz", 5445143228],
  ["create-cn", "2025-12-25", "/mc-synology-backups/create-cn/create-cn_world_2025-12-24_23-49-20.zip", 6013387598],
  ["create-cn", "2025-12-21", "/mc-synology-backups/create-cn/create-cn_world_2025-12-21_04-12-00.tar.gz", 11299618136],
  ["create-cn", "2025-12-20", "/mc-synology-backups/legacy-moved/create-cn/create-cn_worlds_20dec2025.tar.gz", 4236845322],
  ["create-cn", "2025-10-14", "/mc-synology-backups/create-cn/create-cn_world_2025-10-14_03-47-38.zip", 2165043498],
  ["create-cn", "2025-09-13", "/create-cn-backups/create-cn_worlds_13sep2025.tar.gz", 2010258757],
  ["create-cn", "2025-08-29", "/create-cn-backups/create-cn_worlds_29aug2025.tar.gz", 4155391335],
  ["create-cn", "2025-08-25", "/create-cn-backups/create-cn_worlds_25aug2025.tar.gz", 1503802815],
  ["create-cn", "2025-08-21", "/create-cn-backups/create-cn_worlds_21aug2025.tar.gz", 1488370452],
  ["create-cn", "2025-08-14", "/create-cn-backups/create-cn_worlds_14aug2025.tar.gz", 1482336144],
  ["create-cn", "2025-08-04", "/create-cn-backups/create-cn_worlds_04aug2025.tar.gz", 1448003657],
  ["create-cn", "2025-04-25", "/create-cn-backups/create-cn_worlds_25apr2025.tar.gz", 1447166499],
  ["create-cn", "2025-03-22", "/create-cn-backups/create-cn_worlds_22mar2025.tar.gz", 1439380059],
  ["create-cn", "2025-02-25", "/create-cn-backups/create-cn_worlds_25feb2025.tar.gz", 1437878788],
  ["create-cn", "2025-02-09", "/create-cn-backups/create-cn_worlds_09feb2025.tar.gz", 1437497725],
  ["create-cn", "2024-12-19", "/create-cn-backups/create-cn_worlds_19dec2024.tar.gz", 1437136390],
  ["create-cn", "2024-10-08", "/create-cn-backups/create-cn_worlds_08oct2024.tar.gz", 1437066781],
  ["create-cn", "2024-07-16", "/create-cn-backups/create-cn_worlds_16jul2024.tar.gz", 1435949952],
  ["create-cn", "2024-06-22", "/create-cn-backups/create-cn_worlds_22jun2024.tar.gz", 1103482727],
  ["create-cn", "2024-06-04", "/create-cn-backups/create-cn_worlds_04jun2024.tar.gz", 131221896],
  ["playerdata", "2023-10-18", "/playerdata/playerdata_18oct2023.sql", 138893],
  ["playerdata", "2023-06-17", "/playerdata/playerdata_17jun2023.sql", 102266],
  ["playerdata", "2023-05-04", "/playerdata/playerdata_04may2023.sql", 103337],
  ["playerdata", "2023-02-25", "/playerdata/playerdata_25feb2023.sql", 105138],
  ["playerdata", "2023-02-06", "/playerdata/playerdata_06feb2023.sql", 92316]
];

// Initial directory snapshot; the page refreshes these four indexes on load.
const initialDirectories = {
  "create-cn-archive": [
    [
      "create-cn_world_2026-10-22_00-05-59.zip",
      11858327329
    ],
    [
      "create-cn_world_2026-10-27_00-06-00.zip",
      9703293873
    ],
    [
      "create-cn_world_2026-10-31_00-06-02.zip",
      9708574619
    ],
    [
      "create-cn_world_2026-11-02_00-06-02.zip",
      9709721098
    ],
    [
      "create-cn_world_2026-11-04_00-06-02.zip",
      9711337165
    ],
    [
      "create-cn_world_2026-11-06_00-06-03.zip",
      9716771488
    ],
    [
      "create-cn_world_2026-11-08_00-06-04.zip",
      9723106260
    ],
    [
      "create-cn_world_2026-11-10_00-06-04.zip",
      9724745905
    ],
    [
      "create-cn_world_2026-11-12_00-06-05.zip",
      9936890025
    ]
  ],
  "create-cn-simple-backups": [
    [
      "create-cn_world_2026-10-31_00-06-02.zip",
      9708574619
    ],
    [
      "create-cn_world_2026-11-02_00-06-02.zip",
      9709721098
    ],
    [
      "create-cn_world_2026-11-04_00-06-02.zip",
      9711337165
    ],
    [
      "create-cn_world_2026-11-06_00-06-03.zip",
      9716771488
    ],
    [
      "create-cn_world_2026-11-08_00-06-04.zip",
      9723106260
    ],
    [
      "create-cn_world_2026-11-10_00-06-04.zip",
      9724745905
    ],
    [
      "create-cn_world_2026-11-12_00-06-05.zip",
      9936890025
    ]
  ],
  "train-cn-archive": [
    [
      "train-cn_world_2026-10-19_23-21-46.zip",
      3929255212
    ],
    [
      "train-cn_world_2026-10-24_23-21-50.zip",
      3931706186
    ],
    [
      "train-cn_world_2026-10-30_23-21-51.zip",
      3935402697
    ],
    [
      "train-cn_world_2026-11-01_23-21-52.zip",
      3935602019
    ],
    [
      "train-cn_world_2026-11-03_23-21-52.zip",
      3936750778
    ],
    [
      "train-cn_world_2026-11-05_23-21-53.zip",
      3936770648
    ],
    [
      "train-cn_world_2026-11-07_23-21-54.zip",
      3936754048
    ],
    [
      "train-cn_world_2026-11-09_23-21-54.zip",
      3936733081
    ],
    [
      "train-cn_world_2026-11-11_23-21-54.zip",
      3936768492
    ]
  ],
  "train-cn-simple-backups": [
    [
      "train-cn_world_2026-10-30_23-21-51.zip",
      3935402697
    ],
    [
      "train-cn_world_2026-11-01_23-21-52.zip",
      3935602019
    ],
    [
      "train-cn_world_2026-11-03_23-21-52.zip",
      3936750778
    ],
    [
      "train-cn_world_2026-11-05_23-21-53.zip",
      3936770648
    ],
    [
      "train-cn_world_2026-11-07_23-21-54.zip",
      3936754048
    ],
    [
      "train-cn_world_2026-11-09_23-21-54.zip",
      3936733081
    ],
    [
      "train-cn_world_2026-11-11_23-21-54.zip",
      3936768492
    ]
  ]
};
