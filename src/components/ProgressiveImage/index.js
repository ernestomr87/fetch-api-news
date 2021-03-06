import React, { Component } from 'react';



export default class ProgressiveImage extends Component {
	state = {
		currentImage: this.props.preview,
		loading: true
	};

	componentDidMount() {
		this.fetchImage(this.props.image);
	}

	fetchImage = (src) => {
		const image = new Image();
		image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false });
		image.src = src;
		this.loadingImage = image;
	};

	style = (loading) => {
		return {
			transition: '0.5s filter linear',
			filter: `${loading ? 'blur(50px)' : ''}`
		};
	};

	render() {
		const { currentImage, loading } = this.state;
		const { alt } = this.props;
		return <img style={this.style(loading)} src={currentImage} alt={alt} />;
	}
}
