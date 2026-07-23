# AI 메세지 답장 도우미 (Vercel 배포용)

## 📁 프로젝트 구조
- `index.html`: 프론트엔드 UI
- `api/generate.js`: Gemini API 호출 서버리스 함수
- `vercel.json`: Vercel 프로젝트 설정 파일

## 🚀 배포 방법
1. 이 폴더의 내용을 GitHub 레포지토리에 올립니다.
2. [Vercel](https://vercel.com)에서 해당 레포지토리를 불러옵니다.
3. Vercel 프로젝트 설정의 **Environment Variables**에 아래 값을 등록합니다:
   - Key: `GEMINI_API_KEY`
   - Value: `본인의 Google Gemini API Key`
4. Deploy 버튼을 눌러 배포를 완료합니다.
