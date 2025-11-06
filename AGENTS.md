# 博客项目架构说明 (AGENTS.md)

## 项目概述

这是一个基于Vue.js 2.x + Koa.js 2.x + MongoDB的全栈博客系统，支持服务端渲染(SSR)。项目包含前台展示和管理后台两个部分。

## 技术栈

### 前端技术
- **框架**: Vue.js 2.3.0
- **路由**: Vue Router 2.5.2
- **状态管理**: Vuex 2.3.1
- **构建工具**: Webpack 2.3.2
- **样式**: Stylus + Element UI
- **服务端渲染**: Vue Server Renderer

### 后端技术
- **框架**: Koa.js 2.2.0
- **数据库**: MongoDB + Mongoose
- **认证**: JWT Token
- **缓存**: LRU Cache + Node-Cache

### 开发工具
- **包管理**: npm
- **开发服务器**: nodemon
- **代码检查**: ESLint
- **部署**: PM2 + Docker

## 项目结构

```
项目根目录/
├── client/                    # 前端代码
│   ├── src/
│   │   ├── modules/
│   │   │   ├── front/         # 前台展示模块
│   │   │   │   ├── components/     # 组件
│   │   │   │   ├── router/         # 路由配置
│   │   │   │   ├── store/          # Vuex状态管理
│   │   │   │   └── assets/         # 静态资源
│   │   │   └── admin/         # 管理后台模块
│   │   │       ├── components/     # 管理组件
│   │   │       ├── store/          # 状态管理
│   │   │       └── assets/         # 样式资源
│   │   ├── api/               # API接口
│   │   └── lib/               # 工具库
│   ├── build/                 # Webpack配置
│   └── dist/                  # 构建输出
├── server/                    # 后端代码
│   ├── api/                   # API路由
│   ├── controllers/           # 控制器
│   ├── models/                # 数据模型
│   ├── middleware/            # 中间件
│   ├── configs/               # 配置文件
│   └── logs/                  # 日志文件
└── 配置文件                    # 各种配置文件
```

## 核心功能模块

### 1. 文章管理模块
- **路由**: `/api/articles`
- **功能**: 文章的增删改查、发布管理、搜索、点赞
- **关键文件**:
  - `server/controllers/articles_controller.js`
  - `server/models/article.js`
  - `client/src/api/article.js`

### 2. 标签管理模块
- **路由**: `/api/tags`
- **功能**: 标签的增删改查
- **关键文件**:
  - `server/controllers/tags_controller.js`
  - `server/models/tag.js`
  - `client/src/api/tag.js`

### 3. 笔记功能模块
- **路由**: `/api/note`
- **功能**: 简单的笔记功能，使用缓存实现
- **关键文件**:
  - `server/controllers/note_controller.js`
  - `server/models/note.js`
  - `server/controllers/cache.js`

### 4. 认证模块
- **路由**: `/api/token`
- **功能**: 用户登录认证，JWT令牌管理
- **关键文件**:
  - `server/controllers/token_controller.js`
  - `server/middleware/verify.js`

## 数据库模型

### Article (文章模型)
- `title`: 文章标题
- `content`: 文章内容
- `abstract`: 文章摘要
- `publish`: 发布状态
- `tags`: 标签数组
- `createTime`: 创建时间
- `lastEditTime`: 最后编辑时间
- `useful`: 点赞数

### Tag (标签模型)
- `name`: 标签名称

### User (用户模型) 
- 用于后台管理认证

### Note (笔记模型)
- `key`: 笔记键
- `message`: 笔记内容

## API接口说明

### 文章相关接口
- `GET /api/articles` - 获取所有文章(需认证)
- `POST /api/articles` - 创建文章(需认证)
- `PATCH /api/articles/:id` - 修改文章(需认证)
- `GET /api/articles/:id` - 获取单篇文章
- `DELETE /api/articles/:id` - 删除文章(需认证)
- `GET /api/publishArticles` - 获取已发布文章
- `GET /api/searchPublishArticles` - 搜索已发布文章
- `PATCH /api/zan/:id` - 文章点赞

### 标签相关接口
- `GET /api/tags` - 获取所有标签
- `POST /api/tags` - 创建标签(需认证)
- `PATCH /api/tags/:id` - 修改标签(需认证)
- `DELETE /api/tags/:id` - 删除标签(需认证)

### 笔记相关接口
- `GET /api/note` - 获取笔记
- `POST /api/note` - 创建/更新笔记

### 认证相关接口
- 认证相关接口在`token.js`中定义

## 开发配置

### 环境变量
- `NODE_ENV`: 环境变量(development/production)
- `PORT`: 服务端口(默认8889)
- `MONGO_URL`: MongoDB连接地址

### 构建命令
- `npm run dev` - 开发模式
- `npm run build` - 构建项目
- `npm start` - 生产模式启动
- `npm run prod` - 构建并启动生产环境

## 部署配置

### Docker支持
项目支持Docker部署，包含：
- `docker-compose.yml` - 开发环境配置
- `docker-compose.prod.yml` - 生产环境配置
- `node.dockerfile` - Node.js镜像配置

### PM2配置
- `pm2.json` - PM2进程管理配置

## 注意事项

1. **认证中间件**: 大部分管理接口需要JWT认证
2. **缓存策略**: 使用LRU缓存优化性能
3. **SSR配置**: 前台支持服务端渲染，后台使用常规SPA
4. **私有配置**: 敏感配置可在`server/configs/private.js`中定义
5. **安全考虑**: 密码等敏感信息使用环境变量或私有配置文件

## 开发指南

1. 启动MongoDB服务
2. 安装依赖: `npm install`
3. 开发模式: `npm run dev`
4. 访问前台: http://localhost:8889
5. 访问后台: http://localhost:8889/admin

这个文件将作为AI助手理解项目架构和功能的重要参考文档。