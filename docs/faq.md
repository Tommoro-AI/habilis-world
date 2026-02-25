# FAQ

### 1. 인스턴스 수가 한도에 도달했어요. 초기화가 필요해요!
하빌리스 런처의 Settings 탭 하단 > OCI Records 클릭 > 원하는 설치 디바이스 삭제

<div style="display:flex;flex-wrap:nowrap;gap:10px;">

  <img src="/image/instance_reset.png" width="50%" />
  <img src="/image/instance_reset2.png" width="50%" />

</div>
<br />

### 2. (os error 2) No such file or directory 에러가 떠요!
해당 오류는 필수 실행 파일을 찾을 수 없을 때 발생합니다.  
하빌리스 콘솔은 **Docker**와 **Docker Compose** 설치를 필수로 요구합니다.

**확인 방법**
터미널에서 아래 명령어를 실행하여 설치 여부를 확인하세요.

```bash
docker --version
docker compose version