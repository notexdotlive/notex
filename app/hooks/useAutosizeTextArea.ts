import { useEffect } from 'react';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (!textAreaRef) return;

    /**
     * Set the height of the element to 0
     * to get the scrollHeight of the element
     */

    textAreaRef.style.height = '0px';
    const scrollHeight = textAreaRef.scrollHeight;

    /**
     * Set the height of the element to the scrollHeight
     * to make the element autosize
     */

    textAreaRef.style.height = scrollHeight + 'px';
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
