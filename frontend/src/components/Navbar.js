import React, { useEffect, useState } from "react";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// import logoImg from "../images/logo.png";

// Navbar에 페이지 추가하고싶으시면, 바로 아랫 줄 pages 안에 요소 추가하시면 됩니다.
const pages = [
  // "Profile",
  { name: "공연 등록", link: "ShowPublish" },
  { name: "공연몰", link: "Show" },
  { name: "티켓몰", link: "Market" },
  { name: "커뮤니티", link: "Community" },
  { name: "가이드", link: "Guide" },
  // { name: "상세인무언가", link: "Detail" },
  // { name: "이미지수정", link: "Toast UI" },
  // { name: "무언가작업중", link: "Detail-Handover" },
  // { name: "바코드", link: "Barcode" },
  // { name: "구매", link: "Purchase" },
];
const settings = [
  "MyPage",
  //  "Account", "Dashboard", "Logout"
];

const Logo = styled.img`
  width: 107px;
  margin-top: 5px;
  background-color: #f5f5f5;
`;

const ResponsiveAppBar = () => {
  // react 6.0 버전 이후부터 useHistory => useNavigate 로 바뀌었다고 합니다.
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("Home");

  // 로그인 여부
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  const [userInfo, setUserInfo] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState({
    nickname: "Unnamed",
    description: "Please Write Description",
  });

  // 지갑연결하기
  function checkConnectedWallet() {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    if (userData != null) {
      setUserInfo(userData);
      setIsConnected(true);
      // api 통해 지갑 정보 가져오고, walletInfo에 정보 추가
      // .get
      axios
        .get(`https://nfticket.plus/api/v1/profile/${userData.account}`)
        .then((res) => {
          setWalletInfo(res.data);
          // console.log(res);
        })
        .catch((err) => console.error(err));
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // 펼쳐진 상태에서의 Navbar 버튼클릭 이지만 비활성화 시켰다.
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    checkConnectedWallet();
  }, []);

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#F5F5F5" }}
    >
      {/* 펼친 로고 */}
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
            onClick={() => {
              setCurrentPage("Home");
            }}
          >
            <Link to='/'>
              <Logo src='https://nfticket.plus/showipfs/ipfs/QmVgBqiTaf2hkhwuKQwwBWedjmWBPgEzN6NvbqoTJpcNfN'></Logo>
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              // color='inherit'
              // inherit 흰색 default 회색 primary 파랑 secondary 보라 error 빨강 info 파랑 success 초록 warning 주황 string 적용안됨
              color='default'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                color: "text.secondary",
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.link !== currentPage)
                  return (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        navigate(`/${page.link}`);
                        setCurrentPage(page.link);
                      }}
                      sx={{
                        ":hover": {
                          color: "#e605ff",
                        },
                      }}
                    >
                      <Typography textAlign='center'>{page.name}</Typography>
                    </MenuItem>
                  );
                return (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      navigate(`/${page.link}`);
                      setCurrentPage(page.link);
                    }}
                    sx={{
                      ":hover": {
                        color: "#e605ff",
                      },
                      color: "#e605ff ",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* 안펼친 로고 */}
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              setCurrentPage("Home");
            }}
          >
            <Link to='/'>
              <Logo src='https://nfticket.plus/showipfs/ipfs/QmVgBqiTaf2hkhwuKQwwBWedjmWBPgEzN6NvbqoTJpcNfN'></Logo>
            </Link>
          </Typography>

          {/* 펼친 Navbar 버튼들 */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              mx: 3,
            }}
          >
            {pages.map((page) => {
              if (page.link !== currentPage)
                return (
                  <Button
                    key={page.name}
                    onClick={() => {
                      navigate(`/${page.link}`);
                      setCurrentPage(page.link);
                    }}
                    sx={{
                      textAlign: "center",
                      mx: 1,
                      my: 2,
                      color: "black",
                      display: "block",
                      ":hover": {
                        color: "#e605ff",
                        bgcolor: "#F5F5F5",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              return (
                <Button
                  key={page.name}
                  onClick={() => {
                    navigate(`/${page.link}`);
                    setCurrentPage(page.link);
                  }}
                  sx={{
                    textAlign: "center",
                    mx: 1,
                    my: 2,
                    color: "#e605ff ",
                    fontWeight: "bold",
                    display: "block",
                    ":hover": {
                      color: "#e605ff",
                      bgcolor: "#F5F5F5",
                    },
                  }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>

          {/* 프로필로 가는 아바타 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton
                onClick={() => {
                  navigate("/MyPage");
                  setCurrentPage("MyPage");
                }}
                sx={{ p: 0 }}
              >

                {userData === null ? (
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                ) : (
                  <Avatar
                    alt='Remy Sharp'
                    src={`https://nfticket.plus/showipfs/ipfs/${walletInfo.image_uri}`}
                  />
                )}
                {/* <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>
                    <Link to={`/${setting}`}>{setting}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
