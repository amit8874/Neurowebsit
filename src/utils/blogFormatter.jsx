import React from 'react';

/**
 * Parses inline formatting like **bold** and *italic* into React elements.
 */
export function renderFormattedText(text) {
  if (typeof text !== 'string') return text;
  if (!text) return '';

  const tokens = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={`b-${key++}`} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      tokens.push(
        <em key={`i-${key++}`} style={{ fontStyle: 'italic' }}>
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

/**
 * Converts raw content (Markdown / plain text string) or existing blocks array into structured blog blocks.
 * Supported blocks: 'heading', 'paragraph', 'list', 'highlight'
 */
export function parseBlogContent(content, fallbackSummary = '') {
  // If already an array of typed block objects, validate and return
  if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object' && content[0]?.type) {
    return content;
  }

  const rawText = (typeof content === 'string' && content.trim())
    ? content
    : (typeof fallbackSummary === 'string' ? fallbackSummary : '');

  if (!rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/);
  const blocks = [];
  let currentParagraph = [];
  let currentList = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: currentParagraph.join(' ').trim()
      });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({
        type: 'list',
        items: [...currentList]
      });
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Blank line indicates separation between paragraphs/blocks
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Heading: starts with 1-4 '#' e.g. '# Title', '## Section', '### Sub-section'
    const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        text: headingMatch[1].trim()
      });
      continue;
    }

    // Highlight / Callout Box: starts with '>'
    const highlightMatch = line.match(/^>\s*(.+)$/);
    if (highlightMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'highlight',
        text: highlightMatch[1].trim()
      });
      continue;
    }

    // List item: starts with '-', '*', '•', or '1.', '2.', etc.
    const listMatch = line.match(/^([-*•]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      currentList.push(listMatch[2].trim());
      continue;
    }

    // Otherwise, accumulate line as part of a paragraph
    flushList();
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

/**
 * Converts structured blocks array back into readable markdown text for the Admin form editor.
 */
export function contentBlocksToMarkdown(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';

  return content.map(block => {
    if (!block) return '';
    if (block.type === 'heading') {
      return `### ${block.text || ''}`;
    }
    if (block.type === 'highlight') {
      return `> ${block.text || ''}`;
    }
    if (block.type === 'list' && Array.isArray(block.items)) {
      return block.items.map(item => `- ${item}`).join('\n');
    }
    if (block.type === 'paragraph') {
      return block.text || '';
    }
    return '';
  }).filter(Boolean).join('\n\n');
}

/**
 * Returns a clean summary for blog cards (removing markdown symbols and headings).
 */
export function getCleanSummary(blog, parsedBlocks = null) {
  if (blog.summary && !blog.summary.trim().startsWith('#') && blog.summary.length <= 300) {
    return blog.summary.replace(/\*\*/g, '').replace(/[*_~`]/g, '');
  }

  const blocks = parsedBlocks || parseBlogContent(blog.content, blog.summary);
  const firstPara = blocks.find(b => b.type === 'paragraph');
  if (firstPara && firstPara.text) {
    const clean = firstPara.text.replace(/\*\*/g, '').replace(/[*_~`]/g, '');
    return clean.length > 180 ? clean.slice(0, 180) + '...' : clean;
  }

  return (blog.summary || '')
    .replace(/^#+[^\n]+\n*/, '')
    .replace(/\*\*/g, '')
    .slice(0, 180);
}
