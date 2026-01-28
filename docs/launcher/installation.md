# Habilis Launcher 설치 가이드

## 1. Habilis Launcher 설치 가이드 (Windows / Linux / macOS)

Habilis Launcher는 운영체제별 설치 파일 형태가 다르므로, 사용 중인 OS에 맞는 파일을 다운로드한 뒤 아래 절차에 따라 설치합니다.

---

### 1.1 설치 파일 다운로드

제공된 배포 파일 중 본인 OS에 해당하는 설치 파일을 선택하여 다운로드합니다.

![설치 파일 다운로드](./image/download_page.png)

- **Windows:** `.msi`
- **Linux:** `.AppImage`
- **macOS:** `.app`

> **💡 [ 중요 ] 다운로드 전 확인사항**
> 
> - OS 버전(Windows 10/11, macOS 버전, Linux 배포판)을 먼저 확인하세요.
> - 설치 중 권한(관리자 권한)이 필요할 수 있습니다.

---

### 1.2 Windows 설치 방법 (MSI)

Windows 환경에서는 MSI 설치 마법사를 통해 일반 프로그램처럼 설치합니다.

#### 1.2.1 설치 실행

1. 다운로드한 설치 파일(`.msi`)을 더블 클릭합니다.
    
    [이미지]
    
2. 설치 마법사 안내에 따라 **Next → Install** 순서로 진행합니다.
    
    [이미지]
    

#### 1.2.2 설치 완료 및 실행

1. 설치가 완료되면 **Finish**를 클릭합니다.
    
    [이미지]
    
2. 시작 메뉴에서 “Habilis Launcher”를 검색해 실행합니다.
    (또는 바탕화면 바로가기가 생성된 경우 해당 아이콘을 클릭합니다.)
    
    [이미지]
    

---

### 1.3 Linux 설치 방법 (AppImage)

Linux 환경에서는 AppImage 실행 파일을 실행하여 Habilis Launcher를 시작합니다.

#### 1.3.1 설치 파일 다운로드

1. 다운로드 페이지에서 `.AppImage` 파일을 받습니다.
    
    [이미지]
    

#### 1.3.2 실행

1. 파일을 실행하기 전에, 아래 명령을 입력한 뒤 다시 실행해 주세요.

```bash
chmod +x launcher.AppImage
```

[이미지]

> **💡 [ 중요 ]**
> 
> 파일을 실행했을 때 오류 메시지가 나온다면, `chmod +x launcher.AppImage` 를 다시 시도해주세요.

---

### 1.4 macOS 설치 방법 (APP)

macOS 환경에서는 `.app` 파일을 Applications 폴더로 옮겨 설치합니다.

#### 1.4.1 앱 이동

1. 다운로드한 `.app` 파일을 확인합니다.

[이미지]

2. 해당 앱을 **Applications(응용 프로그램)** 폴더로 드래그하여 이동합니다.

[이미지]

#### 1.4.2 최초 실행 (보안 설정)

1. **터미널(Terminal)** 을 실행합니다.

[이미지]

2. 아래 명령어를 입력하여 앱의 보안 속성을 제거합니다.

```bash
xattr -cr /Applications/habilis-launcher.app
```

[이미지]

3. Applications 폴더에서 앱을 실행합니다.

[이미지]

---

> **📖 [ 참고 ] 아래와 같은 메시지가 표시된다면**
> 
> 위의 `xattr -cr` 명령이 적용되지 않았거나, 앱이 업데이트/재설치로 교체된 경우일 수 있습니다.
> 
> - “**habilis-launcher is damaged and can’t be opened. You should move it to the Trash.**”
> - “**확인되지 않은 개발자**” 등의 보안 경고
> 
> [이미지]
> 
> 이 경우 터미널 명령을 다시 실행한 후 앱을 실행하세요.

### 1.5 (Habilis Launcher 삭제)

(내용 없음)
