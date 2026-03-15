import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request) {
  try {
    // 读取图片信息JSON文件
    const jsonPath = join(process.cwd(), 'picture', 'index.json');
    const jsonData = readFileSync(jsonPath, 'utf8');
    const pictures = JSON.parse(jsonData);
    
    // 检查图片数组是否为空
    if (!pictures || pictures.length === 0) {
      return new Response('No pictures available', { status: 404 });
    }
    
    // 随机选择一张图片
    const randomIndex = Math.floor(Math.random() * pictures.length);
    const randomPicture = pictures[randomIndex];
    
    // 解析查询参数
    const url = new URL(request.url);
    const redirect = url.searchParams.get('redirect');
    
    // 如果 redirect=true，返回 302 重定向
    if (redirect === 'true') {
      // 构建重定向URL
      const redirectUrl = new URL(randomPicture.path, url.origin);
      
      return new Response(null, {
        status: 302,
        headers: {
          'Location': redirectUrl.toString(),
          'Cache-Control': 'no-cache',
        },
      });
    }
    
    // 否则直接返回图片内容
    const imagePath = join(process.cwd(), 'picture', randomPicture.filename);
    const imageBuffer = readFileSync(imagePath);
    
    let contentType = 'image/webp';
    
    // 直接返回图片内容
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      },
    });
    
  } catch (error) {
    console.error('Error serving random image:', error);
    return new Response('Failed to load random image', { status: 500 });
  }
}