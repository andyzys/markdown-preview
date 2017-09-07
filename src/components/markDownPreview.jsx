import React from 'react';
require('./markdownPreview.less');

var marked = require('marked');

require('../../vendor/github.markdown.min.css');
require('../../vendor/highlight.min.css');
var highlight = require('../../vendor/highlight.min.js');

export default class MarkDownPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
    }
    // init marked
    highlight.initHighlightingOnLoad();
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true, // enable fithub favor markdown
      tables: true, // enable table support
      breaks: false,// Enable GFM line breaks
      pedantic: false,
      sanitize: false,// Ignore any HTML that has been input.
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });
  }
  render() {
    return (
      <div className="marked-container">
        <h1>This is markdown editor!</h1>
        <div className="container">
          <div className="input-container">
            <textarea
              ref="markedInput"
              className="input-textarea"
              onChange={this.changeInput.bind(this)}
              onScroll={this.handleScroll.bind(this)}
              value={this.state.data}>
            </textarea>
          </div>
          {/* markdown-body 外部css的包裹 */}
          <div
            ref="markedRender"
            className="render-container markdown-body"
            dangerouslySetInnerHTML={{__html: marked(this.state.data)}}>
          </div>
        </div>
      </div>
    )
  }
  // 输入触发
  changeInput() {
    this.setState({
      data: this.refs['markedInput'].value
    });
  }
  // 输入框滚动触发联动
  handleScroll() {
    let inputEle     = this.refs['markedInput'],
        scrollTop    = inputEle.scrollTop,
        scrollHeight = inputEle.scrollHeight,//总高度
        clientHeight = inputEle.clientHeight,// 输入框高度
        rawPer       = scrollTop / (scrollHeight - clientHeight);// 计算输入框滚动的比例
    let renderEle = this.refs['markedRender'];
    let renderScroll = rawPer * (renderEle.scrollHeight - renderEle.clientHeight)
    renderEle.scrollTop = renderScroll;
  }
}
