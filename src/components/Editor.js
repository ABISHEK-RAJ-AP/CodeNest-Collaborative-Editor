import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import ACTIONS from '../actions/Actions';
import { cmtheme, language } from '../atoms/atoms';

// Themes
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abbott.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/juejin.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/moxer.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/theme/zenburn.css';

// Modes
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/django/django';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/go/go';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/r/r';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';

// Addons
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/search/search.js';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null); // Ref for CodeMirror editor instance
  const selectedLanguage = useRecoilValue(language); // Current selected language
  const selectedTheme = useRecoilValue(cmtheme); // Current selected theme

  const handleCodeChange = useCallback(
    (instance) => {
      const code = instance.getValue();
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
        console.log('Code emitted:', code); // Debug log
      }
      onCodeChange(code); // Notify parent component of code changes
    },
    [onCodeChange, roomId, socketRef]
  );

  useEffect(() => {
    const initializeEditor = () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: selectedLanguage || 'javascript',
          theme: selectedTheme || 'monokai',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          lineWrapping: true,
        }
      );

      editorRef.current.on('change', handleCodeChange);
    };

    initializeEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Cleanup editor instance
      }
    };
  }, [selectedLanguage, selectedTheme, handleCodeChange]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    if (currentSocket) {
      currentSocket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log('Received code:', code); // Debug log
        if (editorRef.current) {
          const currentCode = editorRef.current.getValue();
          if (currentCode !== code) {
            editorRef.current.setValue(code); // Update editor content
          }
        }
      });
    }

    return () => {
      currentSocket?.off(ACTIONS.CODE_CHANGE); // Cleanup listener
    };
  }, [socketRef]);

  return <textarea id="realtimeEditor" />;
};

export default Editor;
