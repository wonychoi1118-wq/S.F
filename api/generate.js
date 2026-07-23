export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { context, message, tone } = req.body;

  if (!message) {
    return res.status(400).json({ error: '답장할 메세지를 입력해주세요.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  const prompt = `
당신은 메세지 답장을 전문적으로 작성해 주는 AI 비서입니다.
아래 정보를 바탕으로 가장 자연스럽고 적절한 답장 메세지 단 하나만 작성해 주세요.

[상황 설명]: ${context || '없음'}
[받은 메세지]: ${message}
[요청 말투]: ${tone || '기본 (정중하고 친절함)'}

[답장 작성 조건]:
- 인사말과 본문을 자연스럽게 구성해 주세요.
- 요청된 말투(${tone})의 어조를 철저히 지켜주세요.
- 불필요한 부연 설명 없이, 바로 사용할 수 있는 답장 메세지 본문만 출력해 주세요.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API 호출 오류');
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '답장을 생성하는 중 오류가 발생했습니다.' });
  }
}
