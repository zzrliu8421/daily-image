export const config = {
  runtime: 'nodejs',
};

export default function (request, response) {
  const host = request.headers['x-forwarded-host'] || request.headers['host'];
  const protocol = request.headers['x-forwarded-proto'] || 'https';
  const baseUrl = `${protocol}://${host}`;

  const htmlContent = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>图片 API 服务</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 720px;
      margin: 2rem auto;
      padding: 1rem;
      line-height: 1.6;
    }
    h1 { color: #333; }
    code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
    .endpoint { margin-bottom: 1.5rem; }
  </style>
</head>
<body>
  <h1>📷 图片 API 服务</h1>
  <p>提供 <strong>随机图像</strong> 和 <strong>每日图像</strong> 接口。</p>

  <div class="endpoint">
    <h2>/api/random</h2>
    <ul>
      <li><code>${baseUrl}/api/random</code> → 随机图片</li>
      <li><code>${baseUrl}/api/random?redirect=true</code> → 随机图片 302 重定向</li>
    </ul>
  </div>

  <div class="endpoint">
    <h2>/api/daily</h2>
    <ul>
      <li><code>${baseUrl}/api/daily</code> → 今日图像 webp 格式</li>
      <li><code>${baseUrl}/api/daily-jpeg</code> → 今日图像 jpeg 格式压缩版</li>
      <li><code>${baseUrl}/api/daily-original</code> → 今日图像 jpeg 格式原版</li>
    </ul>
  </div>
  
  <footer>
    <p style="margin-top:2rem; color:#777;">Powered by Vercel</p>
  </footer>
</body>
</html>`;

  response.setHeader('Content-Type', 'text/html');
  response.send(htmlContent);
}
