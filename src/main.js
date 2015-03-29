import React from 'react';
import Placeholder from './components/placeholder';

React.render(
    React.createElement( Placeholder, {history: true} ),
    document.getElementById('app')
);
