/* eslint-disable */
import React, { useEffect } from "react";
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const NotFound = () => {
  let navigate = useNavigate();

  // 3초 후 귀환
  useEffect(() => {
    let timerInterval
    swal.fire ({
      icon: 'error',
      position : 'middle',
      title: '존재하지 않는 페이지입니다.',
      text: '3초 후 홈으로 돌아갑니다.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        swal.showLoading()
        const b = swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === swal.DismissReason.timer) {
        // 타이머 종료
        navigate("/");
      }
    })
  }, [])

  return (
    <div>
      <img src="images/notFound.jpg" alt="404" style={{ width: "100vw" }}></img>
    </div>
  );
};

export default NotFound;