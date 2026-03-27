# Logo 图片改文字改动说明

更新时间：2026-03-27

## 目的

将首页和课堂侧边栏原先使用的 `/logo-horizontal.png` 图片 Logo，临时替换为文字版品牌标识“深思课堂”，方便在正式 UI 图未确定前先完成品牌露出。

本次改动的原则：
- 原有 `img` 标签不删除，只注释保留
- 文字 Logo 仅作为临时展示方案
- 后续拿到正式 UI 图或新 Logo 资源后，可快速恢复为图片版

## 当前改动位置

### 1. 首页 Logo

文件：`app/page.tsx`

原先：
- 使用 `/logo-horizontal.png` 作为主视觉 Logo

现在：
- 改为文字版“深思课堂”
- 保留原 `img` 标签为注释
- 样式为无边框、紫色系渐变、`深思` 与 `课堂` 分段配色

识别方式：
- 搜索 `src="/logo-horizontal.png"`
- 搜索 `深思`
- 搜索 `课堂`

### 2. 课堂侧边栏 Logo

文件：`components/stage/scene-sidebar.tsx`

原先：
- 使用 `/logo-horizontal.png` 作为侧边栏 Logo

现在：
- 改为紧凑版文字 Logo
- 保留原 `img` 标签为注释
- 样式与首页保持同一品牌语言，但尺寸更小

识别方式：
- 搜索 `src="/logo-horizontal.png"`
- 搜索 `aria-label={t('home.brandName')}`

## 当前设计方案

当前文字 Logo 设计特点：
- 无外框
- 无底板
- 紫色系渐变
- `深思`：偏深靛紫
- `课堂`：偏亮紫品牌色
- 首页版本更大
- 侧边栏版本更紧凑

## 后续如何快速恢复为最初图片版

如果后面你给出新的 UI 图，或者希望恢复成最初的图片 Logo，我可以直接按下面方式回退：

### 首页回退

文件：`app/page.tsx`

把当前文字 Logo 区块替换回注释中的图片标签，并恢复原有动效容器。

恢复目标：

```tsx
<motion.img
  src="/logo-horizontal.png"
  alt={t('home.brandName')}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    delay: 0.1,
    type: 'spring',
    stiffness: 200,
    damping: 20,
  }}
  className="h-12 md:h-16 mb-2 -ml-2 md:-ml-3"
/>
```

### 侧边栏回退

文件：`components/stage/scene-sidebar.tsx`

把当前文字 Logo 替换回：

```tsx
<img src="/logo-horizontal.png" alt={t('home.brandName')} className="h-6" />
```

## 建议的后续协作方式

后面如果你有新的 UI 图，可以直接把这两样给我：
- UI 截图或设计稿
- 这份说明文档

我就可以快速完成以下任一操作：
- 恢复成最初图片版 Logo
- 按新的 UI 图重做文字 Logo
- 切换成新的图片 Logo 资源
- 同步调整首页和侧边栏两处样式

## 涉及文件

- `app/page.tsx`
- `components/stage/scene-sidebar.tsx`
- `public/logo-horizontal.png`（当前资源仍保留，未删除）

## 备注

本次只是展示层改动，没有改动品牌名国际化来源。
当前页面上的品牌名仍然来自：
- `t('home.brandName')`

因此后续如果品牌文案变更，只需要同时检查：
- `lib/i18n/common.ts`
- `app/page.tsx`
- `components/stage/scene-sidebar.tsx`
