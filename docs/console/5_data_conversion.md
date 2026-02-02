# 5. 데이터 형식 변환
수집된 ROS2 Bag 데이터를 AI 학습을 위한 LeRobot 데이터셋 형식으로 변환합니다.

## Step 1. 메뉴 접속 및 대상 선택
1. 좌측 메뉴 바에서 **[Storage]** 탭을 클릭하여 데이터 변환 화면에 진입합니다.
![예시 이미지](./image/example.png)
    
2. **Task name candidates** 목록에서 변환을 원하는 Task name을 선택합니다.
![예시 이미지](./image/example.png)

## Step 2. 데이터 변환 실행
1. **[Convert selected task]** 버튼을 클릭하여 LeRobot 형식으로 변환합니다.
![예시 이미지](./image/example.png)

## Step 3. 진행 상태 확인    
상단의 Convert Status 섹션에서 실시간 변환 진행 상황을 모니터링할 수 있습니다.
![예시 이미지](./image/example.png)

<div class="field-table">
  <div class="field-row">
    <div class="field-label">Task</div>
    <div class="field-desc">현재 변환중인 작업명</div>
  </div>

  <div class="field-row">
    <div class="field-label">Folder</div>
    <div class="field-desc">현재 변환중인 폴더 이름 </div>
  </div>
</div>

## Step 4. 최종 데이터 저장 경로 확인  
변환이 완료된 데이터셋은 다음 경로에서 확인할 수 있습니다.
- 저장 경로: `/habilis_dataset_manager/data/curation`
- Lerobot 데이터 구조 예시:    
```bash
habilis_dataset_manager/data/curation/
    └── {task_name}/                                                                 
        ├── data                                                                         
        ├── meta                                                     
        └── videos                                                       
```
    

:::info[정보]
태그 기능을 활용하여 원하는 데이터만 필터링하여 변환할 수 있습니다.
![예시 이미지](./image/example.png)

- <strong>Excluded tags</strong>: 특정 태그가 포함된 에피소드를 <strong>제외하고</strong> 변환합니다.
- <strong>Included tags</strong>: 특정 태그가 포함된 에피소드만 <strong>포함하여</strong> 변환합니다. 
:::