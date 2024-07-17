// pm2 간단하게 서버 실행!
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 빌드된 파일 제공
app.use(express.static(path.join(__dirname)));

// API 프록시 설정
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://prometheus.example.com/api/', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
    })
);

// 모든 요청을 React 애플리케이션으로 리다이렉트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
