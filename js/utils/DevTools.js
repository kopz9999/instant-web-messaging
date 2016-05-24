import React from 'react';

// Exported from redux-devtools
let { createDevTools } = require('redux-devtools');

// Monitors are separate packages, and you can make a custom one
let LogMonitor = require('redux-devtools-log-monitor').default;
let DockMonitor = require('redux-devtools-dock-monitor').default;

const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={true}
               defaultPosition='left'>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools;
