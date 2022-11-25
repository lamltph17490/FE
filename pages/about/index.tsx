import React from "react";
import { ClientLayout } from "../../layouts";
import Image from 'next/image'
type Props = {};

const About = (props: Props) => {
  return (
    <>
      {/* AdminBreadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container mx-auto sm:px-4">
          <div className="flex flex-wrap ">
            <div className="lg:w-full pr-4 pl-4">
              <div className="breadcrumb__text">
                <h4>Giới Thiệu</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">Trang chủ</a>
                  <span>Giới Thiệu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* AdminBreadcrumb Section End */}
      {/* About Section Begin */}
      <section className="about spad">
        <div className="container mx-auto sm:px-4">
          <div className="flex flex-wrap ">
            <div className="lg:w-full pr-4 pl-4">
              <div className="about__pic">
                <picture>
                <img src="img/about/about-us.jpg" alt="" />
                </picture>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="lg:w-1/3  md:w-1/3  sm:w-1/2 pr-4 pl-4">
              <div className="about__item">
                <h4>Chúng tôi là ai?</h4>
                <p>
                  Chúng tôi là cửa hàng WhiteCat- cửa hàng chuyên kinh doanh
                  quần áo dành cho giới trẻ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team spad">
        <div className="container mx-auto sm:px-4">
          <div className="flex flex-wrap ">
            <div className="lg:w-full pr-4 pl-4">
              <div className="section-title">
                <span>Our Team</span>
                <h2>Meet Our Team</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="lg:w-1/4  md:w-1/2  sm:w-1/2 pr-4 pl-4">
              <div className="team__item">
                <picture>
                <img src="img/about/team-1.jpg" alt="" />
                </picture>
                <h4>John Smith</h4>
                <span>Fashion Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section End */}
      {/* Client Section Begin */}
      <section className="clients spad">
        <div className="container mx-auto sm:px-4">
          <div className="flex flex-wrap ">
            <div className="lg:w-full pr-4 pl-4">
              <div className="section-title">
                <h2>Thương hiệu</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="lg:w-1/4 md:w-1/3  sm:w-1/3 pr-4 pl-4 w-1/2">
              <a href="#" className="client__item">
                <picture>
                <img src="img/clients/client-1.png" alt="" />
                </picture>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
