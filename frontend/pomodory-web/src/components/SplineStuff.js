import { useRef } from 'react';
import Spline from '@splinetool/react-spline';

function SplineStuff() {
    const fish = useRef();

    function onLoad(spline) {
        const obj = spline.findObjectByName('nhi');

        fish.current = obj;
    }

    return (
        <>
            <Spline scene="https://prod.spline.design/RM1G00svMv2hMQhd/scene.splinecode"
                    onLoad={onLoad} />
        </>
        
    );
}

export default SplineStuff;