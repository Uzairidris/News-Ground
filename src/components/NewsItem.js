import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;
    return (
      <div className='card'>
        <img
          src={
            imageUrl
              ? imageUrl
              : 'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2024-09/240930-University-North-Texas-Health-Science-Fort-Worth-04-zk-0303-73a581.jpg'
          }
          className='card-img-top'
          alt=''
          style={{ width: '100%', height: '275px', objectFit: 'cover' }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{title}...</h5>
          <span
            className='position-absolute top-0  translate-middle badge rounded-pill bg-info'
            style={{ left: '50%', zIndex: 2 }}
          >
            {source}
          </span>
          <p className='card-text' style={{ minHeight: '48px' }}>
            {description}...
          </p>
          <p className='card-text'>
            <small className='text-body-secondary'>
              By {author} on {publishedAt}
            </small>
          </p>
          <a
            rel='noreferrer'
            href={newsUrl}
            target='_blank'
            className='btn btn-sm btn-outline-info'
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
