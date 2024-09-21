import Textarea from 'react-textarea-autosize'
import { userEnterSubmit } from "@/lib/util";
import { ChangeEvent } from 'react';

interface Props {
  inputValue: string
  setInputValue: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => void
  sendMessage: () => void
}

export default function ChatInput({ inputValue, setInputValue, sendMessage }: Props) {
  return (
    <div className="fixed w-[calc(100%-25rem)] bottom-0 p-5 bg-white">
      <div className="flex">
        <Textarea
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
          value={inputValue}
          rows={1}
          onChange={setInputValue}
          onKeyDown={(e) => userEnterSubmit(e) && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
