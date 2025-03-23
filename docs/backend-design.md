# SIPMS智能综合害虫管理系统后端简化设计方案

## 一、简化技术栈

### 1. 核心框架
- **Node.js + Express.js**：轻量级框架，易于快速开发

### 2. 数据库
- **SQLite**：轻量级文件数据库，无需单独服务器
  - 免安装，直接集成到应用中
  - 单文件存储，方便备份和迁移
  - 适合演示和小规模应用

### 3. ORM工具
- **Sequelize/Prisma**：简化数据库操作

### 4. 认证
- **JWT**：简单的令牌认证
- **bcrypt**：密码哈希

### 5. 文件存储
- **本地文件系统**：直接存储在服务器目录，简化部署

## 二、简化系统架构

### 单体应用架构
- 所有功能集成在一个应用程序中
- 按功能模块组织代码
- 采用MVC模式：Model(模型)、View(API响应)、Controller(控制器)

## 三、简化数据模型设计

### 1. 用户表 (Users)
```sql
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 陷阱表 (Traps)
```sql
CREATE TABLE Traps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT,
  status TEXT CHECK(status IN ('active', 'inactive', 'maintenance')) DEFAULT 'active',
  install_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES Users(id),
  image_url TEXT,
  notes TEXT
);
```

### 3. 检查记录表 (Inspections)
```sql
CREATE TABLE Inspections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trap_id INTEGER REFERENCES Traps(id),
  inspection_type TEXT CHECK(inspection_type IN ('routine', 'incidental')) DEFAULT 'routine',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  inspector_id INTEGER REFERENCES Users(id),
  count INTEGER DEFAULT 0,
  species TEXT,
  images TEXT, -- 存储逗号分隔的图片路径
  notes TEXT,
  status TEXT DEFAULT 'completed',
  preview INTEGER DEFAULT 0, -- 布尔值，用于标记是否预览
  post INTEGER DEFAULT 0 -- 布尔值，用于标记是否已保存
);
```

### 4. 仓库表 (Repositories)
```sql
CREATE TABLE Repositories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES Users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_public INTEGER DEFAULT 1 -- 布尔值
);
```

### 5. 陷阱仓库关联表 (TrapRepositories)
```sql
CREATE TABLE TrapRepositories (
  trap_id INTEGER REFERENCES Traps(id),
  repository_id INTEGER REFERENCES Repositories(id),
  PRIMARY KEY (trap_id, repository_id)
);
```

### 6. 发现记录表 (Findings)
```sql
CREATE TABLE Findings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repository_id INTEGER REFERENCES Repositories(id),
  trap_id INTEGER REFERENCES Traps(id),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reported_by INTEGER REFERENCES Users(id),
  type TEXT CHECK(type IN ('RI', 'AM', 'IC')) DEFAULT 'RI',
  severity TEXT CHECK(severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  description TEXT,
  images TEXT, -- 存储逗号分隔的图片路径
  status TEXT DEFAULT 'new',
  resolution_notes TEXT
);
```

## 四、简化API端点设计

### 1. 认证API
```
POST /api/login          # 用户登录
POST /api/register       # 用户注册
GET  /api/me             # 获取当前用户信息
```

### 2. 陷阱API
```
GET    /api/traps                # 获取所有陷阱
POST   /api/traps                # 创建新陷阱
GET    /api/traps/:id            # 获取单个陷阱详情
PUT    /api/traps/:id            # 更新陷阱信息
DELETE /api/traps/:id            # 删除陷阱
GET    /api/trap-summary/:userId # 获取用户的陷阱摘要
```

### 3. 检查API
```
GET    /api/inspections              # 获取所有检查记录
POST   /api/inspections              # 创建新检查记录
GET    /api/inspections/:id          # 获取检查详情
PUT    /api/inspections/:id          # 更新检查信息
GET    /api/inspections/trap/:trapId # 获取特定陷阱的检查记录
```

### 4. 仓库API
```
GET    /api/repositories      # 获取所有仓库
POST   /api/newRepo           # 创建新仓库
GET    /api/repositories/:id  # 获取仓库详情
PUT    /api/repositories/:id  # 更新仓库信息
```

### 5. 发现API
```
GET    /api/findings                   # 获取所有发现记录
POST   /api/findings                   # 创建新发现记录
GET    /api/findings/:id               # 获取发现详情
PUT    /api/findings/:id               # 更新发现信息
GET    /api/findings/type/:type        # 按类型获取发现记录
```

## 五、文件上传简化处理

### 本地文件存储
```javascript
// 使用multer处理文件上传
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 文件上传路由
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ 
    success: true, 
    filePath: `/uploads/${req.file.filename}` 
  });
});
```

## 六、简化部署方案

### 单服务器部署
- Node.js应用 + SQLite数据库文件
- 静态文件(图片等)存储在本地目录
- 使用PM2或systemd管理Node.js进程

### 部署步骤
1. 服务器安装Node.js和npm
2. 上传项目代码
3. 运行`npm install`安装依赖
4. 配置环境变量
5. 运行`npm start`启动应用

## 七、示例代码结构

```
sipms-backend/
├── app.js                # 应用入口
├── config/               # 配置文件
├── controllers/          # 控制器
│   ├── authController.js
│   ├── trapController.js
│   ├── inspectionController.js
│   ├── repositoryController.js
│   └── findingController.js
├── models/               # 数据模型
│   ├── user.js
│   ├── trap.js
│   ├── inspection.js
│   ├── repository.js
│   └── finding.js
├── routes/               # 路由定义
│   ├── authRoutes.js
│   ├── trapRoutes.js
│   ├── inspectionRoutes.js
│   ├── repositoryRoutes.js
│   └── findingRoutes.js
├── middleware/           # 中间件
│   ├── auth.js
│   └── errorHandler.js
├── utils/                # 工具函数
├── uploads/              # 文件上传目录
├── database.sqlite       # SQLite数据库文件
├── package.json
└── README.md
```

## 八、示例实现代码

### 应用入口(app.js)
```javascript
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/authRoutes');
const trapRoutes = require('./routes/trapRoutes');
// 其他路由导入...

