import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Client {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  equipmentCount: number;
  activeHandovers: number;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'ООО "Строймаш"',
    inn: '7701234567',
    kpp: '770101001',
    address: 'г. Москва, ул. Ленина, д. 10',
    contactPerson: 'Иванов Иван Иванович',
    phone: '+7 (495) 123-45-67',
    email: 'info@stroymash.ru',
    equipmentCount: 5,
    activeHandovers: 1,
  },
  {
    id: '2',
    name: 'АО "ГорТех"',
    inn: '7702345678',
    kpp: '770201001',
    address: 'г. Москва, пр. Мира, д. 25',
    contactPerson: 'Петрова Анна Сергеевна',
    phone: '+7 (495) 234-56-78',
    email: 'contact@gortech.ru',
    equipmentCount: 8,
    activeHandovers: 1,
  },
  {
    id: '3',
    name: 'ЗАО "Металлург"',
    inn: '7703456789',
    kpp: '770301001',
    address: 'г. Санкт-Петербург, Невский пр., д. 50',
    contactPerson: 'Соколов Петр Дмитриевич',
    phone: '+7 (812) 345-67-89',
    email: 'office@metallurg.ru',
    equipmentCount: 12,
    activeHandovers: 1,
  },
];

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.inn.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Клиенты</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={18} />
          <span className="ml-2">Добавить клиента</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск по наименованию или ИНН..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Icon name="SlidersHorizontal" size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedClient(client)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-primary text-white">
                    <AvatarFallback>
                      {client.name.split(' ')[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">ИНН: {client.inn}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="User" size={14} />
                  <span className="truncate">{client.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="Phone" size={14} />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="Mail" size={14} />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-500">Техника:</span>
                    <span className="ml-1 font-medium text-gray-900">{client.equipmentCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Активные:</span>
                    <span className="ml-1 font-medium text-gray-900">{client.activeHandovers}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          {selectedClient && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Реквизиты</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ИНН:</span>
                      <span className="text-gray-900 font-medium">{selectedClient.inn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">КПП:</span>
                      <span className="text-gray-900">{selectedClient.kpp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Адрес:</span>
                      <span className="text-gray-900 text-right">{selectedClient.address}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Контактное лицо</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ФИО:</span>
                      <span className="text-gray-900 font-medium">{selectedClient.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Телефон:</span>
                      <span className="text-gray-900">{selectedClient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">{selectedClient.email}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Статистика</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Единиц техники</p>
                      <p className="text-2xl font-semibold text-gray-900">{selectedClient.equipmentCount}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Активных проектов</p>
                      <p className="text-2xl font-semibold text-gray-900">{selectedClient.activeHandovers}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Закрыть
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Редактировать
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
