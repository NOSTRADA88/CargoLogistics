import { Car } from "../assets";


const Advantages = () => {
  const advantagesList = [
    {
      title: 'Все логические услуги',
      description: 'Миссия «Международного Таможенного Сервиса» — предоставление нашим клиентам безопасных и эффективных перевозок всех видов по любым направлениям',
    },
    {
      title: 'ГАРАНТИЯ КАЧЕСТВА',
      description: 'Высокое качество оказания таможенных и транспортно-логистических услуг',
    },
    {
      title: 'МЕЖДУНАРОДНЫЙ УРОВЕНЬ',
      description: 'Большой опыт работы с международными перевозчиками и с сотрудниками таможенных служб',
    },
    {
      title: 'ПРОФЕССИОНАЛИЗМ',
      description: 'Сплочённость коллектива, состоящего из профессионалов, способных решить большую часть поставленных задач',
    },
    {
      title: 'ДОСТУПНОСТЬ УСЛУГ',
      description: 'Мы предлагаем самые приемлемые цены на логистические услуги',
    },
    {
      title: 'ИНДИВИДУАЛЬНЫЙ ПОДХОД',
      description: 'Гарантированный успешный результат вследствие индивидуального подхода к каждому отдельно взятому клиенту',
    },
  ];
  return (
    <div className="flex flex-col items-center pb-20">
      <h1 className="text-center font-montserrat text-4xl font-semibold text-main-yellow mb-8  max-2xl:text-2xl max-lg:text-xl max-sm:text-base">
        Наши преимущества
      </h1>

      <div className="relative">
        <img
          src={Car}
          alt="car"
          style={{ width: '100%', height: 'auto', maxWidth: '1200px', margin: 'auto' }}
          className="absolute inset-0 object-cover max-lg:hidden"
        />

        <div className="grid grid-cols-3 max-2xl:grid-cols-2 max-md:grid-cols-1  relative z-10  max-md:mx-5 max-xl:mx-10">
          {advantagesList.map((advantage, index) => (
              <div key={index} className="w-full  px-20  mb-20 max-xl:px-10  max-xl:mb-14 max-sm:px-5  max-sm:mb-5">
                <div className="rounded-lg border-2 border-main-yellow p-10 bg-white flex flex-col h-full max-lg:p-8">
                  <p className={`text-center font-montserrat text-2xl font-semibold uppercase max-2xl:text-xl max-lg:text-base  max-[400px]:text-sm  
                 ${index % 2 === 0 ? 'text-main-text' : 'text-main-yellow'}`}>
                    {advantage.title}
                  </p>
                  <p className="text-center font-montserrat text-black text-base max-[400px]:text-xs   font-normal leading-normal mt-5">
                    {advantage.description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Advantages