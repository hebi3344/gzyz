import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onRun?: (code: string) => void;
  onChange?: (code: string) => void;
  showRunButton?: boolean;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultValue = '',
  language = 'python',
  onRun,
  onChange,
  showRunButton = true,
  height = '400px'
}) => {
  const [code, setCode] = useState(defaultValue);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    if (onRun && !isRunning) {
      setIsRunning(true);
      onRun(code);
      setTimeout(() => setIsRunning(false), 5000); // 5秒后重置运行状态
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-700">代码编辑器</h3>
        {showRunButton && (
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isRunning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRunning ? '运行中...' : '运行'}
          </button>
        )}
      </div>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <Editor
          height={height}
          defaultLanguage={language}
          value={code}
          onChange={(newValue) => {
            const newCode = newValue || '';
            setCode(newCode);
            if (onChange) {
              onChange(newCode);
            }
          }}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            fontSize: 14,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            parameterHints: {
              enabled: true
            },
            bracketPairColorization: {
              enabled: true
            },
            colorDecorators: true,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 5
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;