import { diagramChanged } from '../../actions/editor';
import Internal from './Editor'
import { useDispatch, useSelector } from 'react-redux'

const Editor = () => {
    const dispatch = useDispatch();
    const text = useSelector((state) => state.editor.diagramText);
    const zenMode = useSelector((state) => state.editor.zenMode);
    const height = useSelector((state) => state.editor.editorHeight);
    const language = useSelector((state) => state.editor.language);
    const onTextChanged = (text) => dispatch(diagramChanged(text))
    return <Internal {...{ text, language, onTextChanged, zenMode, height }} />
}

export default Editor;