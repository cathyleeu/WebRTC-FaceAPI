import { useChat } from 'hooks';
import ChatInput from './ChatInput'

const ChatWidget = () => {  
  const { messages } = useChat();

  return (
    <div>
      <div>
        <p>MESSAGES</p>
        {messages?.map((m, i) => <p key={i}> {m.username} {m.message} </p>)}
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatWidget;