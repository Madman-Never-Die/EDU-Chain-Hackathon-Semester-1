import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

const CreateQuestForm: React.FC = () => {
  const [questTitle, setQuestTitle] = useState('');
  const [protocolContent, setProtocolContent] = useState('');

  return (
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Quest Title</label>
          <input
              type="text"
              value={questTitle}
              onChange={(e) => setQuestTitle(e.target.value)}
              placeholder="Enter your quest title here"
              className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Protocol Content</label>
          <p className="text-sm sm:text-base text-gray-400 mb-2">
            The following is a rich text editor. You can use it to format the content of your protocol.
          </p>
          <textarea
              value={protocolContent}
              onChange={(e) => setProtocolContent(e.target.value)}
              placeholder="Content"
              rows={6}
              className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
          ></textarea>
        </div>

        <QuestionForm />
      </div>
  );
};

export default CreateQuestForm;