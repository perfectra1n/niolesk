import React, { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import './Render.css'

const Render = ({ diagramUrl, diagramImage, diagramEditUrl, diagramError, onDiagramError, height, width, onEditSizeChanged, shouldRedraw }) => {
    const editRef = useRef(null)

    useEffect(() => {
        if (!editRef?.current) {
            return
        }
        const resizeObserver = new ResizeObserver(() => {
            if (onEditSizeChanged && editRef?.current) {
                onEditSizeChanged(editRef.current.clientWidth, editRef.current.clientHeight)
            }
        })
        resizeObserver.observe(editRef.current)
        return () => resizeObserver.disconnect()
    }, [onEditSizeChanged])

    const url = diagramImage ? URL.createObjectURL(new Blob([diagramImage], { type: "image/svg+xml" })) : diagramUrl

    return <div className='Render'>
        <div className='RenderDiagramZone' style={{ width: `${width}px` }}>
            {
                diagramError ?
                    <iframe className='RenderImageError' width={width} height={height} title='Error' src={diagramUrl}></iframe> :
                    <TransformWrapper width={width} height='100%' maxScale={100}>
                        {(utils) => {
                            if (shouldRedraw) {
                                utils.resetTransform()
                            }
                            return <TransformComponent>
                                <div style={{ width: width, height: height }}>
                                    {
                                        <img alt='Diagram' className='RenderImage' src={url} onError={(e) => { onDiagramError(diagramUrl) }} style={{ maxWidth: width, maxHeight: height, }} />
                                    }

                                </div>
                            </TransformComponent>
                        }}
                    </TransformWrapper>
            }
        </div>
        <p className='RenderEditMessage' ref={editRef}><a href={diagramEditUrl}>Edit this diagram.</a></p>
    </div>
}

export default Render;