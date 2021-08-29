import { FC } from 'react';
import Editor from 'react-simple-code-editor';
import { observer } from 'mobx-react-lite';
import { highlight as prismHighlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

import store from '../../store/store';
import classes from './HtmlCodeEditor.module.css';

const highlight = (code: string) => prismHighlight(code, languages.jsx, 'jsx');

const HtmlCodeEditor: FC = observer(() => {
  const { code, update } = store;

  return (
    <Editor
      value={code}
      onValueChange={update}
      highlight={highlight}
      className={classes.component}
      padding={10}
    />
  );
});

export default HtmlCodeEditor;
