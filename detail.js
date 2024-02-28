// 쿼리 문자열 파싱하여 핀 번호 확인
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pinNumber = urlParams.get('pin');



if (pinNumber) {
    console.log('Received pin number:', pinNumber);
    // Firebase에서 해당 pinNumber의 데이터 가져오기
    db.collection("oreum").doc(pinNumber).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();

            const placeName = data.placeName; // placeName 가져오기
            const fileName = data.fileName;
            const header = document.querySelector(".header");
            header.style.backgroundImage = `url(imgs/${fileName}.png)`; // 이미지 경로 설정

            // placeName을 logo에 표시
            document.querySelector(".logo").innerText = data.placeName;


            let comment = data.comment;
            // 줄바꿈 문자를 HTML 줄바꿈 태그로 변환
            comment = comment.replace(/\\n/g, '<br>');
            document.querySelector(".tagline").innerHTML = comment;



            // placeInfo를 Infomation-contents에 표시
            let Information_comment = data.placeInfo;
            Information_comment = Information_comment.replace(/\\n/g, '<br>')
            document.querySelector(".Infomation-contents").innerHTML = Information_comment;

            // 파노라마 링크 설정
            const panoramaLink = document.getElementById("panorama-link");
            panoramaLink.href = data.panorama;
            // 아이콘 색상 변경
            const icons = {
                "expense_icon": "money.png",
                "parking_icon": "parking.png",
                "pet_icon": "pet.png",
                "store_icon": "shop.png",
                "toilet_icon": "tolilet.png"
            };

            for (const key in icons) {
                const iconWrapper = document.querySelector(`.${key}`);
                const iconImg = iconWrapper.querySelector('img');
                if (data[key.replace('_icon', '')]) {
                    // true일 경우 #00CC00 (녹색)으로 변경
                    iconWrapper.style.backgroundColor = "#00CC00";
                } else {
                    // false일 경우 #CC0000 (빨간색)으로 변경
                    iconWrapper.style.backgroundColor = "#CC0000";

                    // 배경에 X표시 추가
                    iconWrapper.style.backgroundImage = `url(imgs/black_x.png)`;
                    iconWrapper.style.backgroundSize = `contain`;
                    iconWrapper.style.backgroundRepeat = `no-repeat`;
                    iconWrapper.style.backgroundPosition = `center`;
                }
                // 이미지 소스 변경
                iconImg.src = `./imgs/${icons[key]}`;
                iconImg.title = key.replace('_icon', ''); // 아이콘에 마우스를 올렸을 때의 타이틀 변경
                // db에서 이름 가져와서 헤더 배경 이미지로 설정
                const iconSize = 50; // 아이콘 래퍼의 너비와 높이를 100px로 설정
            }
        } else {
            console.log("No such document!");
        }

        // 파노라마 링크 설정
        const panoramaLink = document.getElementById("panorama-link");
        panoramaLink.href = data.panorama;



    }).catch((error) => {
        console.log("Error getting document:", error);
    });
} else {
    console.error('No pin number received.');
}



//x버튼 동작, index.html로 돌아감
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.querySelector(".back-button");

    backButton.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작(링크 이동)을 막음
        window.location.href = "index.html"; // index 파일로 이동
    });
});