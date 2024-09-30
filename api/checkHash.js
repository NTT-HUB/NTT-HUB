export default async function handler(req, res) {
  const { hash } = req.query;
  const token = '45606d2e412d9637e339dd742800fcd2fb638b6d06edb830efdf050e3d8a446b';

  try {
    const response = await fetch(`https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${token}&hash=${hash}`, {
      method: 'POST',
    });

    // Đọc phản hồi dưới dạng text trước khi chuyển đổi sang JSON
    const responseText = await response.text();
    
    // Trả về chi tiết phản hồi dưới dạng text để bạn kiểm tra
    res.status(200).send(responseText);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from API', details: error.message });
  }
}
