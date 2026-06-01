import React, { useState, useCallback, useRef, useEffect } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onRun?: (code: string) => void;
  onChange?: (code: string) => void;
  onError?: (errors: ErrorMarker[]) => void;
  showRunButton?: boolean;
  height?: string;
}

interface ErrorMarker {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

const PYTHON_SNIPPETS = [
  {
    label: 'pandas-import',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'import pandas as pd',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Import pandas library',
  },
  {
    label: 'numpy-import',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'import numpy as np',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Import numpy library',
  },
  {
    label: 'matplotlib-import',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'import matplotlib.pyplot as plt',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Import matplotlib for visualization',
  },
  {
    label: 'seaborn-import',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'import seaborn as sns',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Import seaborn for statistical visualization',
  },
  {
    label: 'dataframe-create',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'df = pd.DataFrame(${1:data})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Create a pandas DataFrame',
  },
  {
    label: 'dataframe-head',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'df.head(${1:5})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Display first n rows of DataFrame',
  },
  {
    label: 'dataframe-info',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'df.info()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Display DataFrame information',
  },
  {
    label: 'dataframe-describe',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'df.describe()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Display statistical summary of DataFrame',
  },
  {
    label: 'groupby-agg',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'df.groupby("${1:column}").agg(${2:agg_func})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Group by column and aggregate',
  },
  {
    label: 'plot-basic',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'plt.figure(figsize=(${1:10}, ${2:6}))\nplt.plot(${3:x}, ${4:y})\nplt.xlabel("${5:X轴}")\nplt.ylabel("${6:Y轴}")\nplt.title("${7:标题}")\nplt.show()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Create a basic plot',
  },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultValue = '',
  language = 'python',
  onRun,
  onChange,
  onError,
  showRunButton = true,
  height = '400px'
}) => {
  const [code, setCode] = useState(defaultValue);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMarkers, setErrorMarkers] = useState<ErrorMarker[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEditorWillMount: BeforeMount = useCallback((monaco) => {
    if (language === 'python') {
      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions = PYTHON_SNIPPETS.map(snippet => ({
            ...snippet,
            range,
          }));

          return { suggestions };
        },
      });
    }
  }, [language]);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setEditorReady(true);

    editor.onDidChangeModelContent(() => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        const currentCode = editor.getValue();
        setCode(currentCode);
        if (onChange) {
          onChange(currentCode);
        }
      }, 150);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const currentCode = editor.getValue();
      handleRun(() => currentCode);
    });

    editor.updateOptions({
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false
      },
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'smart',
      tabCompletion: 'on',
      snippetSuggestions: 'top',
      wordBasedSuggestions: 'matchingDocuments',
      parameterHints: {
        enabled: true,
        cycle: true
      },
      hover: {
        enabled: true,
        delay: 300,
        sticky: true
      },
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      mouseWheelZoom: true,
      formatOnPaste: true,
      formatOnType: true,
    });
  }, [onChange]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleRun = useCallback((getCode: () => string) => {
    if (onRun && !isRunning) {
      setIsRunning(true);
      const currentCode = typeof getCode === 'function' ? getCode() : getCode;
      onRun(currentCode);
      setTimeout(() => setIsRunning(false), 5000);
    }
  }, [onRun, isRunning]);

  const handleFormatCode = useCallback(() => {
    if (editorRef.current && monacoRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  }, []);

  const handleLintCode = useCallback(() => {
    if (!monacoRef.current || !editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const markers: monaco.editor.IMarkerData[] = [];
    const code = model.getValue();
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      if (line.includes('print(') && !line.includes('f"') && !line.includes("f'")) {
        markers.push({
          severity: monacoRef.current!.MarkerSeverity.Hint,
          message: 'Consider using f-strings for better readability',
          startLineNumber: lineNum,
          startColumn: line.indexOf('print(') + 1,
          endLineNumber: lineNum,
          endColumn: line.indexOf('print(') + 6,
        });
      }

      if (line.includes('== None') || line.includes('!= None')) {
        markers.push({
          severity: monacoRef.current!.MarkerSeverity.Warning,
          message: 'Use "is None" or "is not None" for None comparison',
          startLineNumber: lineNum,
          startColumn: line.indexOf('None'),
          endLineNumber: lineNum,
          endColumn: line.indexOf('None') + 4,
        });
      }

      if (line.trim().endsWith('\\') && !line.trim().endsWith('\\\\')) {
        markers.push({
          severity: monacoRef.current!.MarkerSeverity.Info,
          message: 'Line continuation detected. Consider using parentheses instead',
          startLineNumber: lineNum,
          startColumn: line.length,
          endLineNumber: lineNum,
          endColumn: line.length + 1,
        });
      }

      if (line.includes('import *') || line.includes('from ')) {
        if (line.includes('import *')) {
          markers.push({
            severity: monacoRef.current!.MarkerSeverity.Warning,
            message: 'Avoid using "import *". Import specific functions for better code clarity.',
            startLineNumber: lineNum,
            startColumn: line.indexOf('import *') + 1,
            endLineNumber: lineNum,
            endColumn: line.indexOf('import *') + 9,
          });
        }
      }

      if (line.length > 120) {
        markers.push({
          severity: monacoRef.current!.MarkerSeverity.Info,
          message: 'Line exceeds 120 characters. Consider breaking it up.',
          startLineNumber: lineNum,
          startColumn: 1,
          endLineNumber: lineNum,
          endColumn: line.length,
        });
      }
    });

    monacoRef.current.editor.setModelMarkers(model, 'python-linter', markers);

    const errorMarkers: ErrorMarker[] = markers.map(marker => ({
      line: marker.startLineNumber,
      column: marker.startColumn,
      endLine: marker.endLineNumber,
      endColumn: marker.endColumn,
      message: marker.message,
      severity: marker.severity === monacoRef.current!.MarkerSeverity.Error ? 'error' :
               marker.severity === monacoRef.current!.MarkerSeverity.Warning ? 'warning' : 'info'
    }));

    setErrorMarkers(errorMarkers);
    if (onError) {
      onError(errorMarkers);
    }
  }, [onError]);

  const clearMarkers = useCallback(() => {
    if (monacoRef.current && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelMarkers(model, 'python-linter', []);
        setErrorMarkers([]);
        if (onError) {
          onError([]);
        }
      }
    }
  }, [onError]);

  const getErrorIcon = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return '🔴';
      case 'warning':
        return '🟡';
      case 'info':
        return '🔵';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-700">代码编辑器</h3>
          {errorMarkers.length > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-red-600 font-medium">
                {errorMarkers.filter(e => e.severity === 'error').length > 0 && 
                  `⚠️ ${errorMarkers.filter(e => e.severity === 'error').length} 错误`}
              </span>
              <span className="text-yellow-600 font-medium">
                {errorMarkers.filter(e => e.severity === 'warning').length > 0 && 
                  `${errorMarkers.filter(e => e.severity === 'warning').length} 警告`}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {editorReady && language === 'python' && (
            <>
              <button
                onClick={handleFormatCode}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                title="格式化代码 (Ctrl+Shift+F)"
              >
                格式化
              </button>
              <button
                onClick={handleLintCode}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                title="代码检查"
              >
                代码检查
              </button>
              <button
                onClick={clearMarkers}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                title="清除标记"
              >
                清除
              </button>
            </>
          )}
          {showRunButton && (
            <button
              onClick={() => handleRun(() => code)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRunning ? '运行中...' : '运行'}
            </button>
          )}
        </div>
      </div>
      
      {errorMarkers.length > 0 && (
        <div className="mb-2 p-3 bg-gray-50 border border-gray-300 rounded-md max-h-32 overflow-y-auto">
          <div className="text-sm font-medium text-gray-700 mb-2">代码问题：</div>
          {errorMarkers.map((error, index) => (
            <div key={index} className="flex items-start gap-2 text-sm mb-1">
              <span className="mt-0.5">{getErrorIcon(error.severity)}</span>
              <span className="text-gray-600">
                <span className="font-medium text-gray-800">行 {error.line}:</span> {error.message}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <Editor
          height={height}
          defaultLanguage={language}
          defaultValue={defaultValue}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex items-center justify-center h-full text-gray-500">
              加载编辑器中...
            </div>
          }
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
            lineNumbersMinChars: 5,
            renderLineHighlight: 'all',
            selectionHighlight: true,
            occurrencesHighlight: 'singleFile',
            codeLens: false,
            contextmenu: true,
            padding: { top: 10, bottom: 10 },
            cursorWidth: 2,
            cursorStyle: 'line',
            wordWrap: 'off',
            readOnly: false,
            domReadOnly: false,
            value: code,
          }}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        提示：使用 Tab 键补全代码 | Ctrl+Space 触发建议 | Ctrl+/ 注释代码 | Ctrl+D 复制行
      </div>
    </div>
  );
};

export default CodeEditor;