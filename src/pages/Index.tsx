import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

type HandoverStatus = 'new' | 'coordination' | 'procurement' | 'warehouse' | 'in-progress' | 'completed';

interface Handover {
  id: string;
  number: string;
  client: {
    name: string;
    inn: string;
  };
  equipment: string;
  serialNumber: string;
  status: HandoverStatus;
  assignee?: string;
  startDate: string;
  endDate: string;
  isUrgent: boolean;
  daysOverdue?: number;
}

const statusConfig: Record<HandoverStatus, { label: string; color: string; bgColor: string }> = {
  'new': { label: 'Новый', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  'coordination': { label: 'Координация', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  'procurement': { label: 'Закупки', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  'warehouse': { label: 'Склад', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  'in-progress': { label: 'В работе', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  'completed': { label: 'Завершен', color: 'text-green-700', bgColor: 'bg-green-100' },
};

const mockHandovers: Handover[] = [
  {
    id: '1',
    number: 'HO-2026-001',
    client: { name: 'ООО "Строймаш"', inn: '7701234567' },
    equipment: 'Экскаватор CAT 320',
    serialNumber: 'CAT320DL12345',
    status: 'new',
    startDate: '2026-01-20',
    endDate: '2026-01-25',
    isUrgent: false,
  },
  {
    id: '2',
    number: 'HO-2026-002',
    client: { name: 'АО "ГорТех"', inn: '7702345678' },
    equipment: 'Бульдозер Komatsu D65',
    serialNumber: 'KMT65PX67890',
    status: 'coordination',
    assignee: 'Петров И.С.',
    startDate: '2026-01-15',
    endDate: '2026-01-22',
    isUrgent: true,
    daysOverdue: 8,
  },
  {
    id: '3',
    number: 'HO-2026-003',
    client: { name: 'ЗАО "Металлург"', inn: '7703456789' },
    equipment: 'Погрузчик Volvo L120',
    serialNumber: 'VLV120HL11223',
    status: 'procurement',
    assignee: 'Соколова А.В.',
    startDate: '2026-01-18',
    endDate: '2026-01-28',
    isUrgent: false,
  },
  {
    id: '4',
    number: 'HO-2026-004',
    client: { name: 'ООО "Транс-Логистика"', inn: '7704567890' },
    equipment: 'Автокран Liebherr LTM 1200',
    serialNumber: 'LBR1200CR44556',
    status: 'warehouse',
    assignee: 'Кузнецов Д.М.',
    startDate: '2026-01-16',
    endDate: '2026-01-24',
    isUrgent: false,
  },
  {
    id: '5',
    number: 'HO-2026-005',
    client: { name: 'ООО "Энергострой"', inn: '7705678901' },
    equipment: 'Генератор Caterpillar C18',
    serialNumber: 'CATC18GN77889',
    status: 'in-progress',
    assignee: 'Морозов В.Л.',
    startDate: '2026-01-10',
    endDate: '2026-01-20',
    isUrgent: false,
  },
];

const Index = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedHandover, setSelectedHandover] = useState<Handover | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const columns: HandoverStatus[] = ['new', 'coordination', 'procurement', 'warehouse', 'in-progress', 'completed'];

  const filteredHandovers = mockHandovers.filter(h => {
    const matchesSearch = h.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.client.inn.includes(searchQuery) ||
                          h.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getHandoversByStatus = (status: HandoverStatus) => {
    return filteredHandovers.filter(h => h.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-b border-gray-200 px-6 py-4 -m-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Хэндоверы</h1>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                  className={viewMode === 'kanban' ? 'bg-white shadow-sm' : ''}
                >
                  <Icon name="Columns3" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
                >
                  <Icon name="List" size={16} />
                </Button>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={18} />
                <span className="ml-2">Создать хэндовер</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск по клиенту, ИНН, технике..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Icon name="SlidersHorizontal" size={18} />
            </Button>
          </div>
      </div>

      <div>
          {viewMode === 'kanban' ? (
            <div className="flex gap-4 h-full">
              {columns.map((status) => {
                const handovers = getHandoversByStatus(status);
                const config = statusConfig[status];
                return (
                  <div key={status} className="flex-1 min-w-[280px] flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{config.label}</h3>
                        <Badge variant="secondary" className="rounded-full">
                          {handovers.length}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {handovers.map((handover) => (
                        <Card
                          key={handover.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedHandover(handover)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-medium text-sm text-gray-900 mb-1">
                                  {handover.number}
                                </p>
                                <p className="text-xs text-gray-500">{handover.client.name}</p>
                              </div>
                              {handover.isUrgent && (
                                <div className="flex items-center gap-1 text-red-600">
                                  <Icon name="AlertCircle" size={16} />
                                  {handover.daysOverdue && (
                                    <span className="text-xs font-medium">{handover.daysOverdue}д</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Icon name="Truck" size={14} />
                                <span className="truncate">{handover.equipment}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Icon name="Calendar" size={14} />
                                <span>{handover.startDate} — {handover.endDate}</span>
                              </div>
                              {handover.assignee && (
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                      {handover.assignee.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-gray-700">{handover.assignee}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHandovers.map((handover) => (
                <Card
                  key={handover.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedHandover(handover)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-1 h-12 rounded-full bg-blue-500" />
                        <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                          <div>
                            <p className="font-medium text-sm text-gray-900">{handover.number}</p>
                            <p className="text-xs text-gray-500 mt-1">{handover.client.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-700">{handover.equipment}</p>
                            <p className="text-xs text-gray-500 mt-1">{handover.serialNumber}</p>
                          </div>
                          <div>
                            <Badge className={`${statusConfig[handover.status].bgColor} ${statusConfig[handover.status].color} border-0`}>
                              {statusConfig[handover.status].label}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            {handover.startDate} — {handover.endDate}
                          </div>
                          <div className="flex items-center justify-between">
                            {handover.assignee && (
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {handover.assignee.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-700">{handover.assignee}</span>
                              </div>
                            )}
                            {handover.isUrgent && (
                              <div className="flex items-center gap-1 text-red-600">
                                <Icon name="AlertCircle" size={16} />
                                {handover.daysOverdue && (
                                  <span className="text-xs font-medium">{handover.daysOverdue}д</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
      </div>

      <Dialog open={!!selectedHandover} onOpenChange={(open) => !open && setSelectedHandover(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedHandover && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedHandover.number}</DialogTitle>
                  <Badge className={`${statusConfig[selectedHandover.status].bgColor} ${statusConfig[selectedHandover.status].color} border-0`}>
                    {statusConfig[selectedHandover.status].label}
                  </Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="general" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general">Общее</TabsTrigger>
                  <TabsTrigger value="equipment">Оборудование</TabsTrigger>
                  <TabsTrigger value="documents">Документы</TabsTrigger>
                  <TabsTrigger value="history">История</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Клиент</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Наименование:</span>
                        <span className="text-gray-900 font-medium">{selectedHandover.client.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ИНН:</span>
                        <span className="text-gray-900">{selectedHandover.client.inn}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Техника</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Наименование:</span>
                        <span className="text-gray-900 font-medium">{selectedHandover.equipment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Серийный номер:</span>
                        <span className="text-gray-900">{selectedHandover.serialNumber}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Сроки выполнения</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Дата начала:</span>
                        <span className="text-gray-900">{selectedHandover.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Дата окончания:</span>
                        <span className="text-gray-900">{selectedHandover.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {selectedHandover.assignee && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Исполнитель</h4>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {selectedHandover.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedHandover.assignee}</p>
                            <p className="text-xs text-gray-500">Сервисный инженер</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="equipment">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Список необходимого оборудования будет отображаться здесь</p>
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Документы по проекту будут отображаться здесь</p>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">История изменений будет отображаться здесь</p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedHandover(null)}>
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

export default Index;