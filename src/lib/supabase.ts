export type FarewellMessage = {
  id: string;
  name: string;
  nickname: string | null;
  message: string;
  created_at: string;
};

const STORAGE_KEY = 'farewell_messages';

function loadFromStorage(): FarewellMessage[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as FarewellMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(messages: FarewellMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export async function loadMessages(): Promise<FarewellMessage[]> {
  const messages = loadFromStorage();
  return messages.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function addMessage(message: {
  name: string;
  nickname: string | null;
  message: string;
}): Promise<FarewellMessage> {
  const messages = loadFromStorage();
  const newMessage: FarewellMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: message.name,
    nickname: message.nickname,
    message: message.message,
    created_at: new Date().toISOString(),
  };
  const updated = [newMessage, ...messages];
  saveToStorage(updated);
  return newMessage;
}
