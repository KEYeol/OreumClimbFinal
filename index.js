const popup = document.getElementById('popup');
popup.style.display = 'none';

// 클릭한 핀의 초기 위치를 저장할 변수
let pinInitialTop = 0;
let pinInitialLeft = 0;

// 각 핀 클래스를 가져와서 이벤트 리스너를 추가
['pin1', 'pin2', 'pin3', 'pin4', 'pin5', 'pin6'].forEach(pinClass => {
    document.querySelectorAll('.' + pinClass).forEach(pin => {
        pin.addEventListener('click', async (event) => {
            event.stopPropagation(); // 이벤트 버블링을 막음

            // 클릭한 핀의 위치를 기준으로 팝업을 표시
            const popup = document.getElementById('popup');

            // 핀의 초기 위치를 설정
            const pinRect = event.target.getBoundingClientRect();
            pinInitialTop = pinRect.top - 120;
            pinInitialLeft = pinRect.left + (pinRect.width / 2); // 핀의 가운데 X 좌표

            // 팝업 위치 초기화
            popup.style.top = pinInitialTop + 'px'; // 핀의 윗 부분에 위치하도록 설정
            popup.style.left = pinInitialLeft + 'px'; // 핀의 가운데에 위치하도록 설정


            // 화면 너비가 700px 이하일 때
            if (window.innerWidth <= 1400 || window.innerHeight <= 800) {
                // 팝업을 화면의 중앙에 위치시킴
                popup.style.top = '50%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
            }

            // 클릭한 핀에 해당되는 번호 가져오기
            const pinNumber = pinClass.replace('pin', '');
            console.log(pinNumber);

            try {
                // Firestore에서 해당 번호의 placeName 필드값 가져오기
                const doc = await db.collection('oreum').doc(pinNumber).get();
                const placeName = doc.data().placeName;
                const fileName = doc.data().fileName;

                console.log(placeName);
                // 이미지 추가
                const img = document.createElement('img');
                img.src = `imgs/${fileName}_icon.png`;
                img.alt = placeName;
                img.width = 400;
                img.height = 140;

                // 팝업 이미지 영역에 추가
                const popupImage = document.querySelector('.popup-image');
                popupImage.innerHTML = ''; // 기존 이미지 제거
                popupImage.appendChild(img);

                const popupContent = document.querySelector('.popup-content');
                popupContent.innerText = placeName; // placeName 출력

                // 팝업 이미지 클릭 이벤트 리스너 추가
                popupImage.addEventListener('click', () => {
                    // 클릭한 핀 번호 가져오기
                    const pinNumber = pinClass.replace('pin', '');

                    // detail.html로 이동하면서 핀 번호를 쿼리 문자열로 전달
                    window.location.href = `detail.html?pin=${pinNumber}`;
                });
            } catch (error) {
                console.error('Error getting document:', error);
            }


            // 지미오름인 경우에만 팝업을 조금 내림, qhd에서는 상관 없으나, fhd같은 해상도에서 문제발생
            // fhd가 1080이고, hd가 720이니 일단 300픽셀정도 내림
            if (pinNumber === '5' && window.innerHeight <= 1100) {
                popup.style.top = (pinInitialTop + 300) + 'px';
            }
            // 팝업을 보여줌
            popup.style.display = 'block';

        });
    });
});


// 빈 공간을 클릭했을 때 팝업을 사라지게 함
document.addEventListener('click', (event) => {
    const popup = document.getElementById('popup');
    // 팝업 영역 외부를 클릭했고, 팝업이 보이는 상태라면 팝업을 숨김
    if (!popup.contains(event.target) && popup.style.display === 'block') {
        popup.style.display = 'none';
    }
});

// 닫기 버튼
document.querySelector('.close-btn').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
});