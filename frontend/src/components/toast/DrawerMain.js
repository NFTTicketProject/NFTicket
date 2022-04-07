/* eslint-disable */
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import stamp1 from "../../images/stamp/stamp1.png";
import stamp2 from "../../images/stamp/stamp2.png";
import stamp3 from "../../images/stamp/stamp3.png";
import stamp4 from "../../images/stamp/stamp4.png";
import stamp5 from "../../images/stamp/stamp5.png";
import stamp6 from "../../images/stamp/stamp6.png";
import stamp7 from "../../images/stamp/stamp7.png";

import emoticon1 from "../../images/stamp/emoticon/01_really.png";
import emoticon2 from "../../images/stamp/emoticon/02_silly.png";
import emoticon3 from "../../images/stamp/emoticon/03_annoyed.png";
import emoticon4 from "../../images/stamp/emoticon/04_shocked.png";
import emoticon5 from "../../images/stamp/emoticon/05_smiley.png";
import emoticon6 from "../../images/stamp/emoticon/06_ridicule.png";
import emoticon7 from "../../images/stamp/emoticon/07_wonder.png";
import emoticon8 from "../../images/stamp/emoticon/08_notgood.png";
import emoticon9 from "../../images/stamp/emoticon/09_blind.png";
import emoticon10 from "../../images/stamp/emoticon/10_mad.png";
import emoticon11 from "../../images/stamp/emoticon/11_thinkbad.png";
import emoticon12 from "../../images/stamp/emoticon/12_ho.png";
import emoticon13 from "../../images/stamp/emoticon/13_surrender.png";
import emoticon14 from "../../images/stamp/emoticon/14_basic.png";
import emoticon15 from "../../images/stamp/emoticon/15_wonder2.png";
import emoticon16 from "../../images/stamp/emoticon/16_laugh.png";
import emoticon17 from "../../images/stamp/emoticon/17_strange.png";
import emoticon18 from "../../images/stamp/emoticon/18_sad.png";
import emoticon19 from "../../images/stamp/emoticon/19_dead.png";
import emoticon20 from "../../images/stamp/emoticon/20_sleep.png";
import emoticon21 from "../../images/stamp/emoticon/21_happysilly.png";
import emoticon22 from "../../images/stamp/emoticon/22_what.png";
import emoticon23 from "../../images/stamp/emoticon/23_laughter.png";
import emoticon24 from "../../images/stamp/emoticon/24_suspicious.png";

