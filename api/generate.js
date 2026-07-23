import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageBase64, mimeType } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: '이미지 데이터가 필요합니다.' });
  }

  // 환경변수에서 GEMINI_API_KEY 읽기
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: '서버에 GEMINI_API_KEY가 설정되어 있지 않습니다.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      이 이미지는 학교 급식표입니다. 
      메뉴 이름 옆이나 괄호 안에 표기된 식단 알레르기 유발물질 번호(숫자)들을 모두 찾아주세요.
      응답은 오직 숫자를 요소로 가지는 JSON 배열 형식으로만 출력해주세요. 
      예시: [1, 5, 12, 18]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: imageBase64.split(',')[1] || imageBase64,
                mimeType: mimeType || 'image/jpeg',
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text;
    const detectedNumbers = JSON.parse(resultText);

    return res.status(200).json({ numbers: detectedNumbers });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Gemini API 처리 중 오류가 발생했습니다.' });
  }
}
