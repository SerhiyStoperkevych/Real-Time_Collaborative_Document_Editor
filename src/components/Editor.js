import React, { useCallback, useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const Editor = ({ initialValue, onSave }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable />
      </Slate>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Editor;
