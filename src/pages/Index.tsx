import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'about', label: 'О КОМПАНИИ' },
    { id: 'activity', label: 'ДЕЯТЕЛЬНОСТЬ' },
    { id: 'products', label: 'ПРОДУКТЫ' },
    { id: 'career', label: 'КАРЬЕРА' },
    { id: 'contacts', label: 'КОНТАКТЫ' },
  ];

  const activities = [
    {
      icon: 'Drill',
      title: 'Добыча',
      description: 'Современные технологии разведки и добычи нефти на месторождениях',
    },
    {
      icon: 'Factory',
      title: 'Производство',
      description: 'Высокотехнологичное производство нефтепродуктов',
    },
    {
      icon: 'Truck',
      title: 'Транспортировка',
      description: 'Надежная логистическая сеть для доставки продукции',
    },
    {
      icon: 'Beaker',
      title: 'Переработка',
      description: 'Глубокая переработка с применением инновационных методов',
    },
    {
      icon: 'Globe',
      title: 'Экспорт',
      description: 'Поставки нефтепродуктов на международные рынки',
    },
    {
      icon: 'Leaf',
      title: 'Экология',
      description: 'Внедрение экологически чистых технологий производства',
    },
  ];

  const newsCards = [
    {
      image: 'https://cdn.poehali.dev/files/2a50e660-99b7-4a6b-8056-90f56170ec2d.png',
      title: 'Новые контракты',
      description: 'Узнайте о последних заключенных контрактах и партнёрствах Pactum Oil.',
    },
    {
      image: 'https://cdn.poehali.dev/files/f13e4907-cdb2-40c9-91f0-e58eae2fd170.png',
      title: 'Инновации в переработке',
      description: 'Ознакомьтесь с новыми технологиями и инновациями в области переработки нефти.',
    },
    {
      image: 'https://cdn.poehali.dev/files/32e21ab7-114b-49f1-ad57-9808c2db5430.png',
      title: 'События отрасли',
      description: 'Будьте в курсе ключевых событий и тенденций в нефтяной отрасли.',
    },
  ];

  const leadership = [
    {
      name: 'Александр Петров',
      position: 'Генеральный директор',
      description: 'Более 25 лет опыта в нефтегазовой отрасли',
    },
    {
      name: 'Елена Иванова',
      position: 'Финансовый директор',
      description: 'Эксперт в области корпоративных финансов',
    },
    {
      name: 'Михаил Сидоров',
      position: 'Технический директор',
      description: 'Специалист по инновационным технологиям',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FF8C00]">
      <nav className="fixed top-0 w-full bg-[#0A0A0A] z-50 border-b-2 border-[#FF8C00]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <img 
                src="https://cdn.poehali.dev/files/031b3d50-43ca-473b-9369-afec09d6e5ca.png" 
                alt="Pactum Oil Company Logo" 
                className="h-12 w-auto"
              />
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-[#FF8C00] transition-colors duration-300 font-semibold text-sm tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#FF8C00]">
                  <Icon name="Menu" size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0A0A0A] border-l-2 border-[#FF8C00] w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-white hover:text-[#FF8C00] transition-colors duration-300 font-semibold text-lg tracking-wide text-left py-3 border-b border-[#FF8C00]/20"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-[#0A0A0A] mb-6 leading-tight">
            Надежность<br />в каждой капле
          </h1>
          <p className="text-xl md:text-2xl text-[#0A0A0A] font-medium mb-4 max-w-4xl mx-auto">
            Полный цикл работы с минеральным топливом: от добычи до глубокой переработки
          </p>
          <p className="text-lg md:text-xl text-[#0A0A0A]/80 mb-10 max-w-3xl mx-auto">
            Широкий спектр нефтяной продукции
          </p>
          <Button
            onClick={() => scrollToSection('about')}
            className="bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] px-12 py-6 text-lg rounded-full font-semibold transition-all hover-scale"
          >
            Посмотреть
          </Button>
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A] rounded-t-[80px]">
        <div className="container mx-auto px-6">
          <img
            src="https://cdn.poehali.dev/files/32e21ab7-114b-49f1-ad57-9808c2db5430.png"
            alt="Oil visualization"
            className="w-full max-w-5xl mx-auto rounded-3xl animate-slide-up"
          />
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A] px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF8C00] mb-8 text-center scroll-animate opacity-0">
            Котировки нефти Brent
          </h2>
          <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] overflow-hidden scroll-animate opacity-0">
            <iframe
              src="https://www.profinance.ru/chart/brent/"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Котировки нефти Brent"
              className="w-full"
            />
          </Card>
        </div>
      </section>

      <section id="about" className="py-24 bg-[#0A0A0A] px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF8C00] mb-12 text-center scroll-animate opacity-0">О компании</h2>
          <div className="max-w-4xl mx-auto text-white text-lg leading-relaxed space-y-6">
            <p className="scroll-animate opacity-0">
              <strong className="text-[#FF8C00]">Pactum Oil Company</strong> — ведущая нефтяная компания, специализирующаяся на полном цикле работы с углеводородами: от разведки и добычи до глубокой переработки и экспорта нефтепродуктов.
            </p>
            <p className="scroll-animate opacity-0">
              Мы применяем передовые технологии и инновационные решения для обеспечения надежности, безопасности и экологичности всех производственных процессов.
            </p>
            <p className="scroll-animate opacity-0">
              Наша миссия — обеспечивать стабильные поставки качественной энергии, способствуя экономическому развитию и улучшению качества жизни людей по всему миру.
            </p>
          </div>
        </div>
      </section>

      <section id="activity" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF8C00] mb-16 text-center scroll-animate opacity-0">Деятельность</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="bg-[#0A0A0A] border-2 border-[#FF8C00] p-8 hover:bg-[#FF8C00] hover:border-[#0A0A0A] transition-all duration-300 hover-scale group scroll-animate opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon
                  name={activity.icon}
                  size={48}
                  className="text-[#FF8C00] mb-4 group-hover:text-[#0A0A0A] transition-colors"
                />
                <h3 className="text-2xl font-bold text-white group-hover:text-[#0A0A0A] mb-3 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-300 group-hover:text-[#0A0A0A] transition-colors">
                  {activity.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-[#0A0A0A] px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF8C00] mb-6 text-center scroll-animate opacity-0">Продукты</h2>
          <p className="text-center text-white text-xl mb-16 max-w-3xl mx-auto scroll-animate opacity-0">
            Следите за последними новостями и достижениями компании
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {newsCards.map((card, index) => (
              <Card key={index} className="bg-white overflow-hidden border-0 hover-scale transition-all scroll-animate opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">{card.title}</h3>
                  <p className="text-gray-700 mb-6">{card.description}</p>
                  <Button className="w-full bg-[#FF8C00] text-[#0A0A0A] hover:bg-[#FFA500] rounded-full font-semibold py-6">
                    Подробнее
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <section id="contacts" className="py-24 bg-[#0A0A0A] px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF8C00] mb-16 text-center scroll-animate opacity-0">Контакты</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="scroll-animate opacity-0">
              <h3 className="text-3xl font-bold text-white mb-8">Свяжитесь с нами</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-6">
                  <Icon name="MapPin" size={32} className="text-[#FF8C00] mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Адрес</h4>
                  <p className="text-gray-300 text-sm">г. Москва, ул. Нефтяная, д. 100</p>
                </Card>
                <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-6">
                  <Icon name="Phone" size={32} className="text-[#FF8C00] mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Телефон</h4>
                  <p className="text-gray-300 text-sm">+7 (495) 123-45-67</p>
                </Card>
                <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-6">
                  <Icon name="Mail" size={32} className="text-[#FF8C00] mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Email</h4>
                  <p className="text-gray-300 text-sm">info@pactumoil.com</p>
                </Card>
                <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-6">
                  <Icon name="Clock" size={32} className="text-[#FF8C00] mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Режим работы</h4>
                  <p className="text-gray-300 text-sm">Пн-Пт: 9:00 - 18:00</p>
                </Card>
              </div>
            </div>

            <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-8 scroll-animate opacity-0">
              <h3 className="text-3xl font-bold text-white mb-6">Форма обратной связи</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">Имя *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">Телефон</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">Сообщение *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00] resize-none"
                    placeholder="Расскажите, чем мы можем вам помочь..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF8C00] text-[#0A0A0A] hover:bg-[#FFA500] py-6 text-lg rounded-full font-semibold hover-scale"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section id="career" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF8C00] mb-8 scroll-animate opacity-0">Карьера</h2>
          <p className="text-white text-xl mb-12 scroll-animate opacity-0">
            Присоединяйтесь к команде профессионалов Pactum Oil Company и развивайте свою карьеру в динамично развивающейся отрасли.
          </p>
          <Card className="bg-white p-10 scroll-animate opacity-0">
            <h3 className="text-3xl font-bold text-[#0A0A0A] mb-6">Почему Pactum Oil?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-[#FF8C00] flex-shrink-0" />
                <p className="text-gray-700">Конкурентная заработная плата</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-[#FF8C00] flex-shrink-0" />
                <p className="text-gray-700">Возможности роста и развития</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-[#FF8C00] flex-shrink-0" />
                <p className="text-gray-700">Международные проекты</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={24} className="text-[#FF8C00] flex-shrink-0" />
                <p className="text-gray-700">Социальный пакет</p>
              </div>
            </div>
            <Button className="bg-[#FF8C00] text-[#0A0A0A] hover:bg-[#FFA500] px-12 py-6 text-lg rounded-full font-semibold hover-scale">
              Открытые вакансии
            </Button>
          </Card>
        </div>
      </section>

      <footer className="bg-[#0A0A0A] py-12 px-6 border-t-2 border-[#FF8C00]">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#FF8C00] rounded-full flex items-center justify-center">
              <Icon name="Flame" size={28} className="text-[#0A0A0A]" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wider">PACTUM</h1>
              <p className="text-[#FF8C00] text-xs font-semibold">OIL COMPANY</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            © 2024 Pactum Oil Company. Все права защищены.
          </p>
          <div className="flex justify-center gap-6">
            <Icon name="Facebook" size={24} className="text-[#FF8C00] hover:text-[#FFA500] cursor-pointer transition-colors" />
            <Icon name="Twitter" size={24} className="text-[#FF8C00] hover:text-[#FFA500] cursor-pointer transition-colors" />
            <Icon name="Linkedin" size={24} className="text-[#FF8C00] hover:text-[#FFA500] cursor-pointer transition-colors" />
            <Icon name="Instagram" size={24} className="text-[#FF8C00] hover:text-[#FFA500] cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;