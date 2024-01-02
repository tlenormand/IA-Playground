import { useEffect, useRef } from 'react';

//==============================================================================
// useEffectDidMount
//==============================================================================
// @param func - function to run after component has mounted
// @param deps - dependencies for the function
//==============================================================================
// This hook is used to run a function only after the component has mounted.
// This is useful for running functions that depend on the DOM being ready.
// Same usage as useEffect, but the function will not run on the first render.
//==============================================================================

const useEffectDidMount = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useEffectDidMount;
