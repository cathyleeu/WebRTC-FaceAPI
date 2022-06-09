import { useInput, useChat } from 'hooks';

const ChatInput = () => {
  const { sendMessage } = useChat();
  const message = useInput('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    sendMessage({
      message: message.attrs.value,
      username: 'user'
    })
    message.setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value="user" readOnly/>
      <input type="text" name="message" {...message.attrs} className="border"/>
      <button>send</button>
    </form>
  )
}

export default ChatInput;