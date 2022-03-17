import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

const myTheme = {
  // Theme object to extends default dark theme.
};

// 설치해야하는 라이브러리들은 readme에 써놓았습니다
// jira 연동되는지 테스트를 위한 commit2

const Page3 = () => (
  <ImageEditor
    includeUI={{
      loadImage: {
        // path 에 사진 경로를 넣으면 로드하자마자 바로 사진이 들어갑니다.
        path: "https://static6.depositphotos.com/1096853/618/i/600/depositphotos_6188324-stock-photo-event-ticket.jpg",
        name: "SampleImage",
      },
      theme: myTheme,
      menu: [
        // 넣고싶은 기능을 이 배열에서 없애거나 추가할 수 있습니다.
        "resize",
        "crop",
        "flip",
        "rotate",
        "draw",
        "shape",
        "icon",
        "text",
        "mask",
        "filter",
      ],
      // 시작할 때 바로 로드되는 기능을 적습니다.
      initMenu: "draw",
      // width가 너무 커지면 사진이 로드돼도 Toast UI 타이틀이 표시돼서 1000px로 정했습니다.
      uiSize: {
        width: "1000px",
        height: "700px",
      },
      // 메뉴바를 bottom, left, right 로 하면 Toast UI 타이틀이 표시돼서 top으로 정했습니다.
      menuBarPosition: "top",
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    // API 보시면 이미지를 선택하거나 crop 할 때 가장자리 모양을 설정하는 엄청 여러가지 선택기능이 있습니다.
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70,
      cornerColor: "red",
    }}
    usageStatistics={true}
    // 아래 설정을 false 로 하면 selectionStyle이 전부 default 값으로 변합니다.
    applyCropSelectionStyle={true}
  />
);

export default Page3;
