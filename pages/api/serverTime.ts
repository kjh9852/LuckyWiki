import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverTime = dayjs().valueOf(); // 현재 서버 시간 (밀리초)
  res.status(200).json({ serverTime });
}
