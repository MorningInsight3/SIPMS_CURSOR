# SIPMS (智能综合病虫害管理系统) 🌱

<div align="center">
  <img src="assets/logo.png" alt="SIPMS Logo" width="200"/>
  <p>
    <img src="https://img.shields.io/badge/版本-1.0.0-blue.svg" alt="版本" />
    <img src="https://img.shields.io/badge/许可证-MIT-green.svg" alt="许可证" />
    <img src="https://img.shields.io/badge/平台-iOS%20%7C%20Android%20%7C%20Web-blue.svg" alt="平台" />
  </p>
</div>

## 📋 目录

- [项目简介](#项目简介)
- [系统功能](#系统功能)
- [技术架构](#技术架构)
- [安装与使用](#安装与使用)
- [项目结构](#项目结构)
- [核心功能模块](#核心功能模块)
- [系统截图](#系统截图)
- [开发指南](#开发指南)
- [贡献指南](#贡献指南)
- [常见问题](#常见问题)
- [联系方式](#联系方式)

## 📝 项目简介

SIPMS 是一个基于 React Native 和 Expo 开发的智能综合病虫害管理系统（Smart Integrated Pest Management System）。本系统为农业生产者和管理人员提供全面的解决方案，用于病虫害识别、监测、预警和防治管理。系统采用最新的技术栈和最佳实践，确保高性能、可扩展性和良好的用户体验。

<div align="center">
  <img src="assets/system_overview.png" alt="系统概览" width="80%"/>
  <p><small>▲ SIPMS 系统功能概览</small></p>
</div>

### 🔍 项目背景

随着精准农业的快速发展，传统的病虫害管理方式已无法满足现代农业生产的需求。SIPMS 应运而生，旨在通过数字化、智能化手段提升病虫害管理效率，降低农药使用量，提高作物产量和质量，为可持续农业发展提供技术支持。

### 💡 设计理念

- **精准识别**: 利用人工智能准确识别各类病虫害
- **智能预警**: 基于气象数据和历史记录预测病虫害风险
- **绿色防控**: 推荐最佳防治方案，减少农药使用
- **数据驱动**: 通过大数据分析辅助决策制定

## 🚀 系统功能

<div align="center">
  <img src="assets/system_functions.png" alt="系统功能" width="90%"/>
  <p><small>▲ SIPMS 系统功能架构图</small></p>
</div>

### 📱 多终端支持
- iOS 原生应用
- Android 原生应用
- Web 端支持
- 离线工作模式

### 🔍 病虫害识别系统
- 图像识别技术
- 多种作物支持
- 实时识别反馈
- 历史识别记录

### 📊 监测数据分析
- 环境数据收集
- 病虫害发生趋势
- 地理分布可视化
- 风险等级评估

### ⚠️ 智能预警系统
- 基于气象数据预警
- 阈值自动报警
- 多渠道通知推送
- 区域风险地图

### 💊 防治方案管理
- 个性化防治建议
- 农药使用指导
- 生物防治方案
- 防治效果跟踪

## 🛠️ 技术架构

<div align="center">
  <img src="assets/tech_stack.png" alt="技术架构" width="80%"/>
  <p><small>▲ SIPMS 技术架构图</small></p>
</div>

### 前端技术
- **核心框架**: React Native + Expo
- **状态管理**: Zustand
- **UI 组件库**: 
  - React Native Paper
  - React Native Elements
  - @rneui/base
- **导航系统**: Expo Router
- **数据获取**: React Query
- **本地存储**: AsyncStorage
- **样式方案**: TailwindCSS (twrnc)
- **类型系统**: TypeScript

### 开发工具
- **代码规范**: ESLint + Prettier
- **版本控制**: Git
- **包管理器**: npm/yarn
- **测试框架**: Jest
- **CI/CD**: GitHub Actions

## 📲 安装与使用

### 环境要求

- **Node.js**: 16.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **Expo CLI**: 最新版本
- **开发环境**:
  - iOS: Xcode 14+ (Mac 环境)
  - Android: Android Studio (Windows/Mac/Linux)
  - Web: 现代浏览器

<div align="center">
  <img src="assets/installation.png" alt="安装流程" width="70%"/>
  <p><small>▲ SIPMS 安装流程图</small></p>
</div>

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yourusername/SIPMS.git
cd SIPMS
```

2. **安装依赖**
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
vim .env
```

4. **启动开发服务器**
```bash
npm start
# 或
yarn start
```

5. **运行应用**
- iOS 模拟器: `npm run ios`
- Android 模拟器: `npm run android`
- Web 浏览器: `npm run web`

<div align="center">
  <img src="assets/qr_code.png" alt="应用二维码" width="200"/>
  <p><small>▲ 扫描二维码在 Expo Go 中预览应用</small></p>
</div>

## 📁 项目结构

```
SIPMS/
├── app/                    # 主应用目录
│   ├── (auth)/            # 认证相关页面
│   ├── (main)/            # 主要功能页面
│   └── _layout.tsx        # 根布局组件
├── components/            # 可复用组件
│   ├── common/           # 通用组件
│   ├── forms/            # 表单组件
│   └── layouts/          # 布局组件
├── assets/               # 静态资源
│   ├── images/          # 图片资源
│   ├── fonts/           # 字体文件
│   └── icons/           # 图标资源
├── constants/            # 常量定义
│   ├── colors.ts        # 颜色常量
│   ├── config.ts        # 配置常量
│   └── theme.ts         # 主题常量
├── hooks/               # 自定义 Hooks
│   ├── useAuth.ts       # 认证相关
│   ├── useData.ts       # 数据获取
│   └── useTheme.ts      # 主题相关
├── src/                 # 源代码
│   ├── api/            # API 接口
│   ├── services/       # 业务服务
│   ├── stores/         # 状态管理
│   └── utils/          # 工具函数
└── scripts/            # 脚本文件
    ├── build.js        # 构建脚本
    └── deploy.js       # 部署脚本
```

<div align="center">
  <img src="assets/project_structure.png" alt="项目结构" width="85%"/>
  <p><small>▲ SIPMS 项目结构图</small></p>
</div>

## ⚙️ 核心功能模块

<div align="center">
  <img src="assets/modules.png" alt="核心功能模块" width="90%"/>
  <p><small>▲ SIPMS 核心功能模块图</small></p>
</div>

### 1. 病虫害识别

<div align="center">
  <img src="assets/pest_detection.png" alt="病虫害识别模块" width="70%"/>
  <p><small>▲ 病虫害识别模块截图</small></p>
</div>

- **图像识别**
  - 多角度拍照识别
  - 离线识别能力
  - 识别结果详情
  - 相似病害对比

- **症状描述**
  - 关键词匹配
  - 专家知识库
  - 智能问答系统
  - 识别准确度评分

- **识别历史**
  - 历史记录查询
  - 识别结果分类
  - 时间线展示
  - 数据导出功能

### 2. 监测管理

<div align="center">
  <img src="assets/monitoring.png" alt="监测管理" width="70%"/>
  <p><small>▲ 监测管理模块截图</small></p>
</div>

- **监测点管理**
  - 地理位置标记
  - 监测设备绑定
  - 监测计划制定
  - 监测范围设置

- **数据采集**
  - 手动数据录入
  - 设备自动采集
  - 批量数据导入
  - 数据质量检查

- **数据分析**
  - 趋势图表展示
  - 同比环比分析
  - 预测模型应用
  - 报表自动生成

### 3. 预警系统

<div align="center">
  <img src="assets/early_warning.png" alt="预警系统" width="70%"/>
  <p><small>▲ 预警系统模块截图</small></p>
</div>

- **风险评估**
  - 多因素风险分析
  - 风险等级划分
  - 历史对比分析
  - 预测模型更新

- **预警规则**
  - 自定义预警条件
  - 阈值智能调整
  - 规则模板管理
  - 预警级别设置

- **预警通知**
  - 多渠道消息推送
  - 预警信息详情
  - 处理建议推送
  - 确认反馈机制

### 4. 防治管理

<div align="center">
  <img src="assets/treatment.png" alt="防治管理" width="70%"/>
  <p><small>▲ 防治管理模块截图</small></p>
</div>

- **防治方案**
  - 综合防治建议
  - 药剂使用指导
  - 生物防治方法
  - 农艺防治措施

- **用药管理**
  - 农药数据库
  - 用药安全提醒
  - 用药记录追踪
  - 残留预警功能

- **效果评估**
  - 防治前后对比
  - 效果评价体系
  - 成本效益分析
  - 改进建议生成

### 5. 知识库系统

<div align="center">
  <img src="assets/knowledge_base.png" alt="知识库系统" width="70%"/>
  <p><small>▲ 知识库系统模块截图</small></p>
</div>

- **病虫害百科**
  - 详细图文描述
  - 生活习性介绍
  - 危害特征说明
  - 适生环境分析

- **防治技术**
  - 最新防治工艺
  - 专家视频讲解
  - 技术资料下载
  - 案例分享学习

- **培训资源**
  - 在线学习课程
  - 知识测试评估
  - 实操指导视频
  - 专家咨询平台

## 📸 系统截图

### 登录界面
<div align="center">
  <img src="assets/login_screen.png" alt="登录界面" width="300"/>
  <p><small>▲ 系统登录界面</small></p>
</div>

### 主页仪表盘
<div align="center">
  <img src="assets/dashboard.png" alt="主页仪表盘" width="300"/>
  <p><small>▲ 主页仪表盘</small></p>
</div>

### 病虫害识别
<div align="center">
  <img src="assets/pest_recognition.png" alt="病虫害识别" width="300"/>
  <p><small>▲ 病虫害识别界面</small></p>
</div>

### 预警地图
<div align="center">
  <img src="assets/warning_map.png" alt="预警地图" width="300"/>
  <p><small>▲ 预警地图界面</small></p>
</div>

## 💻 开发指南

### 组件开发规范

<div align="center">
  <img src="assets/component_structure.png" alt="组件结构" width="80%"/>
  <p><small>▲ 组件设计结构图</small></p>
</div>

- **组件设计原则**
  - 单一职责原则
  - 组件复用性
  - 界面一致性
  - 性能优化

- **代码风格**
  - 使用 ESLint 进行代码检查
  - 遵循 TypeScript 严格模式
  - 使用 Prettier 进行代码格式化
  - 遵循 React Native 最佳实践

- **命名规范**
  - 组件使用 PascalCase
  - 函数使用 camelCase
  - 常量使用 UPPER_CASE
  - 文件使用 kebab-case

- **注释规范**
  - 组件顶部注释
  - 函数参数说明
  - 复杂逻辑说明
  - TODO 标记

### 提交规范

- **提交类型**
  - feat: 新功能
  - fix: 修复问题
  - docs: 文档修改
  - style: 代码格式修改
  - refactor: 代码重构
  - test: 测试用例修改
  - chore: 其他修改

- **提交格式**
  ```
  <类型>(<范围>): <主题>
  
  <正文>
  
  <页脚>
  ```

## 🤝 贡献指南

<div align="center">
  <img src="assets/contribution.png" alt="贡献流程" width="80%"/>
  <p><small>▲ 项目贡献流程图</small></p>
</div>

1. **Fork 项目**
   - 访问项目主页
   - 点击 Fork 按钮
   - 选择目标仓库

2. **创建特性分支**
   ```bash
   git checkout -b feature/新功能名称
   ```

3. **提交更改**
   ```bash
   git commit -m 'feat: 添加某个新功能'
   ```

4. **推送到分支**
   ```bash
   git push origin feature/新功能名称
   ```

5. **创建合并请求**
   - 访问原项目
   - 点击 Pull Request
   - 选择分支
   - 填写说明

## ❓ 常见问题

### 1. 安装依赖失败
**问题**: 安装依赖时出现网络错误
**解决方案**: 
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
# 或使用 yarn
yarn config set registry https://registry.npmmirror.com
```

### 2. 运行应用报错
**问题**: 启动应用时出现白屏
**解决方案**:
1. 清除缓存
```bash
npm start -- --clear
```
2. 重新安装依赖
```bash
rm -rf node_modules
npm install
```

### 3. 识别功能无法正常工作
**问题**: 图像识别功能无法正常使用
**解决方案**: 
1. 检查网络连接
2. 确保相机权限已授予
3. 更新应用到最新版本
4. 重新安装应用

<div align="center">
  <img src="assets/faq.png" alt="常见问题" width="70%"/>
  <p><small>▲ 常见问题解决流程</small></p>
</div>

## 📞 联系方式

- **项目维护者**: [维护者姓名]
- **电子邮箱**: [邮箱地址]
- **项目地址**: [项目地址]
- **问题反馈**: [Issues](https://github.com/yourusername/SIPMS/issues)
- **文档链接**: [Wiki](https://github.com/yourusername/SIPMS/wiki)

<div align="center">
  <img src="assets/contact.png" alt="联系我们" width="200"/>
  <p><small>▲ 扫码关注获取更多信息</small></p>
</div>

## 🙏 致谢

感谢所有为本项目做出贡献的开发者们！

## 📝 更新日志

### v1.0.0 (2024-03-23)
- 🎉 初始版本发布
- ✨ 实现基础功能模块
- 🐛 修复已知问题
- 📝 完善项目文档
