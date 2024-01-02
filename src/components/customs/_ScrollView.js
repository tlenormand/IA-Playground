import React, { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';


export default function _ScrollView({ visible, children }) {
  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(window.innerHeight);

//======================================================================================================================
// USE EFFECT
//======================================================================================================================

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setMaxHeight(window.innerHeight - getDistanceFromTop());

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

//======================================================================================================================
// EVENTS
//======================================================================================================================

  const handleResize = () => {
    setMaxHeight(window.innerHeight - getDistanceFromTop());
  };

//======================================================================================================================
// METHODS
//======================================================================================================================

  const getDistanceFromTop = () => {
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top;
    return containerTop;
  }

//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <ScrollView ref={containerRef} style={{ maxHeight: maxHeight, overflow: 'hidden' }}>
      {children}
    </ScrollView>
  );
}
