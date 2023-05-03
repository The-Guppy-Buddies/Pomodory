import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

function SplineStuff({ revealContentFunc, user }) {
    const [spline, setSpline] = useState("");

    useEffect(() => {
        if (user["Guppy No."] == 1) {
            setSpline("https://prod.spline.design/RM1G00svMv2hMQhd/scene.splinecode")  
        } else if (user["Guppy No."] == 2) {
            setSpline("https://prod.spline.design/Ndnz-ONf7Xg4akyR/scene.splinecode")
        } else if (user["Guppy No."] == 3) {
            setSpline("https://prod.spline.design/OITdizBX7Q-13SrB/scene.splinecode")
        } else if (user["Guppy No."] == 4) {
            setSpline("https://prod.spline.design/r2WdswL0H3xi5dHm/scene.splinecode")
        } else if (user["Guppy No."] == 5) {
            setSpline("https://prod.spline.design/B138hZKmrVR44fxq/scene.splinecode")
        } else {
            console.log("Guppy ID not available")
        }
    }, [user])

    function onLoad(spline) {
        revealContentFunc();
    }

    return (<Spline scene={spline} onLoad={onLoad} />);
}

export default SplineStuff;