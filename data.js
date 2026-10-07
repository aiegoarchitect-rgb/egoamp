// Курс испанского языка, уровень A1.
// Каждый блок: слова (es, ru), фразы (es, ru) и короткая памятка по грамматике.
// Из слов и фраз приложение само собирает упражнения.
window.COURSE = {
  units: [
    {
      es: 'Saludos',
      ru: 'Приветствия',
      tip: `
        <p>В испанском вопросительные и восклицательные предложения начинаются с перевёрнутого знака: <b>¿Cómo estás?</b>, <b>¡Hola!</b></p>
        <p><b>tú</b> — «ты» (друзья, ровесники), <b>usted</b> — «вы» (вежливо, незнакомым людям).</p>
        <table><tr><td>¿Cómo estás?</td><td>Как дела? (на «ты»)</td></tr>
        <tr><td>¿Cómo está usted?</td><td>Как ваши дела?</td></tr></table>
        <p><b>Buenos días</b> говорят до обеда (примерно до 14:00), <b>buenas tardes</b> — после обеда и до темноты, <b>buenas noches</b> — вечером и перед сном.</p>`,
      words: [
        ['hola', 'привет'],
        ['adiós', 'до свидания'],
        ['buenos días', 'доброе утро'],
        ['buenas tardes', 'добрый день'],
        ['buenas noches', 'добрый вечер, спокойной ночи'],
        ['gracias', 'спасибо'],
        ['por favor', 'пожалуйста'],
        ['sí', 'да'],
        ['no', 'нет'],
        ['perdón', 'извините'],
        ['de nada', 'не за что'],
        ['hasta luego', 'до встречи'],
      ],
      phrases: [
        ['¿Cómo estás?', 'Как дела?'],
        ['Estoy bien, gracias.', 'У меня всё хорошо, спасибо.'],
        ['¿Cómo te llamas?', 'Как тебя зовут?'],
        ['Me llamo Ana.', 'Меня зовут Ана.'],
        ['Mucho gusto.', 'Очень приятно.'],
        ['Hasta mañana.', 'До завтра.'],
      ],
    },
    {
      es: 'Números',
      ru: 'Числа',
      tip: `
        <p>Числа 11–15 нужно просто запомнить: <b>once, doce, trece, catorce, quince</b>.</p>
        <p>16–19 строятся как «десять и…»: <b>dieciséis, diecisiete, dieciocho, diecinueve</b>.</p>
        <p>Возраст называют через глагол <b>tener</b> («иметь»): <b>Tengo veinte años</b> — буквально «я имею двадцать лет».</p>
        <table><tr><td>tengo</td><td>я имею</td></tr><tr><td>tienes</td><td>ты имеешь</td></tr><tr><td>tiene</td><td>он, она, вы имеете</td></tr></table>`,
      words: [
        ['cero', 'ноль (0)'],
        ['uno', 'один (1)'],
        ['dos', 'два (2)'],
        ['tres', 'три (3)'],
        ['cuatro', 'четыре (4)'],
        ['cinco', 'пять (5)'],
        ['seis', 'шесть (6)'],
        ['siete', 'семь (7)'],
        ['ocho', 'восемь (8)'],
        ['nueve', 'девять (9)'],
        ['diez', 'десять (10)'],
        ['once', 'одиннадцать (11)'],
        ['doce', 'двенадцать (12)'],
        ['quince', 'пятнадцать (15)'],
        ['veinte', 'двадцать (20)'],
      ],
      phrases: [
        ['¿Cuántos años tienes?', 'Сколько тебе лет?'],
        ['Tengo veinte años.', 'Мне двадцать лет.'],
        ['¿Cuál es tu número de teléfono?', 'Какой у тебя номер телефона?'],
        ['Son diez euros.', 'С вас десять евро.'],
        ['Tengo dos hermanos.', 'У меня двое братьев.'],
        ['Mi casa es el número siete.', 'Мой дом номер семь.'],
      ],
    },
    {
      es: 'Mi familia',
      ru: 'Я и моя семья',
      tip: `
        <p>Глагол <b>ser</b> («быть») описывает, кто вы, откуда вы и какая у вас профессия.</p>
        <table><tr><td>yo soy</td><td>я есть</td></tr><tr><td>tú eres</td><td>ты есть</td></tr><tr><td>él / ella es</td><td>он / она есть</td></tr>
        <tr><td>nosotros somos</td><td>мы есть</td></tr><tr><td>vosotros sois</td><td>вы есть</td></tr><tr><td>ellos son</td><td>они есть</td></tr></table>
        <p>У существительных есть род: <b>el</b> — мужской артикль, <b>la</b> — женский. Чаще всего слова на <b>-o</b> мужского рода, на <b>-a</b> — женского.</p>
        <p>Перед профессией артикль не ставят: <b>Él es estudiante</b>.</p>`,
      words: [
        ['yo', 'я'],
        ['tú', 'ты'],
        ['él', 'он'],
        ['ella', 'она'],
        ['nosotros', 'мы'],
        ['ellos', 'они'],
        ['la madre', 'мать'],
        ['el padre', 'отец'],
        ['el hermano', 'брат'],
        ['la hermana', 'сестра'],
        ['el hijo', 'сын'],
        ['la hija', 'дочь'],
        ['el amigo', 'друг'],
        ['la amiga', 'подруга'],
      ],
      phrases: [
        ['Soy de Rusia.', 'Я из России.'],
        ['¿De dónde eres?', 'Откуда ты?'],
        ['Ella es mi madre.', 'Она моя мама.'],
        ['Somos amigos.', 'Мы друзья.'],
        ['Él es estudiante.', 'Он студент.'],
        ['Mi padre es médico.', 'Мой отец врач.'],
      ],
    },
    {
      es: 'Colores',
      ru: 'Цвета и описания',
      tip: `
        <p>Прилагательное обычно стоит <b>после</b> существительного: <b>el coche rojo</b> — красная машина.</p>
        <p>Прилагательное согласуется в роде и числе:</p>
        <table><tr><td>el libro nuevo</td><td>новая книга</td></tr><tr><td>la casa nueva</td><td>новый дом</td></tr>
        <tr><td>los libros nuevos</td><td>новые книги</td></tr><tr><td>las casas nuevas</td><td>новые дома</td></tr></table>
        <p>Прилагательные на <b>-e</b> или согласную (verde, azul) не меняются по роду: <b>el coche verde, la casa verde</b>.</p>`,
      words: [
        ['rojo', 'красный'],
        ['azul', 'синий'],
        ['verde', 'зелёный'],
        ['amarillo', 'жёлтый'],
        ['blanco', 'белый'],
        ['negro', 'чёрный'],
        ['grande', 'большой'],
        ['pequeño', 'маленький'],
        ['nuevo', 'новый'],
        ['viejo', 'старый'],
        ['bonito', 'красивый'],
        ['alto', 'высокий'],
        ['simpático', 'милый, приятный'],
      ],
      phrases: [
        ['La casa es blanca.', 'Дом белый.'],
        ['El coche es rojo.', 'Машина красная.'],
        ['Mi hermano es alto.', 'Мой брат высокий.'],
        ['Es un libro nuevo.', 'Это новая книга.'],
        ['Las flores son amarillas.', 'Цветы жёлтые.'],
        ['Ella es muy simpática.', 'Она очень милая.'],
      ],
    },
    {
      es: 'Comida',
      ru: 'Еда и напитки',
      tip: `
        <p><b>querer</b> — «хотеть»: <b>quiero</b> (я хочу), <b>quieres</b> (ты хочешь), <b>quiere</b> (он, она, вы хотите).</p>
        <p><b>gustar</b> — «нравиться». Если нравится одна вещь или действие — <b>gusta</b>, если несколько вещей — <b>gustan</b>:</p>
        <table><tr><td>Me gusta el queso.</td><td>Мне нравится сыр.</td></tr><tr><td>Me gustan las manzanas.</td><td>Мне нравятся яблоки.</td></tr></table>
        <p><b>Tengo hambre</b> — «я голоден», <b>tengo sed</b> — «хочу пить». Буквально «имею голод», «имею жажду».</p>`,
      words: [
        ['el agua', 'вода'],
        ['el café', 'кофе'],
        ['el té', 'чай'],
        ['la leche', 'молоко'],
        ['el pan', 'хлеб'],
        ['el queso', 'сыр'],
        ['la carne', 'мясо'],
        ['el pescado', 'рыба (еда)'],
        ['la fruta', 'фрукты'],
        ['la manzana', 'яблоко'],
        ['el huevo', 'яйцо'],
        ['el vino', 'вино'],
        ['la cerveza', 'пиво'],
        ['el arroz', 'рис'],
      ],
      phrases: [
        ['Quiero un café, por favor.', 'Я хочу кофе, пожалуйста.'],
        ['¿Qué quieres beber?', 'Что ты хочешь пить?'],
        ['Me gusta el queso.', 'Мне нравится сыр.'],
        ['No como carne.', 'Я не ем мясо.'],
        ['La cuenta, por favor.', 'Счёт, пожалуйста.'],
        ['Tengo hambre.', 'Я хочу есть.'],
      ],
    },
    {
      es: 'La ciudad',
      ru: 'Дом и город',
      tip: `
        <p><b>estar</b> — тоже «быть», но для местоположения и состояния: <b>¿Dónde está el banco?</b> — Где банк?</p>
        <table><tr><td>estoy</td><td>я нахожусь</td></tr><tr><td>estás</td><td>ты находишься</td></tr><tr><td>está</td><td>он, она находится</td></tr>
        <tr><td>estamos</td><td>мы находимся</td></tr><tr><td>están</td><td>они находятся</td></tr></table>
        <p><b>hay</b> — «есть, имеется», не меняется: <b>Hay un parque</b> — Есть парк. <b>¿Hay un banco cerca?</b> — Здесь рядом есть банк?</p>
        <p><b>a la derecha</b> — справа, <b>a la izquierda</b> — слева, <b>todo recto</b> — прямо.</p>`,
      words: [
        ['la casa', 'дом'],
        ['el piso', 'квартира'],
        ['la cocina', 'кухня'],
        ['el baño', 'ванная, туалет'],
        ['la habitación', 'комната'],
        ['la calle', 'улица'],
        ['el banco', 'банк'],
        ['el supermercado', 'супермаркет'],
        ['la farmacia', 'аптека'],
        ['el parque', 'парк'],
        ['la estación', 'вокзал, станция'],
        ['cerca', 'близко'],
        ['lejos', 'далеко'],
      ],
      phrases: [
        ['¿Dónde está el baño?', 'Где туалет?'],
        ['El banco está cerca.', 'Банк рядом.'],
        ['Hay un parque en mi calle.', 'На моей улице есть парк.'],
        ['La farmacia está a la derecha.', 'Аптека справа.'],
        ['Vivo en un piso pequeño.', 'Я живу в маленькой квартире.'],
        ['¿Hay un supermercado cerca?', 'Здесь рядом есть супермаркет?'],
      ],
    },
    {
      es: 'El tiempo',
      ru: 'Дни и часы',
      tip: `
        <p>Время: <b>Es la una</b> — сейчас час, но <b>Son las dos, son las tres…</b> — для остальных часов.</p>
        <table><tr><td>Son las tres y media.</td><td>Половина четвёртого.</td></tr><tr><td>Son las cinco y cuarto.</td><td>Четверть шестого.</td></tr></table>
        <p>Дни недели пишутся с маленькой буквы. «В понедельник» — <b>el lunes</b> (без предлога), «по понедельникам» — <b>los lunes</b>.</p>
        <p><b>mañana</b> — «завтра», а <b>la mañana</b> — «утро».</p>`,
      words: [
        ['el lunes', 'понедельник'],
        ['el martes', 'вторник'],
        ['el miércoles', 'среда'],
        ['el jueves', 'четверг'],
        ['el viernes', 'пятница'],
        ['el sábado', 'суббота'],
        ['el domingo', 'воскресенье'],
        ['hoy', 'сегодня'],
        ['mañana', 'завтра'],
        ['ayer', 'вчера'],
        ['la semana', 'неделя'],
        ['el mes', 'месяц'],
        ['la hora', 'час'],
      ],
      phrases: [
        ['¿Qué hora es?', 'Который час?'],
        ['Son las tres.', 'Сейчас три часа.'],
        ['Es la una.', 'Сейчас час.'],
        ['Hoy es lunes.', 'Сегодня понедельник.'],
        ['Trabajo de lunes a viernes.', 'Я работаю с понедельника по пятницу.'],
        ['El sábado voy al cine.', 'В субботу я иду в кино.'],
      ],
    },
    {
      es: 'Verbos',
      ru: 'Глаголы в настоящем',
      tip: `
        <p>Испанские глаголы делятся на три группы по окончанию: <b>-ar, -er, -ir</b>. Отбросьте окончание и добавьте нужное:</p>
        <table><tr><th></th><th>hablar</th><th>comer</th><th>vivir</th></tr>
        <tr><td>yo</td><td>hablo</td><td>como</td><td>vivo</td></tr>
        <tr><td>tú</td><td>hablas</td><td>comes</td><td>vives</td></tr>
        <tr><td>él, ella</td><td>habla</td><td>come</td><td>vive</td></tr>
        <tr><td>nosotros</td><td>hablamos</td><td>comemos</td><td>vivimos</td></tr>
        <tr><td>vosotros</td><td>habláis</td><td>coméis</td><td>vivís</td></tr>
        <tr><td>ellos</td><td>hablan</td><td>comen</td><td>viven</td></tr></table>
        <p>Местоимение обычно опускают: окончание уже показывает, кто действует. <b>Hablo español</b> — Я говорю по-испански.</p>`,
      words: [
        ['hablar', 'говорить'],
        ['trabajar', 'работать'],
        ['estudiar', 'учиться'],
        ['comer', 'есть'],
        ['beber', 'пить'],
        ['leer', 'читать'],
        ['vivir', 'жить'],
        ['escribir', 'писать'],
        ['abrir', 'открывать'],
        ['comprar', 'покупать'],
        ['aprender', 'изучать'],
        ['escuchar', 'слушать'],
      ],
      phrases: [
        ['Hablo un poco de español.', 'Я немного говорю по-испански.'],
        ['¿Dónde vives?', 'Где ты живёшь?'],
        ['Estudio español cada día.', 'Я учу испанский каждый день.'],
        ['Comemos a las dos.', 'Мы обедаем в два часа.'],
        ['Ella lee un libro.', 'Она читает книгу.'],
        ['¿Hablas inglés?', 'Ты говоришь по-английски?'],
      ],
    },
    {
      es: 'Mi día',
      ru: 'Мой день',
      tip: `
        <p>Возвратные глаголы оканчиваются на <b>-se</b>: <b>levantarse</b> — вставать. Частица ставится перед глаголом и меняется:</p>
        <table><tr><td>me levanto</td><td>я встаю</td></tr><tr><td>te levantas</td><td>ты встаёшь</td></tr><tr><td>se levanta</td><td>он, она встаёт</td></tr>
        <tr><td>nos levantamos</td><td>мы встаём</td></tr><tr><td>se levantan</td><td>они встают</td></tr></table>
        <p>Как часто: <b>siempre</b> — всегда, <b>a veces</b> — иногда, <b>nunca</b> — никогда.</p>
        <p><b>dormir</b> меняет корень: <b>duermo, duermes, duerme</b>, но <b>dormimos</b>.</p>`,
      words: [
        ['levantarse', 'вставать'],
        ['desayunar', 'завтракать'],
        ['ducharse', 'принимать душ'],
        ['el trabajo', 'работа'],
        ['la escuela', 'школа'],
        ['cenar', 'ужинать'],
        ['dormir', 'спать'],
        ['temprano', 'рано'],
        ['tarde', 'поздно'],
        ['siempre', 'всегда'],
        ['nunca', 'никогда'],
        ['a veces', 'иногда'],
      ],
      phrases: [
        ['Me levanto a las siete.', 'Я встаю в семь.'],
        ['Desayuno café con pan.', 'На завтрак у меня кофе с хлебом.'],
        ['Siempre ceno en casa.', 'Я всегда ужинаю дома.'],
        ['Los domingos duermo mucho.', 'По воскресеньям я много сплю.'],
        ['Me ducho por la mañana.', 'Я принимаю душ утром.'],
        ['A veces voy al gimnasio.', 'Иногда я хожу в спортзал.'],
      ],
    },
    {
      es: 'Tiempo libre',
      ru: 'Хобби и отдых',
      tip: `
        <p><b>gustar</b> и <b>encantar</b> («обожать») работают одинаково: кому нравится — меняется местоимение.</p>
        <table><tr><td>me gusta</td><td>мне нравится</td></tr><tr><td>te gusta</td><td>тебе нравится</td></tr><tr><td>le gusta</td><td>ему, ей, вам нравится</td></tr>
        <tr><td>nos gusta</td><td>нам нравится</td></tr><tr><td>les gusta</td><td>им нравится</td></tr></table>
        <p>С глаголом всегда <b>gusta</b>: <b>Me gusta bailar</b>. Отрицание ставится в начало: <b>No me gusta</b>.</p>
        <p><b>jugar</b> — играть в игру: <b>juego al fútbol</b>; <b>tocar</b> — играть на инструменте: <b>toco la guitarra</b>.</p>`,
      words: [
        ['el fútbol', 'футбол'],
        ['la música', 'музыка'],
        ['el cine', 'кино'],
        ['la playa', 'пляж'],
        ['viajar', 'путешествовать'],
        ['bailar', 'танцевать'],
        ['cocinar', 'готовить'],
        ['nadar', 'плавать'],
        ['el libro', 'книга'],
        ['la película', 'фильм'],
        ['el deporte', 'спорт'],
        ['jugar', 'играть'],
      ],
      phrases: [
        ['Me gusta bailar.', 'Мне нравится танцевать.'],
        ['¿Te gusta el fútbol?', 'Тебе нравится футбол?'],
        ['No me gustan las películas de terror.', 'Мне не нравятся фильмы ужасов.'],
        ['Me encanta la playa.', 'Я обожаю пляж.'],
        ['Juego al tenis los sábados.', 'Я играю в теннис по субботам.'],
        ['¿Qué haces el fin de semana?', 'Что ты делаешь на выходных?'],
      ],
    },
    {
      es: 'De compras',
      ru: 'Одежда и покупки',
      tip: `
        <p>Указательные слова «этот, эта, эти»:</p>
        <table><tr><td>este vestido</td><td>это платье</td></tr><tr><td>esta camiseta</td><td>эта футболка</td></tr>
        <tr><td>estos zapatos</td><td>эти туфли</td></tr><tr><td>estas camisas</td><td>эти рубашки</td></tr></table>
        <p>В магазине к продавцу обращаются на <b>usted</b>, глагол стоит в форме «он/она»: <b>¿Tiene…?</b> — У вас есть…?</p>
        <p><b>¿Cuánto cuesta?</b> — про одну вещь, <b>¿Cuánto cuestan?</b> — про несколько.</p>`,
      words: [
        ['la camisa', 'рубашка'],
        ['los pantalones', 'брюки'],
        ['el vestido', 'платье'],
        ['los zapatos', 'туфли, обувь'],
        ['la chaqueta', 'куртка'],
        ['la camiseta', 'футболка'],
        ['la tienda', 'магазин'],
        ['el dinero', 'деньги'],
        ['caro', 'дорогой'],
        ['barato', 'дешёвый'],
        ['la talla', 'размер'],
        ['el precio', 'цена'],
      ],
      phrases: [
        ['¿Cuánto cuesta?', 'Сколько стоит?'],
        ['Es muy caro.', 'Это очень дорого.'],
        ['Quiero esta camiseta.', 'Я хочу эту футболку.'],
        ['¿Tiene una talla más grande?', 'У вас есть размер побольше?'],
        ['¿Puedo pagar con tarjeta?', 'Можно оплатить картой?'],
        ['Me lo llevo.', 'Я это беру.'],
      ],
    },
    {
      es: 'Viajes',
      ru: 'Планы и поездки',
      tip: `
        <p><b>ir</b> — «идти, ехать»: <b>voy, vas, va, vamos, vais, van</b>.</p>
        <p>Планы на будущее: <b>ir a</b> + глагол. <b>Voy a viajar</b> — Я собираюсь путешествовать.</p>
        <p>Обязанность: <b>tener que</b> + глагол. <b>Tengo que trabajar</b> — Мне надо работать.</p>
        <p>Погода через <b>hace</b>: <b>hace calor</b> — жарко, <b>hace frío</b> — холодно, <b>hace sol</b> — солнечно. Но <b>llueve</b> — идёт дождь.</p>
        <p><b>a + el = al</b>: <b>voy al cine</b>, но <b>voy a la playa</b>.</p>`,
      words: [
        ['ir', 'идти, ехать'],
        ['el tren', 'поезд'],
        ['el avión', 'самолёт'],
        ['el autobús', 'автобус'],
        ['el billete', 'билет'],
        ['el hotel', 'отель'],
        ['la maleta', 'чемодан'],
        ['el verano', 'лето'],
        ['el invierno', 'зима'],
        ['hace calor', 'жарко'],
        ['hace frío', 'холодно'],
        ['llueve', 'идёт дождь'],
      ],
      phrases: [
        ['Voy a viajar a México.', 'Я собираюсь поехать в Мексику.'],
        ['En verano vamos a la playa.', 'Летом мы едем на пляж.'],
        ['Tengo que trabajar mañana.', 'Мне завтра надо работать.'],
        ['Hoy hace mucho calor.', 'Сегодня очень жарко.'],
        ['¿A qué hora sale el tren?', 'Во сколько отправляется поезд?'],
        ['Necesito un billete para Madrid.', 'Мне нужен билет до Мадрида.'],
      ],
    },
  ],
};
