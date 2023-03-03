import { Accordion } from "../../Accordion/Accordion";

const dataFaq = [
  {
    title: "Использование сухоцветов в букете",
    content:
      "Сухой букет, или Сухоцветный букет, или Зимний букет, — флористическая композиция, составленная из сухих (высушенных) частей растений. Наиболее часто для таких композиций используют высушенные соцветия, но иногда в состав сухих букетов и другие части — например, плоды, сухие ветви, листья. Виды растений, высушенные части которых в течение длительного времени сохраняют декоративность, называют сухоцветами, или бессмертниками, или иммортелями. Сухоцветы отличаются хорошим прикреплением соцветий (плодов) к цветоножкам (плодоножкам), а также тем, что их окраска не меняется со временем. Значительное число растений, используемых при составлении сухих букетов, относятся к семействам Астровые (Asteraceae), Злаки (Poaceae), Зонтичные (Apiaceae) и Свинчатковые (Plumbaginaceae).",
  },
  {
    title: "Техники и стили флористики",
    content:
      "Стили флористики означают впечатление от работы (так трактуют это в школе Weihenstephan). По прошествии времени флористические стили менялись, появлялись новые, потом опять возвращались к старым. Теперь наступило время, когда смешиваются различные стили, пропадают границы между стилями. Но чтобы знать, что и как объединять, необходимо хорошо ориентироваться в основных стилях. Выделение которых в современной флористике является спорной темой для разных школ. В то время как одни признают только два стиля, другие называют три, а то и четыре. Чаще всего встречается деление на три стиля: декоративный стиль; вегетативный стиль; форма-линейный стиль.",
  },
  {
    title: "Виды доставки",
    content:
      "Транспортно-экспедиционная компания (ТЭК) — компания, занимающаяся организацией перевозок грузов от грузоотправителя (клиента) к грузополучателю. В большинстве случаев ТЭК является компанией посредником между клиентом и перевозчиком, предоставляя услуги по поиску исполнителя и транспорта удовлетворяющим критерием перевозки груза. От компетентности и профессионализма данной компании зависит качество и своевременность перевозки грузов.Транспортно экспедиционная компания должна удовлетворять следующим требованием:Быстрая и четкая обработка поступающих заказов.Поиск и предоставления транспорта в заданные сроки.Неукоснительное соблюдение всех правил и условий транспортировки груза. Контроль за исполнением и информированием клиента о статусе перевозки груза. Формирование отчетности и прочих финансовых, сопроводительных документов.Строгое соблюдение законодательства. На текущий момент на рынке грузоперевозок представлено большое число малых и крупных транспортно экспедиционных компаний, но специфика рынка такова, что далеко не каждая компания или частный перевозчик способен выполнить эти требования по ряду причин, главная из которых — это отсутствие нужной квалификации и опыта работы в данной сфере.",
  },
  {
    title: "Цикличность цветка",
    content:
      "У большинства растений части цветка образуют хорошо заметные мутовки или круги (циклы). Наиболее распространены пяти- и четырёхкруговые, то есть пента- и тетрациклические цветки. Число частей цветка на каждом круге может быть различным. Чаще всего цветки бывают пентациклическими: два круга околоцветника (чашечка и венчик), два круга тычинок (андроцей) и один круг из плодолистиков (гинецей). Такое расположение цветков характерно для лилейных, амариллисовых, гвоздичных, гераниевых. У тетрациклических цветков обычно развивается два круга околоцветника: один круг андроцея и один круг гинецея (ирисовые, орхидные, крушинные, бересклетовые, норичниковые, губоцветные и др.).",
  },
  {
    title: "Симметрия цветка",
    content:
      "Одна из характерных черт строения цветка — его симметрия. По особенностям симметрии цветки делятся на актиноморфные, или правильные, через которые можно провести несколько плоскостей симметрии, каждая из которых делит его на две равные части (зонтичные, капустные), — и зигоморфные, или неправильные, через которые можно провести только одну вертикальную плоскость симметрии (бобовые, злаковые). Если через цветок нельзя провести ни одной плоскости симметрии, его называют несимметричным, или асимметричным (валериана лекарственная, канновые). По аналогии с актиноморфностью, зигоморфностью и асимметричностью цветка в целом говорят и об актиноморфности, зигоморфности и асимметричности венчика.",
  },
  {
    title: "О компании",
    content:
      "Букет (от фр. bouquet), также цветочный букет, — срезанные или сорванные цветущие растения, красиво подобранные вместе, обычно для подарка или для помещения их в вазу с целью украшения помещения. Художественная декоративная композиция составляется из частей растений, а также, иногда, декоративных элементов нерастительного происхождения. В большинстве случаев основой букета являются побеги, несущие распустившиеся цветки (в просторечии называемые «цветами»). В XX веке букеты стали также изготавливать из оригинальных продуктов: конфет, фруктов, игрушек; свадебные букеты иногда делают из брошей, ткани, перьев и прочих декоративных материалов. Композиция из сухих (высушенных) частей растений называется сухим, или сухоцветным букетом.",
  },
  {
    title: "Букет будет выглядеть как на картинке?",
    content:
      "Не всегда все цветы есть в наличии в том городе, куда вы делаете заказ. Всегда возможна замена, поэтому уже букет не будет соответствовать фото. Мы передаем заказы флористам по эл. почте и всегда прикладываем фото букета. Если букет не будет соответвовать картинке, по причине др. сорта роз или нет в наличии такой упаковки, то мы всегда вас об этом предупредим. Есть города или небольшие поселки, где у фористов нет эл. почты и заказ передается по телефону, мы максимально стараемся объяснить как выглядит букет. .",
  },
  {
    title: "Возможно заказать доставку на сегодня?",
    content:
      " Конечно возможно. Но мы рекомендуем заказ делать за день до доставки, чтобы избежать некоторых нюансов:   - У флористов в наличии не всегда бывают цветы по заказу, но мы всегда можем предложить замену из наличия на сегодняшний день.  - Часовые пояса. Т.к. мы работаем по МСК, то есть города, где разница во времени составляет +4 + 7 часов, в связи с этим связаться с флористами и отравить заявку на доставку нет возможности.  - Проблемы с оплатой у клиента. Не у всех есть возможность сделать оплату он-лайн.  Поэтому мы рекомендуем заказ делать за день до доставки. ",
  },
  {
    title: "Цветы будут свежие?",
    content:
      " От всех флористов мы требуем свежести цветов, если по вашему заказу цветы в наличии не свежие, они предлагают замену.  Но если вдруг в доставленном букете, вы обнаружите увядшие цветы, пришлите нам фото и мы всегда готовы компенсировать ваши затраты.",
  },
];

export const FaqPage = () => {
  return (
    <div>
      <h1>Часто спрашивают</h1>
      {dataFaq.map((e, i) => (
        <Accordion key={i} title={e.title}>
          {e.content}
        </Accordion>
      ))}
    </div>
  );
};
