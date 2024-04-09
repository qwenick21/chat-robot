export interface ChatRoom {
  name: string;
  href: string;
  editable: boolean;
}

export interface Message {
  content: string;
  role: string;
}
