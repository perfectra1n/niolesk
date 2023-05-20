import { useDispatch, useSelector } from 'react-redux'
import { createKrokiUrl } from '../../kroki/utils';
import Internal from './ExampleCards'
import {viewExample,importExample } from '../../actions/example'
import { decode } from '../../kroki/coder';

const ExampleCards = () => {
    const dispatch = useDispatch();
    const examples = useSelector((state) => state.example.filteredExamples)
    const renderUrl = useSelector((state) => state.editor.renderUrl)
    
    // console.log({examples})
    const cards = examples.map((example)=>({
        diagType: example.title,
        description: example.description,
        diagUrl: example.url || createKrokiUrl(renderUrl, example.diagramType, 'svg', example.example),
        onView: () => dispatch(viewExample(example.id)),
        onImport: () => dispatch(importExample(decode(example.example), example.diagramType)),
    }))

    return <Internal {...{ cards }} />
}

export default ExampleCards;