"use client";

import { createContext, useContext } from "react";
import TypeWrapper from "./TypeWrapper";
import { containsListOrHeadingAsDescendant, containsClauses, processMentions } from "@/utils";

const ParagraphContext = createContext(false);
const ClauseContext = createContext([]);
const FirstBornContext = createContext(false);

function JsonParserProcessed({ data }) {
  const isDescendantOfParagraph = useContext(ParagraphContext);
  const clauses = useContext(ClauseContext);
  const isFirstBornSoFar = useContext(FirstBornContext);

  // If the data is an array, render each child separately
  if (Array.isArray(data)) {
    return <>{data.map((child, index) => <JsonParser key={index} data={child} />)}</>;
  }

  const { text, type, children, ...styling } = data;

  // Modify the type to avoid nesting paragraphs or other HTML violations
  let realType = type;
  if (type === 'p' && containsListOrHeadingAsDescendant(data)) {
    realType = 'span';
  } else if (isDescendantOfParagraph && type === 'p') {
    realType = 'span';
  }

  // Render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  let idx = 0;

  // Render child elements
  const renderChild = (child, index) => {
    const isFirstBorn = (isFirstBornSoFar || type === 'clause') && index === 0;

    if (containsClauses(child)) {
      idx++;
      
      return (
        <FirstBornContext.Provider key={index} value={isFirstBorn}>
          <ClauseContext.Provider value={clauses.concat(idx)}>
            <JsonParser data={child} />
          </ClauseContext.Provider>
        </FirstBornContext.Provider>
      );
    }

    return (
      <FirstBornContext.Provider key={index} value={isFirstBorn}>
        <JsonParser data={child} />
      </FirstBornContext.Provider>
    );
  };

  return (
    <ParagraphContext.Provider value={isDescendantOfParagraph || type === 'p'}>
      <TypeWrapper type={realType} {...styling}>
        {text && isFirstBornSoFar && clauses.length > 0 ? clauses.join('.') : ''}{' '}
        {type === 'mention' ? data.value : (
          <>
            {text && renderTextWithLineBreaks(text)}
            {children && children.map((child, index) => renderChild(child, index))}
          </>
        )}
      </TypeWrapper>
    </ParagraphContext.Provider>
  );
}

export default function JsonParser({ data }) {
  const processedData = processMentions(data);
  return <JsonParserProcessed data={processedData} />;
}