# 5. 데이터 형식 변환

1. 좌측 메뉴 바에서 **Storage** 탭을 클릭하여 데이터 변환 화면에 진입합니다.
    
    ![예시 이미지](/image/example.png)
    
2. **Task name candidates** 에서 변환하고자 하는 Task name을 선택합니다.
    
    ![예시 이미지](/image/example.png)
    
3. **[Convert selected task]** 버튼을 눌러 LeRobot 데이터 형식으로의 변환을 진행합니다.
    
    ![예시 이미지](/image/example.png)
    
4. 상단 **Convert Status**에서 변환 진행율을 확인할 수 있습니다. 
    
    ![예시 이미지](/image/example.png)
    
- Task: 현재 변환중인 Task name 입니다.
- Folder: 현재 변환중인 Folder name 입니다.
1. 변환된 lerobot dataset은 `/habilis_dataset_manager/data/curation` 에 저장됩니다. 
    - lerobot dataset의 폴더 구조는 다음과 같습니다.
    
    ```bash
    habilis_dataset_manager/data/                                                                                                
      └── curation/                                                                                                                 
          └── {task_name}/                                                                 
              ├── data                                                                         
              ├── meta                                                     
              └── videos                                                       
    ```
    

:::info[정보]
태그를 기준으로 데이터를 변환할 수 있습니다.
 ![예시 이미지](/image/example.png)

 - Excluded tags: 제외할 태그
 - Included tags: 포함할 태그
:::