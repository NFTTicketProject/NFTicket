import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/GuidePageReducer";
import ListIcon from "@mui/icons-material/List";
import "./GuideHeader.css";

const GuideHeader = () => {
  const pageNum = useSelector((state) => state.guide.page);
  const dispatch = useDispatch();

  // div를 누르면 GuidePageReducer의 page 가 변경됩니다.
  // div에 마우스를 올리면 포인터로 바뀌도록 하기위해 className을 설정했고 css 적용했습니다.
  // 클릭 시 bold 되게끔 바꾸고싶어서 { 삼항연산자 } 이런식으로 사용했는데 매우 지저분합니다..
  return (
    <div className='guideHeader'>
      <div className='guideSelectBlock'>
        <ListIcon></ListIcon>
        <div className='guideSelect'>가이드 선택</div>
      </div>

      <div className='selectButtons'>
        {pageNum === 1 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(1));
            }}
          >
            시작하기
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(1));
            }}
          >
            시작하기
          </div>
        )}

        {pageNum === 2 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(2));
            }}
          >
            NFTickets
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(2));
            }}
          >
            NFTickets
          </div>
        )}

        {pageNum === 3 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(3));
            }}
          >
            서비스 제공 환경 / 회원가입
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(3));
            }}
          >
            서비스 제공 환경 / 회원가입
          </div>
        )}

        {pageNum === 4 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(4));
            }}
          >
            티켓 구매하기
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(4));
            }}
          >
            티켓 구매하기
          </div>
        )}

        {pageNum === 5 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(5));
            }}
          >
            티켓 판매하기
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(5));
            }}
          >
            티켓 판매하기
          </div>
        )}

        {pageNum === 6 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(6));
            }}
          >
            마켓 페이지
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(6));
            }}
          >
            마켓 페이지
          </div>
        )}

        {pageNum === 7 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(7));
            }}
          >
            개인정보 / 프로필
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(7));
            }}
          >
            개인정보 / 프로필
          </div>
        )}

        {pageNum === 8 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(8));
            }}
          >
            나만의 티켓
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(8));
            }}
          >
            나만의 티켓
          </div>
        )}

        {pageNum === 9 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(9));
            }}
          >
            티켓 전시관
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(9));
            }}
          >
            티켓 전시관
          </div>
        )}

        {pageNum === 10 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(10));
            }}
          >
            커뮤니티
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(10));
            }}
          >
            커뮤니티
          </div>
        )}

        {pageNum === 11 ? (
          <div
            className='selected'
            onClick={() => {
              dispatch(changePage(11));
            }}
          >
            용어 정리
          </div>
        ) : (
          <div
            className='selection'
            onClick={() => {
              dispatch(changePage(11));
            }}
          >
            용어 정리
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideHeader;