const app = express();
const PORT = process.env.PORT || 3000;

// 初始化数据库连接
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// 中间件
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 路由
app.use('/api', authRoutes);
app.use('/api', trapRoutes);
// 其他路由...

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
```

### 用户模型(models/user.js)
```javascript
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
```

### 认证控制器(controllers/authController.js)
```javascript
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    const user = await User.create({ email, password, name });
    
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'role']
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 九、演示填充数据脚本

```javascript
// scripts/seedData.js
const bcrypt = require('bcrypt');
const { User, Trap, Inspection, Repository, Finding } = require('../models');

async function seedDatabase() {
  try {
    // 创建示例用户
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: '123456',
      name: 'Admin User',
      role: 'admin'
    });
    
    const testUser = await User.create({
      email: 'test@example.com',
      password: '123456',
      name: 'Test User',
      role: 'user'
    });
    
    // 创建示例陷阱
    const trap1 = await Trap.create({
      name: 'Rodent Trap A1',
      type: 'Rodent',
      location: 'Building 1, Floor 1',
      status: 'active',
      created_by: adminUser.id,
      notes: 'Installed near kitchen area'
    });
    
    const trap2 = await Trap.create({
      name: 'Insect Trap B2',
      type: 'Insect',
      location: 'Building 2, Floor 2',
      status: 'active',
      created_by: testUser.id,
      notes: 'Monthly inspection required'
    });
    
    // 创建示例检查记录
    await Inspection.create({
      trap_id: trap1.id,
      inspection_type: 'routine',
      inspector_id: adminUser.id,
      count: 2,
      species: 'Mouse',
      notes: 'Found signs of activity',
      preview: 1,
      post: 0
    });
    
    await Inspection.create({
      trap_id: trap2.id,
      inspection_type: 'routine',
      inspector_id: testUser.id,
      count: 5,
      species: 'Ants',
      notes: 'High activity detected',
      preview: 1,
      post: 1
    });
    
    // 创建示例仓库
    const repo1 = await Repository.create({
      name: 'Main Building Repository',
      description: 'All traps in the main building',
      created_by: adminUser.id
    });
    
    // 关联陷阱到仓库
    await repo1.addTrap(trap1);
    await repo1.addTrap(trap2);
    
    // 创建示例发现记录
    await Finding.create({
      repository_id: repo1.id,
      trap_id: trap1.id,
      reported_by: adminUser.id,
      type: 'RI',
      severity: 'medium',
      description: 'Evidence of rodent activity near food storage'
    });
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
```

这个简化的技术方案完全满足演示目的，使用SQLite数据库可以避免复杂的数据库部署，同时保留了系统的核心功能。整个系统可以在单一服务器上运行，方便演示和测试。 