import normal001 from "../../images/stamp/normal/001.png";
import normal002 from "../../images/stamp/normal/002.png";
import normal003 from "../../images/stamp/normal/003.png";
import normal004 from "../../images/stamp/normal/004.png";
import normal005 from "../../images/stamp/normal/005.png";
import normal006 from "../../images/stamp/normal/006.png";
import normal007 from "../../images/stamp/normal/007.png";
import normal008 from "../../images/stamp/normal/008.png";
import normal009 from "../../images/stamp/normal/009.png";
import normal010 from "../../images/stamp/normal/010.png";
import normal011 from "../../images/stamp/normal/011.png";
import normal012 from "../../images/stamp/normal/012.png";
import normal013 from "../../images/stamp/normal/013.png";
import normal014 from "../../images/stamp/normal/014.png";
import normal015 from "../../images/stamp/normal/015.png";
import normal016 from "../../images/stamp/normal/016.png";
import normal017 from "../../images/stamp/normal/017.png";
import normal018 from "../../images/stamp/normal/018.png";
import normal019 from "../../images/stamp/normal/019.png";
import normal020 from "../../images/stamp/normal/020.png";
import normal021 from "../../images/stamp/normal/021.png";
import normal022 from "../../images/stamp/normal/022.png";
import normal023 from "../../images/stamp/normal/023.png";
import normal024 from "../../images/stamp/normal/024.png";
import normal025 from "../../images/stamp/normal/025.png";
import normal026 from "../../images/stamp/normal/026.png";
import normal027 from "../../images/stamp/normal/027.png";
import normal028 from "../../images/stamp/normal/028.png";
import normal029 from "../../images/stamp/normal/029.png";
import normal030 from "../../images/stamp/normal/030.png";
import normal031 from "../../images/stamp/normal/031.png";
import normal032 from "../../images/stamp/normal/032.png";
import normal033 from "../../images/stamp/normal/033.png";
import normal034 from "../../images/stamp/normal/034.png";
import normal035 from "../../images/stamp/normal/035.png";
import normal036 from "../../images/stamp/normal/036.png";
import normal037 from "../../images/stamp/normal/037.png";
import normal038 from "../../images/stamp/normal/038.png";
import normal039 from "../../images/stamp/normal/039.png";
import normal040 from "../../images/stamp/normal/040.png";
import normal041 from "../../images/stamp/normal/041.png";
import normal042 from "../../images/stamp/normal/042.png";
import normal043 from "../../images/stamp/normal/043.png";
import normal044 from "../../images/stamp/normal/044.png";
import normal045 from "../../images/stamp/normal/045.png";
import normal046 from "../../images/stamp/normal/046.png";
import normal047 from "../../images/stamp/normal/047.png";
import normal048 from "../../images/stamp/normal/048.png";
import normal049 from "../../images/stamp/normal/049.png";
import normal050 from "../../images/stamp/normal/050.png";
import normal051 from "../../images/stamp/normal/051.png";
import normal052 from "../../images/stamp/normal/052.png";
import normal053 from "../../images/stamp/normal/053.png";
import normal054 from "../../images/stamp/normal/054.png";
import normal055 from "../../images/stamp/normal/055.png";
import normal056 from "../../images/stamp/normal/056.png";
import normal057 from "../../images/stamp/normal/057.png";
import normal058 from "../../images/stamp/normal/058.png";
import normal059 from "../../images/stamp/normal/059.png";
import normal060 from "../../images/stamp/normal/060.png";
import normal061 from "../../images/stamp/normal/061.png";
import normal062 from "../../images/stamp/normal/062.png";
import normal063 from "../../images/stamp/normal/063.png";
import normal064 from "../../images/stamp/normal/064.png";
import normal065 from "../../images/stamp/normal/065.png";
import normal066 from "../../images/stamp/normal/066.png";
import normal067 from "../../images/stamp/normal/067.png";
import normal068 from "../../images/stamp/normal/068.png";
import normal069 from "../../images/stamp/normal/069.png";
import normal070 from "../../images/stamp/normal/070.png";
import normal071 from "../../images/stamp/normal/071.png";
import normal072 from "../../images/stamp/normal/072.png";
import normal073 from "../../images/stamp/normal/073.png";
import normal074 from "../../images/stamp/normal/074.png";
import normal075 from "../../images/stamp/normal/075.png";
import normal076 from "../../images/stamp/normal/076.png";
import normal077 from "../../images/stamp/normal/077.png";
import normal078 from "../../images/stamp/normal/078.png";
import normal079 from "../../images/stamp/normal/079.png";
import normal080 from "../../images/stamp/normal/080.png";
import normal081 from "../../images/stamp/normal/081.png";
import normal082 from "../../images/stamp/normal/082.png";
import normal083 from "../../images/stamp/normal/083.png";
import normal084 from "../../images/stamp/normal/084.png";
import normal085 from "../../images/stamp/normal/085.png";
import normal086 from "../../images/stamp/normal/086.png";
import normal087 from "../../images/stamp/normal/087.png";
import normal088 from "../../images/stamp/normal/088.png";
import normal089 from "../../images/stamp/normal/089.png";
import normal090 from "../../images/stamp/normal/090.png";
import normal091 from "../../images/stamp/normal/091.png";
import normal092 from "../../images/stamp/normal/092.png";
import normal093 from "../../images/stamp/normal/093.png";
import normal094 from "../../images/stamp/normal/094.png";
import normal095 from "../../images/stamp/normal/095.png";
import normal096 from "../../images/stamp/normal/096.png";
import normal097 from "../../images/stamp/normal/097.png";
import normal098 from "../../images/stamp/normal/098.png";
import normal099 from "../../images/stamp/normal/099.png";
import normal100 from "../../images/stamp/normal/100.png";
import normal101 from "../../images/stamp/normal/101.png";
import normal102 from "../../images/stamp/normal/102.png";
import normal103 from "../../images/stamp/normal/103.png";
import normal104 from "../../images/stamp/normal/104.png";
import normal105 from "../../images/stamp/normal/105.png";
import normal106 from "../../images/stamp/normal/106.png";
import normal107 from "../../images/stamp/normal/107.png";
import normal108 from "../../images/stamp/normal/108.png";
import normal109 from "../../images/stamp/normal/109.png";
import normal110 from "../../images/stamp/normal/110.png";
import normal111 from "../../images/stamp/normal/111.png";
import normal112 from "../../images/stamp/normal/112.png";
import normal113 from "../../images/stamp/normal/113.png";
import normal114 from "../../images/stamp/normal/114.png";
import normal115 from "../../images/stamp/normal/115.png";
import normal116 from "../../images/stamp/normal/116.png";
import normal117 from "../../images/stamp/normal/117.png";
import normal118 from "../../images/stamp/normal/118.png";
import normal119 from "../../images/stamp/normal/119.png";
import normal120 from "../../images/stamp/normal/120.png";


