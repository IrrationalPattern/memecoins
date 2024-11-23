export interface DexToolsGraphProps {
    className?: string;
    address: string;
}

export const DexToolsGraph = ({ className, address }: DexToolsGraphProps) => {
    return (
        <div className={className} >
            <iframe
                id="dextools-widget"
                title="DEXTools Trading Chart"
                width="100%" height="400"
                src={`https://www.dextools.io/widget-chart/en/base/pe-light/${address}?theme=light&chartType=2&chartResolution=30&drawingToolbars=false`}></iframe>
        </div>
    );
}