const mocks = {
  rowInserts: {
    goodRow: {
      lastName: 'Patchouli',
      firstName: 'Roger',
      flatEarther: true,
      wallet: 142857,
    },
    badRow: {
      lastName: 'Doe',
      flatEarther: false,
      wallet: 155,
    },
  },
  getQuery: {
    goodQuery: {
      count: 50,
      offset: 1,
      column: 'lastName',
      direction: 'ASC',
    },
    badQuery: {
      count: 50,
      offset: 0,
      column: 'lastName',
    },
  },
  updateQuery: {
    goodQuery: {
      body: {
        newValue: 'Patchoulo'
      },
      params: {
        column: 'lastName',
        id: 42,
      }
    },
    badQuery: {
      body: {
        newValue: 'Wrong'
      },
      params: {
        column: 'lastName',
        id: 100
      }
    }
  },
  longDb: [
    {
      lastName: 'Wildman',
      firstName: 'Osbert',
      flatEarther: true,
      wallet: 488847,
    },
    {
      lastName: 'Stuttman',
      firstName: 'Prent',
      flatEarther: false,
      wallet: 320318,
    },
    {
      lastName: 'Curwen',
      firstName: 'Giff',
      flatEarther: true,
      wallet: 155204,
    },
    {
      lastName: 'Vanin',
      firstName: 'Cosme',
      flatEarther: false,
      wallet: 800012,
    },
    {
      lastName: 'Moorey',
      firstName: 'Justus',
      flatEarther: true,
      wallet: 290677,
    },
    {
      lastName: 'Hellikes',
      firstName: 'Ray',
      flatEarther: true,
      wallet: 985841,
    },
    {
      lastName: 'Branch',
      firstName: 'Ella',
      flatEarther: false,
      wallet: 56732,
    },
    {
      lastName: 'Beasleigh',
      firstName: 'Brianna',
      flatEarther: false,
      wallet: 999858,
    },
    {
      lastName: 'Brunelli',
      firstName: 'Chrissie',
      flatEarther: false,
      wallet: 961023,
    },
    {
      lastName: 'Benduhn',
      firstName: 'Raynell',
      flatEarther: true,
      wallet: 435527,
    },
    {
      lastName: 'Mynett',
      firstName: 'Elinor',
      flatEarther: false,
      wallet: 102421,
    },
    {
      lastName: 'Broggetti',
      firstName: 'Mayer',
      flatEarther: false,
      wallet: 737973,
    },
    {
      lastName: 'Rugade',
      firstName: 'Papafritas',
      flatEarther: true,
      wallet: 755273,
    },
    {
      lastName: 'Barizeret',
      firstName: 'Nessie',
      flatEarther: true,
      wallet: 780879,
    },
    {
      lastName: 'Rawsthorn',
      firstName: 'Hyacinthe',
      flatEarther: false,
      wallet: 333751,
    },
    {
      lastName: 'Sholem',
      firstName: 'Joby',
      flatEarther: true,
      wallet: 410683,
    },
    {
      lastName: 'Wimlet',
      firstName: 'Abbie',
      flatEarther: true,
      wallet: 827082,
    },
    {
      lastName: 'Treneman',
      firstName: 'Orland',
      flatEarther: false,
      wallet: 774359,
    },
    {
      lastName: 'Lusted',
      firstName: 'Wayland',
      flatEarther: true,
      wallet: 973928,
    },
    {
      lastName: 'Esch',
      firstName: 'Agustin',
      flatEarther: false,
      wallet: 49004,
    },
    {
      lastName: 'Parkey',
      firstName: 'Byrom',
      flatEarther: false,
      wallet: 165380,
    },
    {
      lastName: 'Swaine',
      firstName: 'Byran',
      flatEarther: false,
      wallet: 513687,
    },
    {
      lastName: 'Croad',
      firstName: 'Bentlee',
      flatEarther: true,
      wallet: 656437,
    },
    {
      lastName: 'Scoines',
      firstName: 'Silvano',
      flatEarther: true,
      wallet: 350913,
    },
    {
      lastName: 'Clopton',
      firstName: 'Hildagarde',
      flatEarther: true,
      wallet: 471169,
    },
    {
      lastName: 'Statefield',
      firstName: 'Gilberta',
      flatEarther: true,
      wallet: 272619,
    },
    {
      lastName: 'Bartoletti',
      firstName: 'Jock',
      flatEarther: false,
      wallet: 375062,
    },
    {
      lastName: 'Ingyon',
      firstName: 'Jeramey',
      flatEarther: true,
      wallet: 991137,
    },
    {
      lastName: 'Adrain',
      firstName: 'Martie',
      flatEarther: false,
      wallet: 577118,
    },
    {
      lastName: 'Edmeads',
      firstName: 'Seline',
      flatEarther: true,
      wallet: 753172,
    },
    {
      lastName: 'Lujan',
      firstName: 'Andee',
      flatEarther: true,
      wallet: 774321,
    },
    {
      lastName: 'Woodhouse',
      firstName: 'Lombard',
      flatEarther: false,
      wallet: 649348,
    },
    {
      lastName: 'Brunet',
      firstName: 'Car',
      flatEarther: false,
      wallet: 674871,
    },
    {
      lastName: 'Brind',
      firstName: 'Evin',
      flatEarther: false,
      wallet: 835501,
    },
    {
      lastName: 'Phillott',
      firstName: 'Ernestus',
      flatEarther: true,
      wallet: 94323,
    },
    {
      lastName: 'Newcombe',
      firstName: 'Opalina',
      flatEarther: true,
      wallet: 415003,
    },
    {
      lastName: 'Hatley',
      firstName: 'Juditha',
      flatEarther: true,
      wallet: 664940,
    },
    {
      lastName: 'Giraudou',
      firstName: 'Rand',
      flatEarther: true,
      wallet: 54922,
    },
    {
      lastName: 'Stutt',
      firstName: 'Olia',
      flatEarther: true,
      wallet: 305468,
    },
    {
      lastName: 'Vasenin',
      firstName: 'Pip',
      flatEarther: true,
      wallet: 72147,
    },
    {
      lastName: 'Carolan',
      firstName: 'Winnah',
      flatEarther: false,
      wallet: 593024,
    },
    {
      lastName: 'Atkin',
      firstName: 'Vergil',
      flatEarther: true,
      wallet: 995855,
    },
    {
      lastName: 'Batters',
      firstName: 'Rubetta',
      flatEarther: true,
      wallet: 972585,
    },
    {
      lastName: 'Ilden',
      firstName: 'Yoko',
      flatEarther: false,
      wallet: 857220,
    },
    {
      lastName: 'Gascar',
      firstName: 'Park',
      flatEarther: false,
      wallet: 935350,
    },
    {
      lastName: 'Lilliman',
      firstName: 'Aaren',
      flatEarther: true,
      wallet: 711099,
    },
    {
      lastName: 'Spritt',
      firstName: 'Cyndie',
      flatEarther: true,
      wallet: 980104,
    },
    {
      lastName: 'Walcher',
      firstName: 'Margaretta',
      flatEarther: false,
      wallet: 655483,
    },
    {
      lastName: 'Franz',
      firstName: 'Philis',
      flatEarther: false,
      wallet: 318097,
    },
    {
      lastName: 'Skullet',
      firstName: 'Tracy',
      flatEarther: true,
      wallet: 110996,
    },
    {
      lastName: 'Boldra',
      firstName: 'Steven',
      flatEarther: false,
      wallet: 340697,
    },
    {
      lastName: 'Gregoire',
      firstName: 'Jasen',
      flatEarther: true,
      wallet: 558252,
    },
  ],
};

export default mocks;
