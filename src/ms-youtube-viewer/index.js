import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.css';

let YoutubeViewer;

YoutubeViewer =class extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            youtubeUrl: '',
            showPreview: false
        };

    };

    _changeContent(e) {
        this.setState({youtubeUrl: e.target.value});
        this._validateYouTubeUrl(e.target.value);
    } 

    _validateYouTubeUrl(url) {    
        if (url != undefined || url != '') {        
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                var embededUrl = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1';
                this.setState({youtubeUrl: embededUrl});
                this.setState({showPreview: true});
            } else {
                this.setState({youtubeUrl: ''});
                this.setState({showPreview: false});
            }
        }
    }

    render() {
        var partial;
        if(this.state.showPreview) {
            partial = <div><iframe id="videoObject" src={this.state.youtubeUrl} width="500" height="265" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>;
        }
        return (
            <div>
                <div>
                    <input type="text" id="youtubeUrl" styleName="ms-youtube-url-se" onChange={this._changeContent.bind(this)} placeholder="Enter your YouTube URL here"/>
                </div>
                {partial}
            </div>
        );

    }
}

export default CSSModules(YoutubeViewer, styles);
