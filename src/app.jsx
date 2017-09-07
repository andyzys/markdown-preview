import React from 'react';
import MarkDownPreview from './components/markDownPreview';

require('./reset.less')

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <MarkDownPreview />
      </div>
    )
  }
}
