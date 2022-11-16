function gioSetUserId() {
  gdp('setUserId', 'ZhangSan');
  console.warn('asefdwefedrsfsdf');
}
function gioChangeUserId() {
  gdp('setUserId', 'myUserId-' + Date.now());
  console.error('asefdwefedrsfsdf');
}
function gioSetUserIdAndUserKey() {
  gdp('setUserId', 'ZhangSan', 'Gio_Name!@#$%^&*()_+-=[]{}|;:",.<>/?`~AaZa');
}
function gioChangeUserIdAndUserKey() {
  gdp('setUserId', 'myUserId-' + Date.now(), 'myUserKey' + Date.now());
}
function gioClearUserIdAndUserKey() {
  gdp('clearUserId');
}
function gioSetUserAttributes() {
  gdp('setUserAttributes', {
    name: 'Kate',
    age: 18,
    phone: 13512341234
  });
}
function gioGetDeviceId() {
  console.log(gdp('getDeviceId'));
}
function gioChangeQuery() {
  history.pushState(
    null,
    null,
    // location.pathname + '?mytm=' + Date.now() + '&myUserId=' + Date.now()
    location.pathname + '?/#/firstname=123&lastname=123/#/abc/defe?a=1&b=2?c=3'
  );
}
function gioChangeHash() {
  history.pushState(null, null, location.pathname + '#' + Date.now());
}
function gioMinipInfo() {
  location.href =
    location.pathname +
    '?mytm=??' +
    Date.now() +
    '&myUserId=' +
    Date.now() +
    '&gioappid=wxd703bebcd9364ca7&giocs1=zhangsan&gioplatform=MinP&gioprojectid=91eaf9b283361032&gios=138f8ce6-a003-4ef8-99d6-ba41eb5ce653&giou=openId-123456&giodatacollect=true&giodatasourceid=81a6e08ab78a809e&gioid=zhangsan&giouserkey=&gioappChannel=scn%3A1001&giodeviceBrand=devtools&giodeviceModel=iPhone%206%2F7%2F8&giodeviceType=devtools&gionetworkState=wifi&gioplatformVersion=Weixin%208.0.5&giolanguage=zh_CN&gioscreenHeight=1334&gioscreenWidth=750&giooperatingSystem=devtools';
}
function gioToggleAutoTrack() {
  gdp('setOption', 'autotrack', !gdp('getOption', 'autotrack'));
}
function gioNormalBtn() {}
function gioExtraBtn() {}
function gioToggleDataCollect() {
  gdp('setOption', 'dataCollect', !gdp('getOption', 'dataCollect'));
}
function gioSetGeneralProps() {
  gdp('setGeneralProps', { myname: 'Mick', age: 18 });
}
function gioClearGeneralProps() {
  gdp('clearGeneralProps');
}
function gioIllegalTrack() {
  gdp('track', null, null);
  gdp('track', '', null);
  gdp('track', '', {});
  gdp('track', 'test-imp', {
    'testcstm-no-var-1': 'hjh',
    'testcstm-no-var-2': '19'
  });
  gdp('track', { 'testcstm-no-var-1': 'hjh', 'testcstm-no-var-2': '19' });
}
function gioLegalTrack() {
  gdp('track', 'testcstm_var', {
    'var-1': 12,
    'var-2': 'var-2-value',
    13: 13,
    '': 'var-4-value',
    'var-5': ''
  });
  gdp('track', 'testcstm_num', 10, {});
  gdp('track', 'testcstm_no_var');
  gdp(
    'track',
    'varkey',
    {
      app_web_var_1: 'app_web_var_1_xm'
    },
    { id: 'var_id', key: 'var_Key' }
  );
  gdp(
    'track',
    'varkey',
    {},
    {
      id: 'var_id_1',
      key: 'var_Key_1',
      attributes: {
        app_var: 'item_attr_1'
      }
    }
  );
  gdp('track', 'listAttr', {
    list_attr1: ['aaabbb', 8769.012, 0, -1333, '我是中文', null],
    list_attr2: 'attr_value'
  });
}
function gioHandleError1() {
  console.log(gioObject.a);
}
function gioHandleError2() {
  throw new Error('my custom error');
}
// async function gioHandleError3() {
//   const gioInfo = () => {
//     ggg();
//     console.log('gioHandleError3');
//   };
//   await gioInfo();
// }
// function gioHandleError4() {
//   new Promise((resolve, reject) => {
//     console.log('gioHandleError4');
//     reject(new Error('gioHandleError4 Error'));
//   });
// }
function gioHandleXHR() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'http://apis.juhe.cn/fapig/calendar/day.php?date=2021-05-09&key=63040e517e9b972116d5c5814f28782c'
  );
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.statusText);
    }
  };

  var xhr2 = new XMLHttpRequest();
  xhr2.open(
    'POST',
    'http://apis.juhe.cn/fapig/calendar/day.php?date=2021-05-09'
  );
  xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = new FormData();
  data.append('name', 'Cyndi');
  data.append('age', '18');
  xhr2.send('name=Cyndi');
  xhr2.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.statusText);
    }
  };
}
function gioHandleFetch() {
  fetch(
    'http://v.cehe.cn/todayOnhistory/queryEvent.php?key=bb930191a775c236534119bdc6df760f&date=1/1'
  ).then((response) => {
    console.log(response);
  });
  fetch(
    'http://v.fenkai.cn/todayOnhistory/queryEvent.php?key=bb930191a775c236534119bdc6df760f&date=1/1'
  ).then((response) => {
    console.log(response);
  });
  fetch(
    'http://v.heshang.cn/todayOnhistory/queryEvent.php?key=bb930191a775c236534119bdc6df760f&date=1/1'
  ).then((response) => {
    console.log(response);
  });
  fetch(
    'http://v.xiangxia.cn/todayOnhistory/queryEvent.php?key=bb930191a775c236534119bdc6df760f&date=1/1'
  ).then((response) => {
    console.log(response);
  });
}

function gioAddImpAttr() {
  const impNode = document.getElementById('imp_0');
  impNode.setAttribute('data-gio-imp-track', 'myNewTrack');
  impNode.setAttribute(
    'data-gio-imp-attrs',
    JSON.stringify({ name: 'Cindy', age: 18 })
  );
}
