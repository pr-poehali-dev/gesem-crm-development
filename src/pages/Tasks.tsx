import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  handoverId?: string;
  handoverNumber?: string;
}

const priorityConfig = {
  high: { label: 'Высокий', color: 'text-red-700', bgColor: 'bg-red-100' },
  medium: { label: 'Средний', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  low: { label: 'Низкий', color: 'text-green-700', bgColor: 'bg-green-100' },
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Согласовать даты выполнения работ',
    description: 'Связаться с клиентом для уточнения удобных дат проведения работ',
    assignee: 'Петров И.С.',
    dueDate: '2026-01-15',
    priority: 'high',
    status: 'pending',
    handoverId: '2',
    handoverNumber: 'HO-2026-002',
  },
  {
    id: '2',
    title: 'Проверить наличие оборудования на складе',
    description: 'Уточнить наличие необходимых деталей для проведения ТО',
    assignee: 'Соколова А.В.',
    dueDate: '2026-01-16',
    priority: 'medium',
    status: 'pending',
    handoverId: '3',
    handoverNumber: 'HO-2026-003',
  },
  {
    id: '3',
    title: 'Подготовить отчет по завершенным проектам',
    description: 'Собрать данные за декабрь 2025 и подготовить презентацию',
    assignee: 'Морозов В.Л.',
    dueDate: '2026-01-18',
    priority: 'low',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Отправить документы клиенту',
    description: 'Договор, УПД и акт выполненных работ',
    assignee: 'Кузнецов Д.М.',
    dueDate: '2026-01-14',
    priority: 'high',
    status: 'completed',
    handoverId: '4',
    handoverNumber: 'HO-2026-004',
  },
];

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(mockTasks);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.handoverNumber && t.handoverNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    ));
  };

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Задачи</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={18} />
          <span className="ml-2">Создать задачу</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск по названию задачи или номеру хэндовера..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Активные задачи</h3>
            <Badge variant="secondary" className="rounded-full">
              {pendingTasks.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <Badge className={`${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color} border-0 ml-3`}>
                          {priorityConfig[task.priority].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[10px]">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                        {task.handoverNumber && (
                          <div className="flex items-center gap-1">
                            <Icon name="Link" size={14} />
                            <span className="text-primary">{task.handoverNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Завершенные задачи</h3>
            <Badge variant="secondary" className="rounded-full">
              {completedTasks.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1 line-through">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <Badge className={`${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color} border-0 ml-3`}>
                          {priorityConfig[task.priority].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[10px]">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                        {task.handoverNumber && (
                          <div className="flex items-center gap-1">
                            <Icon name="Link" size={14} />
                            <span className="text-primary">{task.handoverNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
