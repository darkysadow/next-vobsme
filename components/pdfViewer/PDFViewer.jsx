"use client"

import { Viewer, Worker } from "@react-pdf-viewer/core"
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

export default function PDFViewer(props) {
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    return (
        props.url ?
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                <div
                    className=" h-[80vh] border border-[rgba(0,0,0,0.3)] flex flex-col"

                >
                    <div
                        style={{
                            alignItems: 'center',
                            backgroundColor: '#eeeeee',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            padding: '4px',
                        }}
                    >
                        <Toolbar>
                            {(props) => {
                                const {
                                    CurrentPageInput,
                                    Download,
                                    EnterFullScreen,
                                    GoToNextPage,
                                    GoToPreviousPage,
                                    NumberOfPages,
                                    Print,
                                    ShowSearchPopover,
                                    Zoom,
                                    ZoomIn,
                                    ZoomOut,
                                } = props;
                                return (
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="w-[30%] flex flex-row justify-start">
                                            <div style={{ padding: '0px 2px' }}>
                                                <ShowSearchPopover />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <ZoomOut />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Zoom />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <ZoomIn />
                                            </div>
                                        </div>
                                        <div className="w-[30%] flex flex-row justify-center">
                                            <div style={{ padding: '0px 2px'}}>
                                                <GoToPreviousPage />
                                            </div>
                                            <div className="pt-0 pr-[2px] flex flex-row items-center">
                                                <CurrentPageInput /> / <NumberOfPages />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <GoToNextPage />
                                            </div>
                                        </div>
                                        <div className="w-[30%] flex flex-row justify-end">
                                            <div style={{ padding: '0px 2px'}}>
                                                <EnterFullScreen />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Download />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Print />
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        </Toolbar>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        <Viewer fileUrl={`${process.env.STRAPI_URL}${props.url}`} plugins={[toolbarPluginInstance]} />
                    </div>
                </div>
                
            </Worker>
            : <div className="container mx-auto text-center text-2xl text-headerFirst font-probapro">
                Завантаження...
            </div>
    )
}