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
      data: '',
      title: '',
      picUrl: '',
      category: '--'
      // data: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
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
        <input
          type="text"
          className="title-input"
          placeholder="请输入文章标题"
          onChange={this.titleChange.bind(this)}
          ref="titleInput"
        />
        <div className="container">
          <div className="input-container">
            <textarea
              ref="markedInput"
              className="input-textarea"
              placeholder="仅支持Markdown语法"
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
        <div className="catagory-container">
          <input
            type="text"
            className="pic-url"
            placeholder="请输入文章首页配图"
            onChange={this.picChange.bind(this)}
            ref="picInput"
          />
          <select onChange={this.kindChange.bind(this)}>
            <option value="-">选择种类</option>
            <option value ="0">狗</option>
            <option value ="1">猫</option>
          </select>
          <select onChange={this.topicChange.bind(this)}>
            <option value="-">选择专题</option>
            <option value ="0">饮食健康</option>
            <option value ="1">医疗知识</option>
            <option value="2">保养护理</option>
            <option value="3">新手知识</option>
            <option value="4">生活用品</option>
            <option value="5">行为训导</option>
          </select>

        </div>
        <div className="send-container">
          <button className="send-button"
            onClick={this.sendValue.bind(this)}>发送</button>
        </div>
      </div>
    )
  }

  changeInput() {
    this.setState({
      data: this.refs['markedInput'].value
    });
  }
  titleChange() {
    this.setState({
      title: this.refs['titleInput'].value
    });
  }
  picChange() {
    this.setState({
      picUrl: this.refs['picInput'].value
    });
  }
  kindChange(e) {
    let val = e.target.value
    if(val == '-') {
      alert('请选择类别！')
    } else {
      this.setState({
        category: `${val}${this.state.category[1]}`
      })
    }
    console.log(e.target.value);
  }
  topicChange(e) {let val = e.target.value
  if(val == '-') {
    alert('请选择话题！')
  } else {
    this.setState({
      category: `${this.state.category[0]}${val}`
    })
  }
  }
  sendValue() {
    if(this.state.data.length == 0 || this.state.title.length == 0 || this.state.picUrl.length == 0 || this.state.catagory == -'') {
      alert('请完善所有内容！')
      return
    }
    fetch('https://www.andyzou.cn/post', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json;",
          // "accesstoken": 'adaasdasddasdasd12321'
      },
      body: JSON.stringify({
        "authorId": 123456,
        "category": this.state.category,
        "id": 0,
        "picture": this.state.picUrl,
        "postContent": this.state.data,
        "postTitle": this.state.title
      })
    })
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((data => {
      console.log(data)
    }))
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
