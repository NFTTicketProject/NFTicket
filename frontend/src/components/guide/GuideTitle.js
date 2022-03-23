import React from "react";
import { useSelector } from "react-redux";
import "./GuideTitle.css";

const GuideTitle = () => {
  const pageNum = useSelector((state) => state.guide.page);

  return (
    <div>
      <div className='guideTitle'>
        {pageNum === 1 ? <div>시작하기</div> : null}
        {pageNum === 2 ? <div>NFTickets</div> : null}
        {pageNum === 3 ? <div>서비스 제공환경 / 회원가입</div> : null}
        {pageNum === 4 ? <div>티켓 구매하기</div> : null}
        {pageNum === 5 ? <div>티켓 판매하기</div> : null}
        {pageNum === 6 ? <div>마켓 페이지</div> : null}
        {pageNum === 7 ? <div>개인정보 / 프로필</div> : null}
        {pageNum === 8 ? <div>나만의 티켓</div> : null}
        {pageNum === 9 ? <div>티켓 전시관</div> : null}
        {pageNum === 10 ? <div>커뮤니티</div> : null}
        {pageNum === 11 ? <div>용어 정리</div> : null}
      </div>
    </div>
  );
};

export default GuideTitle;
