import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'LayoutDashboard', label: 'Хэндоверы' },
    { path: '/clients', icon: 'Users', label: 'Клиенты' },
    { path: '/equipment', icon: 'Truck', label: 'Техника' },
    { path: '/tasks', icon: 'CheckSquare', label: 'Задачи' },
    { path: '/messages', icon: 'Mail', label: 'Переписка' },
    { path: '/analytics', icon: 'BarChart3', label: 'Аналитика' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">GESEM CRM</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive
                      ? 'bg-blue-50 text-primary hover:bg-blue-100 hover:text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="ml-3">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
