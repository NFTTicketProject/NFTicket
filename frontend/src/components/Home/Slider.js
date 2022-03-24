import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HomeSlider = ()=>{

    const settings = {
      dots: true,  // false이면 아래 점 안보임
      infinite: true,  // 반복 여부
      speed: 500,  // 콘텐츠가 넘어갈 때 속도, 1000ms = 1s
      slidesToShow: 1,  // 한 화면에 보이는 콘텐츠 개수
      slidesToScroll: 1,  // 한 번에 넘어가는 콘텐츠 수

      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: false,
      centerPadding: '0px',
      fade: true,
      arrows: true,
    };
    
    return (
      <Slider {...settings}>
        <div>
            <img src="images/carousel1.png" alt="" style={{ width: "100vw" }}></img>
        </div>
        <div>
            <img src="images/carousel2.png" alt="" style={{ width: "100vw" }}></img>
        </div>
        <div>
            <img src="images/carousel1.png" alt="" style={{ width: "100vw" }}></img>
        </div>
        <div>
            <img src="images/carousel2.png" alt="" style={{ width: "100vw" }}></img>
        </div>
        <div>
            <img src="images/carousel1.png" alt="" style={{ width: "100vw" }}></img>
        </div>
        <div>
            <img src="images/carousel2.png" alt="" style={{ width: "100vw" }}></img>
        </div>
      </Slider>  

    );
}


export default HomeSlider
