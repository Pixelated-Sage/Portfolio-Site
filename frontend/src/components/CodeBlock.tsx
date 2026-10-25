import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'sql',
  filename,
  caption,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[#E2E6EE] my-4 shadow-xs">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#171B26] text-white text-xs font-mono border-b border-[#2A3245]">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-[#315EFB]" />
            <span>{filename || language.toUpperCase()}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className="bg-[#111827] text-[#E2E6EE] p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
      {caption && (
        <div className="px-4 py-2 bg-[#EEF2F8] text-[#606978] text-xs border-t border-[#E2E6EE] flex items-center justify-between">
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
};