import icon001 from "../../images/stamp/icon/001.PNG";
import icon002 from "../../images/stamp/icon/002.PNG";
import icon003 from "../../images/stamp/icon/003.PNG";
import icon004 from "../../images/stamp/icon/004.PNG";
import icon005 from "../../images/stamp/icon/005.PNG";
import icon006 from "../../images/stamp/icon/006.PNG";
import icon007 from "../../images/stamp/icon/007.PNG";
import icon008 from "../../images/stamp/icon/008.PNG";
import icon009 from "../../images/stamp/icon/009.PNG";
import icon010 from "../../images/stamp/icon/010.PNG";
import icon011 from "../../images/stamp/icon/011.PNG";
import icon012 from "../../images/stamp/icon/012.PNG";
import icon013 from "../../images/stamp/icon/013.PNG";
import icon014 from "../../images/stamp/icon/014.PNG";
import icon015 from "../../images/stamp/icon/015.PNG";
import icon016 from "../../images/stamp/icon/016.PNG";
import icon017 from "../../images/stamp/icon/017.PNG";
import icon018 from "../../images/stamp/icon/018.PNG";
import icon019 from "../../images/stamp/icon/019.PNG";
import icon020 from "../../images/stamp/icon/020.PNG";
import icon021 from "../../images/stamp/icon/021.PNG";
import icon022 from "../../images/stamp/icon/022.PNG";
import icon023 from "../../images/stamp/icon/023.PNG";
import icon024 from "../../images/stamp/icon/024.PNG";
import icon025 from "../../images/stamp/icon/025.PNG";
import icon026 from "../../images/stamp/icon/026.PNG";
import icon027 from "../../images/stamp/icon/027.PNG";
import icon028 from "../../images/stamp/icon/028.PNG";
import icon029 from "../../images/stamp/icon/029.PNG";
import icon030 from "../../images/stamp/icon/030.PNG";
import icon031 from "../../images/stamp/icon/031.PNG";
import icon032 from "../../images/stamp/icon/032.PNG";
import icon033 from "../../images/stamp/icon/033.PNG";
import icon034 from "../../images/stamp/icon/034.PNG";
import icon035 from "../../images/stamp/icon/035.PNG";
import icon036 from "../../images/stamp/icon/036.PNG";
import icon037 from "../../images/stamp/icon/037.PNG";
import icon038 from "../../images/stamp/icon/038.PNG";
import icon039 from "../../images/stamp/icon/039.PNG";
import icon040 from "../../images/stamp/icon/040.PNG";
import icon041 from "../../images/stamp/icon/041.PNG";
import icon042 from "../../images/stamp/icon/042.PNG";
import icon043 from "../../images/stamp/icon/043.PNG";
import icon044 from "../../images/stamp/icon/044.PNG";
import icon045 from "../../images/stamp/icon/045.PNG";
import icon046 from "../../images/stamp/icon/046.PNG";
import icon047 from "../../images/stamp/icon/047.PNG";
import icon048 from "../../images/stamp/icon/048.PNG";

import galaxy001 from "../../images/stamp/galaxy/001.png";
import galaxy002 from "../../images/stamp/galaxy/002.png";
import galaxy003 from "../../images/stamp/galaxy/003.png";
import galaxy004 from "../../images/stamp/galaxy/004.png";
import galaxy005 from "../../images/stamp/galaxy/005.png";
import galaxy006 from "../../images/stamp/galaxy/006.png";
import galaxy007 from "../../images/stamp/galaxy/007.png";
import galaxy008 from "../../images/stamp/galaxy/008.png";
import galaxy009 from "../../images/stamp/galaxy/009.png";
import galaxy010 from "../../images/stamp/galaxy/010.png";
import galaxy011 from "../../images/stamp/galaxy/011.png";
import galaxy012 from "../../images/stamp/galaxy/012.png";
import galaxy013 from "../../images/stamp/galaxy/013.png";
import galaxy014 from "../../images/stamp/galaxy/014.png";
import galaxy015 from "../../images/stamp/galaxy/015.png";

