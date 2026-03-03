(async () => {
  const res = await fetch("https://soundl.ink/api/user/avatar", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjODdhOGZjLWEyY2UtNDFjZS04MjY2LTFiOGQ2ZTdiNThjZiIsImVtYWlsIjoiY2hlcHVyaW5hYXBvbGluYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2ODI4MzE3M30.FrV-GK2m_ntlhp84PlTbV5li0Rz5X5OhvHftQuvEEtA",
      "cache-control": "no-cache",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundaryJz9LbfYOt1VeqabA",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie:
        "_ga=GA1.1.1718981152.1764906284; _ym_uid=1764906284530008070; _ym_d=1764906284; _ym_isad=2; _ym_visorc=w; _ga_TM537C31V5=GS2.1.s1768533149$o78$g1$t1768537714$j60$l0$h0",
      Referer: "https://soundl.ink/profile/iVtCkhN",
    },
    body: '------WebKitFormBoundaryJz9LbfYOt1VeqabA\r\nContent-Disposition: form-data; name="file"; filename="garri-potter.jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundaryJz9LbfYOt1VeqabA--\r\n',
    method: "PUT",
  });

  console.log(res);
})();
