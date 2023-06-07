// [

//   '{{repeat(20)}}',

//   {

//     name: '{{firstName()}} {{surname()}}',

//     phone: '{{phone("(xx) xxxxx-xxxx")}}',

//     address: '{{street()}}, {{integer(100,999)}}',

//     zipcode: '{{integer(00000, 99999)}}-{{integer(000, 999)}}',

//     birthday: '{{date(new Date(1970, 0, 1), new Date(1995, 0, 1), "YYYY-MM-dd")}}',

//     cpf: '{{integer(000, 999)}}.{{integer(000, 999)}}.{{integer(000, 999)}}-{{integer(00, 99)}}',

//     shoes: '{{random("35", "36", "37", "38", "39", "40", "41")}}',

//     top: '{{random("P", "M", "G", "GG")}}',

//     bottom: '{{random("P", "M", "G", "GG", "36", "38", "40", "42", "44")}}',

//     desc: '{{lorem(1, "paragraphs")}}',

//     email: '{{email([random])}}'

//   }

// ]

const customers = [
  {
    name: 'Miranda Coleman',

    phone: '(95) 35063-630',

    address: 'Verona Place, 169',

    zipcode: '63419-427',

    birthday: '1983-12-22',

    cpf: '999.842.182-96',

    shoes: 35,

    top: 'GG',

    bottom: 44,

    desc: 'Ea anim qui occaecat ut exercitation excepteur cupidatat minim nisi et ullamco. Deserunt amet commodo laborum ea consequat esse aliquip minim Lorem minim aliquip esse dolore. Eiusmod et fugiat ea non sint minim consectetur esse ullamco.\r\n',

    email: 'whitewalter@decratex.com',
  },

  {
    name: 'Holder Bentley',

    phone: '(80) 34363-793',

    address: 'Garland Court, 923',

    zipcode: '27410-374',

    birthday: '1986-07-02',

    cpf: '967.479.412-98',

    shoes: 39,

    top: 'M',

    bottom: 44,

    desc: 'Quis nisi voluptate do eiusmod do occaecat pariatur eiusmod id proident sint elit ullamco dolor. Reprehenderit exercitation nisi voluptate exercitation ex ullamco sint veniam fugiat Lorem amet. Consequat deserunt elit amet cillum culpa. Est ad irure duis consectetur sunt dolor excepteur excepteur. Nisi pariatur et sunt non esse est aute Lorem duis reprehenderit est quis do in.\r\n',

    email: 'georginalancaster@comveyer.com',
  },

  {
    name: 'Burnett Holland',

    phone: '(87) 94662-935',

    address: 'Keen Court, 998',

    zipcode: '20721-635',

    birthday: '1982-07-17',

    cpf: '219.208.692-27',

    shoes: 40,

    top: 'GG',

    bottom: 36,

    desc: 'Dolore amet ut consectetur ipsum duis minim ullamco officia nulla. Id ex est enim sint exercitation eiusmod. Culpa dolor enim id ipsum excepteur. Voluptate deserunt et eu quis Lorem. Aliqua deserunt ipsum excepteur duis aliquip magna exercitation proident aliquip enim veniam velit. Esse fugiat occaecat excepteur aliqua laboris incididunt culpa aliqua deserunt excepteur dolore id reprehenderit.\r\n',

    email: 'wattsnguyen@kegular.com',
  },

  {
    name: 'Leach Sawyer',

    phone: '(98) 05793-571',

    address: 'Tillary Street, 744',

    zipcode: '92833-655',

    birthday: '1977-11-15',

    cpf: '573.642.444-63',

    shoes: 38,

    top: 'G',

    bottom: 42,

    desc: 'Et est in aliqua et cupidatat consequat. Culpa fugiat ullamco sint commodo exercitation. Incididunt ad nulla commodo elit minim nulla enim ex amet. Sint fugiat reprehenderit aute nisi sunt culpa occaecat quis cillum velit commodo. Qui consectetur tempor laboris ex irure ullamco est anim excepteur nostrud consequat sunt adipisicing. Cupidatat enim enim fugiat aliqua aliquip consequat enim.\r\n',

    email: 'jennyreese@wrapture.com',
  },

  {
    name: 'Tonya Hewitt',

    phone: '(89) 84293-474',

    address: 'Dahl Court, 549',

    zipcode: '2857-580',

    birthday: '1994-04-17',

    cpf: '836.234.172-67',

    shoes: 35,

    top: 'M',

    bottom: 42,

    desc: 'Commodo in voluptate deserunt aute sint ut aute sunt amet enim irure velit. Commodo id duis enim est non sit. Reprehenderit sunt ipsum qui consequat laborum cillum Lorem. Reprehenderit ad sunt occaecat proident ad. Magna ad occaecat ex magna aute exercitation enim cupidatat consequat exercitation sit id labore.\r\n',

    email: 'fordbenson@goko.com',
  },

  {
    name: 'Stout Rosales',

    phone: '(81) 24303-546',

    address: 'Lynch Street, 729',

    zipcode: '22214-449',

    birthday: '1971-11-25',

    cpf: '610.642.827-93',

    shoes: 38,

    top: 'M',

    bottom: 'GG',

    desc: 'Enim eiusmod irure consectetur aliqua consectetur et ad elit. Aliquip ut duis tempor enim exercitation nostrud excepteur aliqua aliquip. Fugiat qui reprehenderit occaecat ullamco laborum exercitation quis do incididunt laboris anim.\r\n',

    email: 'summersstrickland@mantro.com',
  },

  {
    name: 'Nora Alford',

    phone: '(98) 94422-412',

    address: 'Tehama Street, 543',

    zipcode: '29865-803',

    birthday: '1971-01-05',

    cpf: '900.415.548-69',

    shoes: 35,

    top: 'M',

    bottom: 'GG',

    desc: 'Consectetur aute magna ut pariatur. Velit cupidatat cillum commodo nisi voluptate. Nostrud ut officia sunt minim qui aliquip.\r\n',

    email: 'vincentchen@atomica.com',
  },

  {
    name: 'Hobbs Waller',

    phone: '(88) 65863-954',

    address: 'Bay Avenue, 417',

    zipcode: '75452-998',

    birthday: '1970-01-31',

    cpf: '75.256.467-70',

    shoes: 40,

    top: 'GG',

    bottom: 36,

    desc: 'Non cupidatat in ut veniam fugiat pariatur aliqua et consectetur. Sint quis eiusmod do occaecat dolor pariatur voluptate esse amet minim reprehenderit. Ea nisi exercitation est anim dolor consectetur. Irure fugiat quis eu dolore exercitation commodo adipisicing velit labore qui. Mollit laborum incididunt fugiat nostrud ad adipisicing et in enim qui.\r\n',

    email: 'phelpshensley@polaria.com',
  },

  {
    name: 'Hancock Elliott',

    phone: '(91) 75913-513',

    address: 'Nostrand Avenue, 265',

    zipcode: '85872-958',

    birthday: '1987-05-22',

    cpf: '948.714.691-54',

    shoes: 35,

    top: 'GG',

    bottom: 'P',

    desc: 'In dolor et incididunt aliqua cupidatat ipsum aute ex. Adipisicing irure et ipsum sint ad adipisicing mollit tempor fugiat dolore labore. Incididunt aliqua nisi elit proident dolore aliquip nostrud. Tempor ipsum qui ea ad consequat.\r\n',

    email: 'lorriezimmerman@anarco.com',
  },

  {
    name: 'Huff Maxwell',

    phone: '(90) 65613-038',

    address: 'Fillmore Avenue, 114',

    zipcode: '14390-35',

    birthday: '1986-05-09',

    cpf: '50.300.449-29',

    shoes: 41,

    top: 'P',

    bottom: 'M',

    desc: 'Id ea laboris exercitation anim est esse eu tempor cillum consequat. Non proident cillum ipsum ipsum excepteur duis adipisicing et enim nisi sint. Lorem in proident non id nostrud aliqua adipisicing tempor sint irure. Sint duis sint et nisi ea eu ipsum officia incididunt. Aute non labore nulla nisi consequat. Consequat amet cupidatat quis veniam culpa aute velit eu in amet nisi non do nulla. Magna eiusmod cupidatat ex commodo officia eu ad.\r\n',

    email: 'branchmadden@fangold.com',
  },

  {
    name: 'Thelma Pickett',

    phone: '(97) 94432-444',

    address: 'Pioneer Street, 553',

    zipcode: '54297-339',

    birthday: '1993-10-05',

    cpf: '292.565.727-54',

    shoes: 40,

    top: 'P',

    bottom: 38,

    desc: 'Reprehenderit enim dolor ea duis in dolor minim Lorem commodo. Amet laboris exercitation excepteur veniam et commodo sunt pariatur laboris ipsum Lorem eiusmod adipisicing voluptate. Consequat ipsum tempor non officia anim proident eu consectetur aliqua esse. Magna ex enim consequat sunt duis eu dolore elit in minim ex consequat veniam sunt.\r\n',

    email: 'jancote@ebidco.com',
  },

  {
    name: 'Foster Tanner',

    phone: '(97) 35553-037',

    address: 'Mill Lane, 503',

    zipcode: '51852-862',

    birthday: '1981-06-25',

    cpf: '162.93.656-52',

    shoes: 36,

    top: 'P',

    bottom: 'P',

    desc: 'Qui commodo irure pariatur ea est in sint nostrud dolor dolor ipsum nulla eu officia. Do labore sunt veniam mollit ullamco culpa deserunt irure. Irure esse minim elit pariatur.\r\n',

    email: 'savannahrobinson@xyqag.com',
  },

  {
    name: 'Moss Lowe',

    phone: '(92) 75393-993',

    address: 'Engert Avenue, 817',

    zipcode: '48358-863',

    birthday: '1982-07-24',

    cpf: '134.725.597-1',

    shoes: 41,

    top: 'GG',

    bottom: 'P',

    desc: 'Veniam Lorem et consequat consectetur ipsum consectetur. Adipisicing ad in veniam qui non amet aliqua duis veniam minim deserunt deserunt ullamco eiusmod. Dolor dolore eu voluptate ipsum nisi quis officia nulla fugiat tempor et. Elit sunt non laborum excepteur dolor mollit et consequat proident labore velit magna nostrud culpa.\r\n',

    email: 'melindawarren@vantage.com',
  },

  {
    name: 'Frederick Aguirre',

    phone: '(81) 05572-273',

    address: 'Bridge Street, 880',

    zipcode: '5958-349',

    birthday: '1993-06-14',

    cpf: '186.688.398-45',

    shoes: 41,

    top: 'P',

    bottom: 'P',

    desc: 'Eu cupidatat esse deserunt voluptate occaecat nisi fugiat reprehenderit proident aliqua. Voluptate in minim et sint consectetur est laborum non sunt laboris amet. Lorem duis ullamco ad in et in minim cupidatat dolore laborum non sint. Do velit ipsum voluptate nisi commodo est nostrud pariatur laboris eiusmod ullamco reprehenderit. Laboris minim ipsum esse consequat ex labore.\r\n',

    email: 'fredaconway@urbanshee.com',
  },

  {
    name: 'Wolfe Vaughn',

    phone: '(84) 34062-911',

    address: 'Battery Avenue, 422',

    zipcode: '93497-216',

    birthday: '1972-11-27',

    cpf: '450.489.32-67',

    shoes: 35,

    top: 'GG',

    bottom: 40,

    desc: 'Irure cupidatat ut ex proident magna consequat minim cillum aute. Voluptate enim proident veniam cupidatat pariatur incididunt tempor anim do et qui adipisicing reprehenderit tempor. Enim ex in adipisicing est tempor deserunt. Duis est qui exercitation quis excepteur et sint cillum laboris nulla pariatur cillum.\r\n',

    email: 'shermanschmidt@moreganic.com',
  },

  {
    name: 'Gomez Guerra',

    phone: '(86) 35842-765',

    address: 'Lake Avenue, 401',

    zipcode: '17621-54',

    birthday: '1982-07-18',

    cpf: '264.337.243-43',

    shoes: 38,

    top: 'GG',

    bottom: 'GG',

    desc: 'Aliqua commodo ea adipisicing commodo fugiat adipisicing dolore nisi proident anim labore laboris ullamco quis. Aliquip eiusmod consectetur reprehenderit voluptate officia et irure irure adipisicing dolore ea ullamco est et. Laborum officia ea qui deserunt ad elit anim est voluptate eiusmod et labore anim. Ut nisi ex eu cupidatat magna qui commodo occaecat esse dolor adipisicing pariatur magna. Veniam minim nulla est culpa. Dolore minim ad consectetur nisi reprehenderit magna eu cillum cupidatat nostrud ipsum non non magna. Adipisicing esse duis ipsum cillum nostrud tempor.\r\n',

    email: 'amaliapowell@acruex.com',
  },

  {
    name: 'Walsh Carson',

    phone: '(94) 04712-649',

    address: 'Sullivan Place, 670',

    zipcode: '91922-208',

    birthday: '1981-02-20',

    cpf: '575.761.189-16',

    shoes: 39,

    top: 'G',

    bottom: 'M',

    desc: 'Incididunt et amet officia fugiat sint proident quis irure anim incididunt proident culpa magna. Ipsum cillum est do et pariatur laborum magna in duis esse sint. Amet labore consectetur dolore aliqua minim nulla sit amet nisi sunt excepteur aliqua fugiat. Eu in mollit fugiat nostrud eu. Velit cupidatat laboris dolore veniam minim commodo consectetur elit amet nulla cupidatat. Commodo occaecat dolore reprehenderit quis aute deserunt aliqua non esse.\r\n',

    email: 'caseywooten@isonus.com',
  },

  {
    name: 'Grant Gaines',

    phone: '(97) 24922-002',

    address: 'Ridge Court, 923',

    zipcode: '60636-673',

    birthday: '1981-05-08',

    cpf: '792.797.303-20',

    shoes: 35,

    top: 'P',

    bottom: 'GG',

    desc: 'Consequat ex consequat pariatur cupidatat aliquip commodo eu eu. Eiusmod et ex exercitation est enim non nostrud dolore sint ad sunt ullamco ad ipsum. Excepteur consectetur quis ea sunt laborum laborum cillum voluptate et minim. Veniam officia consequat minim proident dolor est dolor voluptate aute. Exercitation et in proident tempor quis officia. Magna eu ad aute occaecat ipsum esse duis excepteur ullamco reprehenderit nostrud laboris sint nulla. Incididunt voluptate laborum sint anim incididunt id.\r\n',

    email: 'kathrinemartinez@kidgrease.com',
  },

  {
    name: 'Meyers Mann',

    phone: '(97) 44403-095',

    address: 'Ridgewood Place, 706',

    zipcode: '57363-645',

    birthday: '1994-11-29',

    cpf: '362.944.187-10',

    shoes: 41,

    top: 'P',

    bottom: 36,

    desc: 'Id velit dolor dolore ipsum magna. Anim cupidatat eu nostrud fugiat est veniam Lorem amet quis consectetur deserunt laborum. Duis officia mollit reprehenderit est anim quis consectetur laboris qui ad. Incididunt eu exercitation voluptate sunt laborum ad amet. Mollit culpa adipisicing duis ad nulla Lorem ullamco proident.\r\n',

    email: 'kanesosa@zogak.com',
  },

  {
    name: 'Dale Holman',

    phone: '(82) 15873-069',

    address: 'Stockholm Street, 802',

    zipcode: '73657-963',

    birthday: '1971-06-09',

    cpf: '403.645.795-57',

    shoes: 39,

    top: 'GG',

    bottom: 44,

    desc: 'Ut enim in eiusmod exercitation do magna laborum ullamco excepteur anim fugiat deserunt. Minim culpa ut duis elit qui aliqua. Consequat est adipisicing cillum exercitation. Mollit nulla quis do esse magna labore. Lorem sint proident in amet dolore laboris ex. Qui ut culpa reprehenderit nisi. Do irure eiusmod fugiat enim excepteur voluptate labore ipsum esse exercitation.\r\n',

    email: 'faithowen@emtrac.com',
  },
];