import sns001 from "../../images/stamp/sns/001.png";
import sns002 from "../../images/stamp/sns/002.png";
import sns003 from "../../images/stamp/sns/003.png";
import sns004 from "../../images/stamp/sns/004.png";
import sns005 from "../../images/stamp/sns/005.png";
import sns006 from "../../images/stamp/sns/006.png";
import sns007 from "../../images/stamp/sns/007.png";
import sns008 from "../../images/stamp/sns/008.png";
import sns009 from "../../images/stamp/sns/009.png";
import sns010 from "../../images/stamp/sns/010.png";
import sns011 from "../../images/stamp/sns/011.png";
import sns012 from "../../images/stamp/sns/012.png";
import sns013 from "../../images/stamp/sns/013.png";
import sns014 from "../../images/stamp/sns/014.png";
import sns015 from "../../images/stamp/sns/015.png";
import sns016 from "../../images/stamp/sns/016.png";
import sns017 from "../../images/stamp/sns/017.png";
import sns018 from "../../images/stamp/sns/018.png";
import sns019 from "../../images/stamp/sns/019.png";
import sns020 from "../../images/stamp/sns/020.png";
import sns021 from "../../images/stamp/sns/021.png";
import sns022 from "../../images/stamp/sns/022.png";
import sns023 from "../../images/stamp/sns/023.png";
import sns024 from "../../images/stamp/sns/024.png";
import sns025 from "../../images/stamp/sns/025.png";
import sns026 from "../../images/stamp/sns/026.png";
import sns027 from "../../images/stamp/sns/027.png";
import sns028 from "../../images/stamp/sns/028.png";
import sns029 from "../../images/stamp/sns/029.png";
import sns030 from "../../images/stamp/sns/030.png";
import sns031 from "../../images/stamp/sns/031.png";
import sns032 from "../../images/stamp/sns/032.png";
import sns033 from "../../images/stamp/sns/033.png";
import sns034 from "../../images/stamp/sns/034.png";
import sns035 from "../../images/stamp/sns/035.png";
import sns036 from "../../images/stamp/sns/036.png";
import sns037 from "../../images/stamp/sns/037.png";
import sns038 from "../../images/stamp/sns/038.png";
import sns039 from "../../images/stamp/sns/039.png";
import sns040 from "../../images/stamp/sns/040.png";
import sns041 from "../../images/stamp/sns/041.png";
import sns042 from "../../images/stamp/sns/042.png";
import sns043 from "../../images/stamp/sns/043.png";
import sns044 from "../../images/stamp/sns/044.png";
import sns045 from "../../images/stamp/sns/045.png";
import sns046 from "../../images/stamp/sns/046.png";
import sns047 from "../../images/stamp/sns/047.png";
import sns048 from "../../images/stamp/sns/048.png";
import sns049 from "../../images/stamp/sns/049.png";
import sns050 from "../../images/stamp/sns/050.png";
import sns051 from "../../images/stamp/sns/051.png";
import sns052 from "../../images/stamp/sns/052.png";
import sns053 from "../../images/stamp/sns/053.png";
import sns054 from "../../images/stamp/sns/054.png";
import sns055 from "../../images/stamp/sns/055.png";
import sns056 from "../../images/stamp/sns/056.png";
import sns057 from "../../images/stamp/sns/057.png";
import sns058 from "../../images/stamp/sns/058.png";
import sns059 from "../../images/stamp/sns/059.png";
import sns060 from "../../images/stamp/sns/060.png";
import sns061 from "../../images/stamp/sns/061.png";
import sns062 from "../../images/stamp/sns/062.png";
import sns063 from "../../images/stamp/sns/063.png";
import sns064 from "../../images/stamp/sns/064.png";
import sns065 from "../../images/stamp/sns/065.png";
import sns066 from "../../images/stamp/sns/066.png";
import sns067 from "../../images/stamp/sns/067.png";
import sns068 from "../../images/stamp/sns/068.png";

import family001 from "../../images/stamp/family/001.png";
import family002 from "../../images/stamp/family/002.png";
import family003 from "../../images/stamp/family/003.png";
import family004 from "../../images/stamp/family/004.png";
import family005 from "../../images/stamp/family/005.png";
import family006 from "../../images/stamp/family/006.png";
import family007 from "../../images/stamp/family/007.png";
import family008 from "../../images/stamp/family/008.png";
import family009 from "../../images/stamp/family/009.png";
import family010 from "../../images/stamp/family/010.png";

