import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface TradeItem {
  type: 'plant' | 'pet' | 'coins';
  name: string;
  quantity: number;
}

interface Trade {
  id: string;
  user: string;
  userAvatar: string;
  title: string;
  offering: TradeItem[];
  seeking: TradeItem[];
  description: string;
  created: string;
  status: 'active' | 'completed';
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [createTradeOpen, setCreateTradeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTradeId, setSelectedTradeId] = useState<string>('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [tradeForm, setTradeForm] = useState({
    title: '',
    description: '',
    offering: [] as TradeItem[],
    seeking: [] as TradeItem[]
  });
  
  const [activeTab, setActiveTab] = useState('login');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const mockTrades: Trade[] = [
    {
      id: '1',
      user: 'GardenMaster',
      userAvatar: '/placeholder.svg',
      title: 'Редкие семена за питомца',
      offering: [{ type: 'plant', name: 'Семена розы', quantity: 5 }],
      seeking: [{ type: 'pet', name: 'Кролик', quantity: 1 }],
      description: 'Обменяю редкие семена розы на милого кролика для сада',
      created: '2 часа назад',
      status: 'active'
    },
    {
      id: '2',
      user: 'PetLover',
      userAvatar: '/placeholder.svg',
      title: 'Котенок за шекели',
      offering: [{ type: 'pet', name: 'Котенок', quantity: 1 }],
      seeking: [{ type: 'coins', name: 'Шекели', quantity: 50 }],
      description: 'Продаю очаровательного котенка',
      created: '5 часов назад',
      status: 'active'
    },
    {
      id: '3',
      user: 'PlantCollector',
      userAvatar: '/placeholder.svg',
      title: 'Большая коллекция растений',
      offering: [
        { type: 'plant', name: 'Орхидея', quantity: 3 },
        { type: 'plant', name: 'Кактус', quantity: 7 }
      ],
      seeking: [{ type: 'coins', name: 'Шекели', quantity: 100 }],
      description: 'Распродаю коллекцию редких растений',
      created: '1 день назад',
      status: 'active'
    }
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'plant': return 'Leaf';
      case 'pet': return 'Heart';
      case 'coins': return 'Coins';
      default: return 'Package';
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'plant': return 'bg-green-100 text-green-800';
      case 'pet': return 'bg-red-100 text-red-800';
      case 'coins': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(loginForm.username);
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(registerForm.username);
    setIsLoggedIn(true);
  };

  const handleCreateTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateTradeOpen(false);
    setTradeForm({
      title: '',
      description: '',
      offering: [],
      seeking: []
    });
  };

  const openChat = (tradeId: string) => {
    setSelectedTradeId(tradeId);
    setChatOpen(true);
    setMessages([
      {
        id: '1',
        sender: 'GardenMaster',
        message: 'Привет! Интересует обмен?',
        timestamp: '14:30'
      },
      {
        id: '2',
        sender: currentUser,
        message: 'Да, хочу обсудить детали',
        timestamp: '14:32'
      }
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: currentUser,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Grow a Garden Trading
            </h1>
            <p className="text-gray-600">
              Торгуйте растениями, питомцами и шекелями с другими игроками
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Добро пожаловать!</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Вход</TabsTrigger>
                    <TabsTrigger value="register">Регистрация</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input
                          id="username"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Войти
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="reg-username">Имя пользователя</Label>
                        <Input
                          id="reg-username"
                          value={registerForm.username}
                          onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-password">Пароль</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Зарегистрироваться
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Популярные трейды
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Семена → Питомцы</span>
                      <Badge variant="secondary">24 активных</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm">Питомцы → Шекели</span>
                      <Badge variant="secondary">18 активных</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Растения → Шекели</span>
                      <Badge variant="secondary">15 активных</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Сообщество
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-600">активных трейдеров</div>
                    <Separator />
                    <div className="text-2xl font-bold text-green-600">5,678</div>
                    <div className="text-sm text-gray-600">завершенных сделок</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Grow a Garden Trading
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Dialog open={createTradeOpen} onOpenChange={setCreateTradeOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать трейд
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создать новый трейд</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleCreateTrade} className="space-y-6">
                    <div>
                      <Label htmlFor="trade-title">Название трейда</Label>
                      <Input
                        id="trade-title"
                        value={tradeForm.title}
                        onChange={(e) => setTradeForm({...tradeForm, title: e.target.value})}
                        placeholder="Например: Редкие семена за питомца"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="trade-description">Описание</Label>
                      <Textarea
                        id="trade-description"
                        value={tradeForm.description}
                        onChange={(e) => setTradeForm({...tradeForm, description: e.target.value})}
                        placeholder="Детали вашего предложения..."
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-base font-medium">Что предлагаете</Label>
                        <div className="mt-2 space-y-3 p-4 border rounded-lg bg-green-50">
                          <div className="flex gap-2">
                            <Select>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Тип предмета" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="plant">🌱 Растение</SelectItem>
                                <SelectItem value="pet">🐾 Питомец</SelectItem>
                                <SelectItem value="coins">🪙 Шекели</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input placeholder="Название" className="flex-1" />
                            <Input placeholder="Кол-во" type="number" className="w-20" />
                            <Button type="button" size="sm">
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Что хотите получить</Label>
                        <div className="mt-2 space-y-3 p-4 border rounded-lg bg-blue-50">
                          <div className="flex gap-2">
                            <Select>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Тип предмета" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="plant">🌱 Растение</SelectItem>
                                <SelectItem value="pet">🐾 Питомец</SelectItem>
                                <SelectItem value="coins">🪙 Шекели</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input placeholder="Название" className="flex-1" />
                            <Input placeholder="Кол-во" type="number" className="w-20" />
                            <Button type="button" size="sm">
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setCreateTradeOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit">
                        Создать трейд
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{currentUser[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{currentUser}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Активные трейды</h2>
          <p className="text-gray-600">Найдите интересные предложения от других игроков</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTrades.map((trade) => (
            <Card key={trade.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{trade.title}</CardTitle>
                  <Badge variant={trade.status === 'active' ? 'default' : 'secondary'}>
                    {trade.status === 'active' ? 'Активен' : 'Завершен'}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={trade.userAvatar} />
                    <AvatarFallback>{trade.user[0]}</AvatarFallback>
                  </Avatar>
                  <span>{trade.user}</span>
                  <span>•</span>
                  <span>{trade.created}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{trade.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-2">Предлагает:</div>
                    <div className="flex flex-wrap gap-2">
                      {trade.offering.map((item, idx) => (
                        <Badge key={idx} className={getItemColor(item.type)}>
                          <Icon name={getItemIcon(item.type)} size={12} className="mr-1" />
                          {item.name} ({item.quantity})
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="text-sm font-medium text-blue-700 mb-2">Хочет получить:</div>
                    <div className="flex flex-wrap gap-2">
                      {trade.seeking.map((item, idx) => (
                        <Badge key={idx} className={getItemColor(item.type)}>
                          <Icon name={getItemIcon(item.type)} size={12} className="mr-1" />
                          {item.name} ({item.quantity})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => openChat(trade.id)} 
                  className="w-full"
                  variant="outline"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать в чат
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Чат с GardenMaster</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-64 border rounded-lg p-3 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === currentUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border'
                    }`}>
                      <div>{msg.message}</div>
                      <div className={`text-xs mt-1 ${
                        msg.sender === currentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;