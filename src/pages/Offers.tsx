import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Offers = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [filterVolume, setFilterVolume] = useState('all');

  const offers = [
    {
      id: 1,
      title: 'Нефть сырая среднетрубная',
      description: 'Высококачественная сырая нефть для переработки',
      specifications: [
        'ГОСТ Р 51858-2002',
        'Минимальный объем: от 10 000 МТ'
      ],
      category: 'crude',
      minVolume: 10000,
      available: true,
      price: 'По запросу'
    },
    {
      id: 2,
      title: 'Дизельное топливо',
      description: 'Экологичное дизельное топливо стандарта Евро',
      specifications: [
        'Евро К5, ГОСТ Р 32511-2013',
        'Минимальный объем: от 10 000 МТ',
        'Цетановое число: не менее 51'
      ],
      category: 'fuel',
      minVolume: 10000,
      available: true,
      price: 'По запросу'
    },
    {
      id: 3,
      title: 'Бензин автомобильный',
      description: 'Высококачественный бензин для автотранспорта',
      specifications: [
        'АИ-92, АИ-95, ГОСТ 32513-2013',
        'Минимальный объем: от 5 000 МТ',
        'Октановое число: 92-95',
        'Экологический класс: К5'
      ],
      category: 'fuel',
      minVolume: 5000,
      available: true,
      price: 'По запросу'
    },
    {
      id: 4,
      title: 'Мазут топочный',
      description: 'Топливо для промышленных котельных',
      specifications: [
        'М-100, ГОСТ 10585-2013',
        'Минимальный объем: от 20 000 МТ',
        'Вязкость условная: 10-16°ВУ'
      ],
      category: 'fuel',
      minVolume: 20000,
      available: true,
      price: 'По запросу'
    },
    {
      id: 5,
      title: 'Керосин авиационный',
      description: 'Высококачественное авиационное топливо',
      specifications: [
        'ТС-1, ГОСТ 10227-2013',
        'Минимальный объем: от 5 000 МТ',
        'Температура вспышки: не ниже 28°С',
        'Кислотность: не более 0.7 мг КОН/100мл'
      ],
      category: 'fuel',
      minVolume: 5000,
      available: true,
      price: 'По запросу'
    },
    {
      id: 6,
      title: 'Битум нефтяной',
      description: 'Дорожный и строительный битум',
      specifications: [
        'БНД 60/90, ГОСТ 33133-2014',
        'Минимальный объем: от 10 000 МТ',
        'Пенетрация: 60-90 (0.1мм)',
        'Температура размягчения: 47-54°С'
      ],
      category: 'other',
      minVolume: 10000,
      available: true,
      price: 'По запросу'
    }
  ];

  const filteredOffers = offers.filter(offer => {
    const typeMatch = filterType === 'all' || offer.category === filterType;
    const volumeMatch = filterVolume === 'all' || 
      (filterVolume === '5000' && offer.minVolume <= 5000) ||
      (filterVolume === '10000' && offer.minVolume <= 10000) ||
      (filterVolume === '20000' && offer.minVolume <= 20000);
    return typeMatch && volumeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <nav className="bg-[#0A0A0A] border-b-4 border-[#FF8C00] sticky top-0 z-50 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="https://cdn.poehali.dev/files/192ce21d-f20e-4289-bb57-c70974d9603a.png" 
              alt="Pactum Oil Company Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-white font-bold text-xl">Pactum Oil</span>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:text-[#FF8C00]"
          >
            <Icon name="Home" size={20} className="mr-2" />
            На главную
          </Button>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl py-20 px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0A0A0A] mb-6">
            Актуальные предложения
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Качественная нефтяная продукция для ваших потребностей
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="w-full sm:w-64">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-2 border-[#FF8C00]">
                <SelectValue placeholder="Тип продукции" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="crude">Нефть сырая</SelectItem>
                <SelectItem value="fuel">Топливо</SelectItem>
                <SelectItem value="other">Прочее</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-64">
            <Select value={filterVolume} onValueChange={setFilterVolume}>
              <SelectTrigger className="border-2 border-[#FF8C00]">
                <SelectValue placeholder="Минимальный объем" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой объем</SelectItem>
                <SelectItem value="5000">До 5 000 МТ</SelectItem>
                <SelectItem value="10000">До 10 000 МТ</SelectItem>
                <SelectItem value="20000">До 20 000 МТ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <Card 
              key={offer.id}
              className="bg-white border-2 border-gray-200 hover:border-[#FF8C00] transition-all duration-300 overflow-hidden hover:shadow-xl flex flex-col"
            >
              <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-white/90">{offer.description}</p>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-[#0A0A0A] mb-3 flex items-center gap-2">
                    <Icon name="FileText" size={18} className="text-[#FF8C00]" />
                    Характеристики:
                  </h4>
                  <ul className="space-y-2">
                    {offer.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                        <Icon name="CheckCircle" size={16} className="text-[#FF8C00] flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Статус:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      offer.available 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {offer.available ? 'В наличии' : 'Под заказ'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Цена:</span>
                    <span className="text-[#FF8C00] font-bold text-lg">{offer.price}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/request')}
                  className="w-full bg-[#FF8C00] text-white hover:bg-[#FFA500] py-6 text-base rounded-full font-semibold transition-all hover:scale-105"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Запросить предложение
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Не нашли нужную продукцию?
            </h3>
            <p className="text-gray-300 mb-6">
              Мы работаем с широким спектром нефтепродуктов. 
              Свяжитесь с нами для индивидуального предложения.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/request')}
                className="bg-[#FF8C00] text-white hover:bg-[#FFA500] px-8 py-6 text-lg rounded-full font-semibold"
              >
                <Icon name="FileText" size={20} className="mr-2" />
                Отправить запрос
              </Button>
              <Button
                asChild
                className="bg-white border-2 border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white px-8 py-6 text-lg rounded-full font-semibold"
              >
                <a href="/#contacts">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться с нами
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Offers;