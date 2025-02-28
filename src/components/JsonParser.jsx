"use client";

import { createContext, useContext } from "react";
import TypeWrapper from "./TypeWrapper";
import { containsListOrHeadingAsDescendant } from "@/utils";

const ParagraphContext = createContext(false);

export default function JsonParser({ data }) {
  const isDescendantOfParagraph = useContext(ParagraphContext);

  // If the data is an array, render each child separately
  if (Array.isArray(data)) {
    return <>{data.map((child, index) => <JsonParser key={index} data={child} />)}</>;
  }

  const { text, type, children, ...styling} = data;

  // Modify the type to avoid nesting paragraphs or other HTML violations
  let realType = type;
  
  if (type === 'p' && containsListOrHeadingAsDescendant(data)) {
    realType = 'span';
  } else if (isDescendantOfParagraph && type === 'p') {
    realType = 'span';
  }

  const renderTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <ParagraphContext.Provider value={isDescendantOfParagraph || type === 'p'}>
      <TypeWrapper type={realType} {...styling}>
        {text && renderTextWithLineBreaks(text)}
        {children && children.map((child, index) => <JsonParser key={index} data={child} />)}
      </TypeWrapper>
    </ParagraphContext.Provider>
  );
}