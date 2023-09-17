import BaseAPI from './baseAPI';
import { User } from './userAPI';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super();
  }

  create(title: string) {
    return this.http.post('/chats', { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/chats', { chatId: id });
  }


  read(): Promise<ChatInfo[]> {
    return this.http.get('/chats');
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/chats/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/chats/users', { users, chatId: id });
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/chats/users', {users, chatId: id})
  }

  updateAvatarChat(file: FormData) {
    return this.http.put("/chats/avatar", file)
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/chats/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
