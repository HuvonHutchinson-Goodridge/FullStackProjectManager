import { ResponsivePie } from '@nivo/pie'
import { tokens } from "./../theme";
import { useTheme } from "@mui/material"

const data = [
    {
        "id": "Pending",
        "label": "Pending",
        "value": 19100,
        "color": "hsl(65, 70%, 50%)"
    },
    {
        "id": "Resolved",
        "label": "Resolved",
        "value": 546,
        "color": "hsl(20, 70%, 50%)"
    },
]

const Pie = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'red_blue' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        20
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={colors.grey[100]}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                
                {
                    match: {
                        id: 'Pending'
                    },
                    
                },
                {
                    match: {
                        id: 'Resolved'
                    },
                }
                
            ]}
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: colors.grey[100],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'square',
                    
                }
            ]}
        />)

}

export default Pie;