import pin001 from "../../images/stamp/pin/001.png";
import pin002 from "../../images/stamp/pin/002.png";
import pin003 from "../../images/stamp/pin/003.png";
import pin004 from "../../images/stamp/pin/004.png";
import pin005 from "../../images/stamp/pin/005.png";
import pin006 from "../../images/stamp/pin/006.png";
import pin007 from "../../images/stamp/pin/007.png";
import pin008 from "../../images/stamp/pin/008.png";
import pin009 from "../../images/stamp/pin/009.png";
import pin010 from "../../images/stamp/pin/010.png";
import pin011 from "../../images/stamp/pin/011.png";
import pin012 from "../../images/stamp/pin/012.png";
import pin013 from "../../images/stamp/pin/013.png";
import pin014 from "../../images/stamp/pin/014.png";
import pin015 from "../../images/stamp/pin/015.png";
import pin016 from "../../images/stamp/pin/016.png";
import pin017 from "../../images/stamp/pin/017.png";
import pin018 from "../../images/stamp/pin/018.png";
import pin019 from "../../images/stamp/pin/019.png";
import pin020 from "../../images/stamp/pin/020.png";
import pin021 from "../../images/stamp/pin/021.png";
import pin022 from "../../images/stamp/pin/022.png";
import pin023 from "../../images/stamp/pin/023.png";
import pin024 from "../../images/stamp/pin/024.png";
import pin025 from "../../images/stamp/pin/025.png";
import pin026 from "../../images/stamp/pin/026.png";
import pin027 from "../../images/stamp/pin/027.png";
import pin028 from "../../images/stamp/pin/028.png";
import pin029 from "../../images/stamp/pin/029.png";
import pin030 from "../../images/stamp/pin/030.png";
import pin031 from "../../images/stamp/pin/031.png";
import pin032 from "../../images/stamp/pin/032.png";

