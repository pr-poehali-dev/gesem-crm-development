import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  owner: string;
  ownerInn: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastService: string;
  handoversCount: number;
}

const statusConfig = {
  active: { label: 'Активна', color: 'text-green-700', bgColor: 'bg-green-100' },
  maintenance: { label: 'На обслуживании', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  inactive: { label: 'Неактивна', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Экскаватор CAT 320',
    serialNumber: 'CAT320DL12345',
    manufacturer: 'Caterpillar',
    model: '320D L',
    owner: 'ООО "Строймаш"',
    ownerInn: '7701234567',
    status: 'active',
    lastService: '2025-12-10',
    handoversCount: 3,
  },
  {
    id: '2',
    name: 'Бульдозер Komatsu D65',
    serialNumber: 'KMT65PX67890',
    manufacturer: 'Komatsu',
    model: 'D65PX-18',
    owner: 'АО "ГорТех"',
    ownerInn: '7702345678',
    status: 'maintenance',
    lastService: '2026-01-05',
    handoversCount: 5,
  },
  {
    id: '3',
    name: 'Погрузчик Volvo L120',
    serialNumber: 'VLV120HL11223',
    manufacturer: 'Volvo',
    model: 'L120H',
    owner: 'ЗАО "Металлург"',
    ownerInn: '7703456789',
    status: 'active',
    lastService: '2025-11-20',
    handoversCount: 7,
  },
  {
    id: '4',
    name: 'Автокран Liebherr LTM 1200',
    serialNumber: 'LBR1200CR44556',
    manufacturer: 'Liebherr',
    model: 'LTM 1200-5.1',
    owner: 'ООО "Транс-Логистика"',
    ownerInn: '7704567890',
    status: 'active',
    lastService: '2025-12-28',
    handoversCount: 2,
  },
];

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const filteredEquipment = mockEquipment.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Техника</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={18} />
          <span className="ml-2">Добавить технику</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск по названию, серийному номеру или владельцу..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Icon name="SlidersHorizontal" size={18} />
        </Button>
      </div>

      <div className="space-y-3">
        {filteredEquipment.map((equipment) => (
          <Card
            key={equipment.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedEquipment(equipment)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-gray-600" />
                  </div>
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="font-medium text-gray-900">{equipment.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{equipment.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{equipment.manufacturer}</p>
                      <p className="text-xs text-gray-500 mt-1">{equipment.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{equipment.owner}</p>
                      <p className="text-xs text-gray-500 mt-1">ИНН: {equipment.ownerInn}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`${statusConfig[equipment.status].bgColor} ${statusConfig[equipment.status].color} border-0`}>
                        {statusConfig[equipment.status].label}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        {equipment.handoversCount} проектов
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEquipment} onOpenChange={(open) => !open && setSelectedEquipment(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEquipment && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedEquipment.name}</DialogTitle>
                  <Badge className={`${statusConfig[selectedEquipment.status].bgColor} ${statusConfig[selectedEquipment.status].color} border-0`}>
                    {statusConfig[selectedEquipment.status].label}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Основная информация</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Производитель:</span>
                      <span className="text-gray-900 font-medium">{selectedEquipment.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Модель:</span>
                      <span className="text-gray-900">{selectedEquipment.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Серийный номер:</span>
                      <span className="text-gray-900">{selectedEquipment.serialNumber}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Владелец</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Наименование:</span>
                      <span className="text-gray-900 font-medium">{selectedEquipment.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ИНН:</span>
                      <span className="text-gray-900">{selectedEquipment.ownerInn}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">История обслуживания</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Последнее обслуживание:</span>
                      <span className="text-gray-900">{selectedEquipment.lastService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Всего проектов:</span>
                      <span className="text-gray-900 font-medium">{selectedEquipment.handoversCount}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">История работ</h4>
                  <p className="text-sm text-gray-500">Полная история обслуживания техники будет отображаться здесь</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedEquipment(null)}>
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

export default Equipment;
