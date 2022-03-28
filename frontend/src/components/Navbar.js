import * as React from "react";
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

// Navbar에 페이지 추가하고싶으시면, 바로 아랫 줄 pages 안에 요소 추가하시면 됩니다.
const pages = [
  "Profile",
  "Detail",
  "Toast UI",
  "Community",
  // "Mint",
  // "My Animal",
  // "Sale Animal",
  "Guide",
  "Redux1",
  "Redux2",
  "Ticket-Detail",
  "Barcode",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  // react 6.0 버전 이후부터 useHistory => useNavigate 로 바뀌었다고 합니다.
  const navigate = useNavigate();

  const Logo = styled.img`
    width: 107px;
    height: 30px;
    margin-top: 5px;
  `;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar
      position='sticky'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#F5F5F5" }}
    >
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
          >
            <Link to='/'>
              <Logo src='images/logo.png'></Logo>
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
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => navigate(`/${page}`)}
                  sx={{
                    ":hover": {
                      color: "#FFC600",
                    },
                  }}
                  // onClick={handleCloseNavMenu}
                >
                  <Typography textAlign='center'>
                    {/* <Link to={`/${page}`}>{page}</Link> */}
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to='/'>
              <Logo src='images/logo.png'></Logo>
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* 바로 아래 sx 수정하여 버튼 속성 수정 */}
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                onClick={() => navigate(`/${page}`)}
                sx={{
                  textAlign: "center",
                  mx: 1,
                  my: 2,
                  color: "black",
                  display: "block",
                  ":hover": {
                    color: "#FFC600",
                    bgcolor: "#F5F5F5",
                  },
                }}
              >
                {/* <Link to={`/${page}`}>{page}</Link> */}
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
                  <Typography textAlign='center'>{setting}</Typography>
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
