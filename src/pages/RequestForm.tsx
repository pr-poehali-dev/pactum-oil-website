import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productName: '',
    specification: '',
    quantity: '',
    destination: '',
    notes: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/9b27c5d1-3e7d-404d-9d66-b32c7802c4ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Запрос отправлен!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setFormData({
          name: '',
          phone: '',
          productName: '',
          specification: '',
          quantity: '',
          destination: '',
          notes: ''
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить запрос. Попробуйте позже.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить запрос. Проверьте подключение к интернету.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white hover:text-[#FF8C00] mb-8"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад на главную
        </Button>

        <Card className="bg-[#1A1A1A] border-2 border-[#FF8C00] p-8">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Запрос продукции</h1>
          <p className="text-gray-300 text-center mb-8">
            Заполните форму, и наш менеджер свяжется с вами для уточнения деталей
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2">
                Имя *
              </label>
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
              <label htmlFor="phone" className="block text-white font-semibold mb-2">
                Телефон *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div>
              <label htmlFor="productName" className="block text-white font-semibold mb-2">
                Наименование *
              </label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                placeholder="Название продукции"
              />
            </div>

            <div>
              <label htmlFor="specification" className="block text-white font-semibold mb-2">
                Детальная спецификация *
              </label>
              <Textarea
                id="specification"
                name="specification"
                value={formData.specification}
                onChange={handleInputChange}
                required
                rows={4}
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00] resize-none"
                placeholder="Укажите технические характеристики, требования к качеству..."
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-white font-semibold mb-2">
                Количество *
              </label>
              <Input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                placeholder="Объем в тоннах, литрах или баррелях"
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-white font-semibold mb-2">
                Место назначения *
              </label>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00]"
                placeholder="Город, регион или страна доставки"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-white font-semibold mb-2">
                Примечания
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="bg-[#0A0A0A] border-[#FF8C00] text-white placeholder:text-gray-500 focus:ring-[#FF8C00] resize-none"
                placeholder="Дополнительная информация, особые требования..."
              />
            </div>

            <p className="text-gray-400 text-xs text-center">
              Нажимая на кнопку ниже вы даете свое согласие на обработку персональных данных
            </p>

            <Button
              type="submit"
              className="w-full bg-[#FF8C00] text-[#0A0A0A] hover:bg-[#FFA500] py-6 text-lg rounded-full font-semibold hover-scale"
            >
              <Icon name="Send" size={20} className="mr-2" />
              Отправить запрос
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestForm;