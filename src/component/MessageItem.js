import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

 class MessageItem extends Component {
    
    state ={
        imgUrl: '',
        author: '',
        isLoaded: false
    }

    static propTypes = {
        message: PropTypes.object.isRequired
    }

    componentDidMount(){
        const {featured_media, author} = this.props.message;
        const getImgUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
        const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);
        Promise.all([getImgUrl,getAuthor]).then(res => {
                this.setState({
                    imgUrl:  res[0].data.media_details.sizes.full.source_url,
                    author: res[1].data.name,
                    isLoaded: true
                });
            }
        )
    }
    render() {
        const {title,excerpt} = this.props.message;
        const {author, imgUrl, isLoaded} = this.state;
        if(isLoaded){
            return (
           
                <div>
                    <h2>{title.rendered}</h2>
                    <small>Reviewed by <strong>{ author}</strong></small>
                    <img  style={{width : '100%'}} src={ imgUrl} alt={title.rendered}/>
                    <div dangerouslySetInnerHTML={{ __html: excerpt.rendered}}/>
                </div>
            )
        }
        return null
    }
}

export default MessageItem