const DrawerMain = (props) => {
  const [activeMenu, setActiveMenu] = useState('');

  const itemData = [
    {img: stamp1, title:'no'},
    {img: stamp2, title:'no'},
    {img: stamp3, title:'no'},
    {img: stamp4, title:'no'},
    {img: stamp5, title:'no'},
    {img: stamp6, title:'no'},
    {img: stamp7, title:'no'},
  ]
  const itemDataNormal = [
    {img: normal001, title:'no'},
    {img: normal002, title:'no'},
    {img: normal003, title:'no'},
    {img: normal004, title:'no'},
    {img: normal005, title:'no'},
    {img: normal006, title:'no'},
    {img: normal007, title:'no'},
    {img: normal008, title:'no'},
    {img: normal009, title:'no'},
    {img: normal010, title:'no'},
    {img: normal011, title:'no'},
    {img: normal012, title:'no'},
    {img: normal013, title:'no'},
    {img: normal014, title:'no'},
    {img: normal015, title:'no'},
    {img: normal016, title:'no'},
    {img: normal017, title:'no'},
    {img: normal018, title:'no'},
    {img: normal019, title:'no'},
    {img: normal020, title:'no'},
    {img: normal021, title:'no'},
    {img: normal022, title:'no'},
    {img: normal023, title:'no'},
    {img: normal024, title:'no'},
    {img: normal025, title:'no'},
    {img: normal026, title:'no'},
    {img: normal027, title:'no'},
    {img: normal028, title:'no'},
    {img: normal029, title:'no'},
    {img: normal030, title:'no'},
    {img: normal031, title:'no'},
    {img: normal032, title:'no'},
    {img: normal033, title:'no'},
    {img: normal034, title:'no'},
    {img: normal035, title:'no'},
    {img: normal036, title:'no'},
    {img: normal037, title:'no'},
    {img: normal038, title:'no'},
    {img: normal039, title:'no'},
    {img: normal040, title:'no'},
    {img: normal041, title:'no'},
    {img: normal042, title:'no'},
    {img: normal043, title:'no'},
    {img: normal044, title:'no'},
    {img: normal045, title:'no'},
    {img: normal046, title:'no'},
    {img: normal047, title:'no'},
    {img: normal048, title:'no'},
    {img: normal049, title:'no'},
    {img: normal050, title:'no'},
    {img: normal051, title:'no'},
    {img: normal052, title:'no'},
    {img: normal053, title:'no'},
    {img: normal054, title:'no'},
    {img: normal055, title:'no'},
    {img: normal056, title:'no'},
    {img: normal057, title:'no'},
    {img: normal058, title:'no'},
    {img: normal059, title:'no'},
    {img: normal060, title:'no'},
    {img: normal061, title:'no'},
    {img: normal062, title:'no'},
    {img: normal063, title:'no'},
    {img: normal064, title:'no'},
    {img: normal065, title:'no'},
    {img: normal066, title:'no'},
    {img: normal067, title:'no'},
    {img: normal068, title:'no'},
    {img: normal069, title:'no'},
    {img: normal070, title:'no'},
    {img: normal071, title:'no'},
    {img: normal072, title:'no'},
    {img: normal073, title:'no'},
    {img: normal074, title:'no'},
    {img: normal075, title:'no'},
    {img: normal076, title:'no'},
    {img: normal077, title:'no'},
    {img: normal078, title:'no'},
    {img: normal079, title:'no'},
    {img: normal080, title:'no'},
    {img: normal081, title:'no'},
    {img: normal082, title:'no'},
    {img: normal083, title:'no'},
    {img: normal084, title:'no'},
    {img: normal085, title:'no'},
    {img: normal086, title:'no'},
    {img: normal087, title:'no'},
    {img: normal088, title:'no'},
    {img: normal089, title:'no'},
    {img: normal090, title:'no'},
    {img: normal091, title:'no'},
    {img: normal092, title:'no'},
    {img: normal093, title:'no'},
    {img: normal094, title:'no'},
    {img: normal095, title:'no'},
    {img: normal096, title:'no'},
    {img: normal097, title:'no'},
    {img: normal098, title:'no'},
    {img: normal099, title:'no'},
    {img: normal100, title:'no'},
    {img: normal101, title:'no'},
    {img: normal102, title:'no'},
    {img: normal103, title:'no'},
    {img: normal104, title:'no'},
    {img: normal105, title:'no'},
    {img: normal106, title:'no'},
    {img: normal107, title:'no'},
    {img: normal108, title:'no'},
    {img: normal109, title:'no'},
    {img: normal110, title:'no'},
    {img: normal111, title:'no'},
    {img: normal112, title:'no'},
    {img: normal113, title:'no'},
    {img: normal114, title:'no'},
    {img: normal115, title:'no'},
    {img: normal116, title:'no'},
    {img: normal117, title:'no'},
    {img: normal118, title:'no'},
    {img: normal119, title:'no'},
    {img: normal120, title:'no'},
  ]
  const itemDataEmoticon = [
    {img: emoticon1, title:'no'},
    {img: emoticon2, title:'no'},
    {img: emoticon3, title:'no'},
    {img: emoticon4, title:'no'},
    {img: emoticon5, title:'no'},
    {img: emoticon6, title:'no'},
    {img: emoticon7, title:'no'},
    {img: emoticon8, title:'no'},
    {img: emoticon9, title:'no'},
    {img: emoticon10, title:'no'},
    {img: emoticon11, title:'no'},
    {img: emoticon12, title:'no'},
    {img: emoticon13, title:'no'},
    {img: emoticon14, title:'no'},
    {img: emoticon15, title:'no'},
    {img: emoticon16, title:'no'},
    {img: emoticon17, title:'no'},
    {img: emoticon18, title:'no'},
    {img: emoticon19, title:'no'},
    {img: emoticon20, title:'no'},
    {img: emoticon21, title:'no'},
    {img: emoticon22, title:'no'},
    {img: emoticon23, title:'no'},
    {img: emoticon24, title:'no'}
  ]
  const itemDataIcon = [
    {img: icon001, title:'no'},
    {img: icon002, title:'no'},
    {img: icon003, title:'no'},
    {img: icon004, title:'no'},
    {img: icon005, title:'no'},
    {img: icon006, title:'no'},
    {img: icon007, title:'no'},
    {img: icon008, title:'no'},
    {img: icon009, title:'no'},
    {img: icon010, title:'no'},
    {img: icon011, title:'no'},
    {img: icon012, title:'no'},
    {img: icon013, title:'no'},
    {img: icon014, title:'no'},
    {img: icon015, title:'no'},
    {img: icon016, title:'no'},
    {img: icon017, title:'no'},
    {img: icon018, title:'no'},
    {img: icon019, title:'no'},
    {img: icon020, title:'no'},
    {img: icon021, title:'no'},
    {img: icon022, title:'no'},
    {img: icon023, title:'no'},
    {img: icon024, title:'no'},
    {img: icon025, title:'no'},
    {img: icon026, title:'no'},
    {img: icon027, title:'no'},
    {img: icon028, title:'no'},
    {img: icon029, title:'no'},
    {img: icon030, title:'no'},
    {img: icon031, title:'no'},
    {img: icon032, title:'no'},
    {img: icon033, title:'no'},
    {img: icon034, title:'no'},
    {img: icon035, title:'no'},
    {img: icon036, title:'no'},
    {img: icon037, title:'no'},
    {img: icon038, title:'no'},
    {img: icon039, title:'no'},
    {img: icon040, title:'no'},
    {img: icon041, title:'no'},
    {img: icon042, title:'no'},
    {img: icon043, title:'no'},
    {img: icon044, title:'no'},
    {img: icon045, title:'no'},
    {img: icon046, title:'no'},
    {img: icon047, title:'no'},
    {img: icon048, title:'no'},
  ]
  const itemDataGalaxy = [
    {img: galaxy001, title:'no'},
    {img: galaxy002, title:'no'},
    {img: galaxy003, title:'no'},
    {img: galaxy004, title:'no'},
    {img: galaxy005, title:'no'},
    {img: galaxy006, title:'no'},
    {img: galaxy007, title:'no'},
    {img: galaxy008, title:'no'},
    {img: galaxy009, title:'no'},
    {img: galaxy010, title:'no'},
    {img: galaxy011, title:'no'},
    {img: galaxy012, title:'no'},
    {img: galaxy013, title:'no'},
    {img: galaxy014, title:'no'},
    {img: galaxy015, title:'no'},
  ]
  const itemDataSns = [
    {img: sns001, title:'no'},
    {img: sns002, title:'no'},
    {img: sns003, title:'no'},
    {img: sns004, title:'no'},
    {img: sns005, title:'no'},
    {img: sns006, title:'no'},
    {img: sns007, title:'no'},
    {img: sns008, title:'no'},
    {img: sns009, title:'no'},
    {img: sns010, title:'no'},
    {img: sns011, title:'no'},
    {img: sns012, title:'no'},
    {img: sns013, title:'no'},
    {img: sns014, title:'no'},
    {img: sns015, title:'no'},
    {img: sns016, title:'no'},
    {img: sns017, title:'no'},
    {img: sns018, title:'no'},
    {img: sns019, title:'no'},
    {img: sns020, title:'no'},
    {img: sns021, title:'no'},
    {img: sns022, title:'no'},
    {img: sns023, title:'no'},
    {img: sns024, title:'no'},
    {img: sns025, title:'no'},
    {img: sns026, title:'no'},
    {img: sns027, title:'no'},
    {img: sns028, title:'no'},
    {img: sns029, title:'no'},
    {img: sns030, title:'no'},
    {img: sns031, title:'no'},
    {img: sns032, title:'no'},
    {img: sns033, title:'no'},
    {img: sns034, title:'no'},
    {img: sns035, title:'no'},
    {img: sns036, title:'no'},
    {img: sns037, title:'no'},
    {img: sns038, title:'no'},
    {img: sns039, title:'no'},
    {img: sns040, title:'no'},
    {img: sns041, title:'no'},
    {img: sns042, title:'no'},
    {img: sns043, title:'no'},
    {img: sns044, title:'no'},
    {img: sns045, title:'no'},
    {img: sns046, title:'no'},
    {img: sns047, title:'no'},
    {img: sns048, title:'no'},
    {img: sns049, title:'no'},
    {img: sns050, title:'no'},
    {img: sns051, title:'no'},
    {img: sns052, title:'no'},
    {img: sns053, title:'no'},
    {img: sns054, title:'no'},
    {img: sns055, title:'no'},
    {img: sns056, title:'no'},
    {img: sns057, title:'no'},
    {img: sns058, title:'no'},
    {img: sns059, title:'no'},
    {img: sns060, title:'no'},
    {img: sns061, title:'no'},
    {img: sns062, title:'no'},
    {img: sns063, title:'no'},
    {img: sns064, title:'no'},
    {img: sns065, title:'no'},
    {img: sns066, title:'no'},
    {img: sns067, title:'no'},
    {img: sns068, title:'no'}
  ]
  const itemDataFamily = [
    {img: family001, title:'no'},
    {img: family002, title:'no'},
    {img: family003, title:'no'},
    {img: family004, title:'no'},
    {img: family005, title:'no'},
    {img: family006, title:'no'},
    {img: family007, title:'no'},
    {img: family008, title:'no'},
    {img: family009, title:'no'},
    {img: family010, title:'no'}
  ]
  const itemDataPin = [
    {img: pin001, title:'no'},
    {img: pin002, title:'no'},
    {img: pin003, title:'no'},
    {img: pin004, title:'no'},
    {img: pin005, title:'no'},
    {img: pin006, title:'no'},
    {img: pin007, title:'no'},
    {img: pin008, title:'no'},
    {img: pin009, title:'no'},
    {img: pin010, title:'no'},
    {img: pin011, title:'no'},
    {img: pin012, title:'no'},
    {img: pin013, title:'no'},
    {img: pin014, title:'no'},
    {img: pin015, title:'no'},
    {img: pin016, title:'no'},
    {img: pin017, title:'no'},
    {img: pin018, title:'no'},
    {img: pin019, title:'no'},
    {img: pin020, title:'no'},
    {img: pin021, title:'no'},
    {img: pin022, title:'no'},
    {img: pin023, title:'no'},
    {img: pin024, title:'no'},
    {img: pin025, title:'no'},
    {img: pin026, title:'no'},
    {img: pin027, title:'no'},
    {img: pin028, title:'no'},
    {img: pin029, title:'no'},
    {img: pin030, title:'no'},
    {img: pin031, title:'no'},
    {img: pin032, title:'no'},
  ]

  function MenuItem() {
    if (activeMenu === '개발') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75 * 3) }} cols={3} rowHeight={10}>
            {itemData.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemNormal() {
    if (activeMenu === '일반') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75*40) }} cols={3} rowHeight={10}>
            {itemDataNormal.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemEmoticon() {
    if (activeMenu === '이모티콘') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75*8) }} cols={3} rowHeight={10}>
            {itemDataEmoticon.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemIcon() {
    if (activeMenu === '아이콘') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75*16) }} cols={3} rowHeight={10}>
            {itemDataIcon.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemGalaxy() {
    if (activeMenu === '갤럭시') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75*5) }} cols={3} rowHeight={10}>
            {itemDataGalaxy.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemSns() {
    if (activeMenu === 'SNS') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75 * 23) }} cols={3} rowHeight={10}>
            {itemDataSns.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemFamily() {
    if (activeMenu === '가족') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75 * 4) }} cols={3} rowHeight={10}>
            {itemDataFamily.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }
  function MenuItemPin() {
    if (activeMenu === '핀') {
      return <ListItem >
          <ImageList sx={{ width: 200, height: (75 * 11) }} cols={3} rowHeight={10}>
            {itemDataPin.map((item) => (
              <ImageListItem 
                sx={{":hover": {cursor: 'pointer'}}}
                key={item.img}
                onClick={() => {props.editorAddStamp(item.img)}}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </ListItem>
    }
    return null;
  }

  return (
    <Box width="15em" order="-1" marginRight="1em">
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>

          {/* 테스트 중 */}
          {/* <ListItem 
            button 
            key='개발'
            onClick={() => {
              if (activeMenu !== '개발') {
                setActiveMenu('개발');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '개발') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='개발' />

          </ListItem>
          <MenuItem />
          <Divider /> */}

          {/* 일반 */}
          <ListItem 
            button 
            key='일반'
            onClick={() => {
              if (activeMenu !== '일반') {
                setActiveMenu('일반');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '일반') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='일반' />

          </ListItem>
          <MenuItemNormal />
          <Divider />


          {/* 이모티콘 */}
          <ListItem 
            button 
            key='이모티콘'
            onClick={() => {
              if (activeMenu !== '이모티콘') {
                setActiveMenu('이모티콘');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '이모티콘') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='이모티콘' />

          </ListItem>
          <MenuItemEmoticon />
          <Divider />

          {/* 아이콘 */}
          <ListItem 
            button 
            key='아이콘'
            onClick={() => {
              if (activeMenu !== '아이콘') {
                setActiveMenu('아이콘');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '아이콘') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='아이콘' />

          </ListItem>
          <MenuItemIcon />
          <Divider />

          {/* 갤럭시 */}
          <ListItem 
            button 
            key='갤럭시'
            onClick={() => {
              if (activeMenu !== '갤럭시') {
                setActiveMenu('갤럭시');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '갤럭시') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='갤럭시' />

          </ListItem>
          <MenuItemGalaxy />
          <Divider />

          {/* SNS */}
          <ListItem 
            button 
            key='SNS'
            onClick={() => {
              if (activeMenu !== 'SNS') {
                setActiveMenu('SNS');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === 'SNS') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='SNS' />

          </ListItem>
          <MenuItemSns />
          <Divider />

          {/* 가족 */}
          <ListItem 
            button 
            key='가족'
            onClick={() => {
              if (activeMenu !== '가족') {
                setActiveMenu('가족');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '가족') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='가족' />

          </ListItem>
          <MenuItemFamily />
          <Divider />

          {/* 핀 */}
          <ListItem 
            button 
            key='핀'
            onClick={() => {
              if (activeMenu !== '핀') {
                setActiveMenu('핀');
              } else {
                setActiveMenu('');
              }
            }}
            secondaryAction={
              (activeMenu === '핀') ? (
                <KeyboardArrowUpIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              ) : (
                <KeyboardArrowDownIcon
                  style={{ cursor: 'pointer' }}
                  color='primary'
                />
              )}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='핀' />

          </ListItem>
          <MenuItemPin />
          <Divider />

        </List>
      </Box>
    </Drawer>
  </Box>
  )
}

export default DrawerMain;