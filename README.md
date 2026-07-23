# 급식 알레르기 학생 관리 앱 (Vercel 배포용)

## 프로젝트 구조
- `public/index.html`: 프론트엔드 UI 및 로직
- `api/generate.js`: gemini-3.1-flash-lite API를 활용한 급식표 이미지 분석 Serverless Function
- `package.json`: 의존성 설정

## 배포 및 사용 방법
1. Vercel 프로젝트 생성 후 코드를 업로드합니다.
2. Vercel 프로젝트 설정(`Settings > Environment Variables`)에서 `GEMINI_API_KEY` 환경변수를 설정합니다.
3. 배포 완료 후 웹 앱에서 학생 정보를 등록하고 급식표 이미지를 올리면 자동으로 급식 주의 대상 학생이 강조 표시됩니다.
