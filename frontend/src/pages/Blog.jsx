import React from 'react';
import blog from '../assets/images/bg-02.jpg'
import blog4 from '../assets/images/blog-04.jpg'
import blog5 from '../assets/images/blog-05.jpg'
import blog6 from '../assets/images/blog-06.jpg'
import blog7 from '../assets/images/product-min-01.jpg'
import blog8 from '../assets/images/product-min-02.jpg'
import blog9 from '../assets/images/product-min-03.jpg'

const Blog = () => {
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: `url(${blog})` }}
      >
        <h2 className="ltext-105 cl0 txt-center">Blog</h2>
      </section>

      {/* Content page */}
      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {/* Blog items */}
                {[
                  {
                    image: blog4,
                    date: '22 Jan 2018',
                    title: '8 Inspiring Ways to Wear Dresses in the Winter',
                    description: 'Class aptent taciti sociosqu ad litora torquent...',
                    comments: '8 Comments',
                  },
                  {
                    image: blog5,
                    date: '18 Jan 2018',
                    title: 'The Great Big List of Men’s Gifts for the Holidays',
                    description: 'Class aptent taciti sociosqu ad litora torquent...',
                    comments: '8 Comments',
                  },
                  {
                    image: blog6,
                    date: '16 Jan 2018',
                    title: '5 Winter-to-Spring Fashion Trends to Try Now',
                    description: 'Class aptent taciti sociosqu ad litora torquent...',
                    comments: '8 Comments',
                  },
                ].map((blog, index) => (
                  <div className="p-b-63" key={index}>
                    <a href="blog-detail.html" className="hov-img0 how-pos5-parent">
                      <img src={blog.image} alt="IMG-BLOG" />
                      <div className="flex-col-c-m size-123 bg9 how-pos5">
                        <span className="ltext-107 cl2 txt-center">{blog.date.split(' ')[0]}</span>
                        <span className="stext-109 cl3 txt-center">{blog.date}</span>
                      </div>
                    </a>
                    <div className="p-t-32">
                      <h4 className="p-b-15">
                        <a href="blog-detail.html" className="ltext-108 cl2 hov-cl1 trans-04">
                          {blog.title}
                        </a>
                      </h4>
                      <p className="stext-117 cl6">{blog.description}</p>
                      <div className="flex-w flex-sb-m p-t-18">
                        <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                          <span>
                            <span className="cl4">By</span> Admin
                            <span className="cl12 m-l-4 m-r-6">|</span>
                          </span>
                          <span>
                            StreetStyle, Fashion, Couple
                            <span className="cl12 m-l-4 m-r-6">|</span>
                          </span>
                          <span>{blog.comments}</span>
                        </span>
                        <a href="blog-detail.html" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                          Continue Reading
                          <i className="fa fa-long-arrow-right m-l-9"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
                  <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1">
                    1
                  </a>
                  <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
                    2
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <div className="bor17 of-hidden pos-relative">
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                  />
                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </div>

                {/* Categories */}
                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>
                  <ul>
                    {['Fashion', 'Beauty', 'Street Style', 'Life Style', 'DIY & Crafts'].map((category, index) => (
                      <li className="bor18" key={index}>
                        <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Products */}
                <div className="p-t-65">
                  <h4 className="mtext-112 cl2 p-b-33">Featured Products</h4>
                  <ul>
                    {[
                      { img: blog7, name: 'White Shirt With Pleat Detail Back', price: '$19.00' },
                      { img: blog8, name: 'Converse All Star Hi Black Canvas', price: '$39.00' },
                      { img: blog9, name: 'Nixon Porter Leather Watch In Tan', price: '$17.00' },
                    ].map((product, index) => (
                      <li className="flex-w flex-t p-b-30" key={index}>
                        <a href="#" className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                          <img src={product.img} alt="PRODUCT" />
                        </a>
                        <div className="size-215 flex-col-t p-t-8">
                          <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                            {product.name}
                          </a>
                          <span className="stext-116 cl6 p-t-20">{product.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Archive */}
                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-20">Archive</h4>
                  <ul>
                    {['July 2018', 'June 2018', 'May 2018', 'April 2018', 'March 2018', 'February 2018'].map(
                      (month, index) => (
                        <li className="p-b-7" key={index}>
                          <a href="#" className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                            <span>{month}</span>
                            <span>(9)</span>
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Tags */}
                <div className="p-t-50">
                  <h4 className="mtext-112 cl2 p-b-27">Tags</h4>
                  <div className="flex-w m-r--5">
                    {['Fashion', 'Beauty', 'StreetStyle', 'LifeStyle', 'DIY'].map((tag, index) => (
                      <a
                        href="#"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                        key={index}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
