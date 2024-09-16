import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverTime = Date.now(); // 현재 서버 시간 (밀리초)
  res.status(200).json({ serverTime });
}
