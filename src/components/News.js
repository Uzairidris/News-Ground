import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    heading: 'General',
    category: 'general',
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  formatedDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-Us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  async componentDidMount() {
    this.newsGetter();
  }

  async newsGetter() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2da52fff93a34298bccddfd61441af43&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  prevPage = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.newsGetter();
  };

  nextPage = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.newsGetter();
  };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='h2 mb-4'>
          News Ground - Top {this.props.heading} Headlines
        </h2>
        <div className='my-3 row row-gap-3'>
          {!this.state.loading &&
            this.state.articles.map((e) => {
              return (
                <div className='col-lg-4 col-md-6 col-12' key={e.url}>
                  <NewsItem
                    title={e.title ? e.title.slice(0, 50) : 'Not Found'}
                    description={
                      e.description ? e.description.slice(0, 80) : 'Not Found'
                    }
                    imageUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author ? e.author : 'Unknown'}
                    publishedAt={this.formatedDate(e.publishedAt)}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          {this.state.loading && <Spinner />}
        </div>
        <div className='d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.prevPage}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type='button'
            className='btn btn-dark'
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
