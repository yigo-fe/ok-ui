# 公共UI组件库ok-wc-ui## 组件库项目使用```npm install```### 项目调试方法 ？```npm run devsrc 是开发调试文件，打包不会打进去```### 发布部署 ？```记得上传CDN需要修改package.json version版本号npm run build             本地Build代码npm run postpublish         Build并上传CDN```### 如何使用https://fe-docs.baiteda.com/docs/byteluck-theme/index.html#/custom/doc## 重要的目录功能介绍```/packages/assets/               图片资源文件/packages/locales/              国际化文件/packages/accessory             附件和图片上传组件/packages/avatar                人员头像/packages/ok-department-select  部门选择组件/packages/ok-employee-select    人员选择组件/packages/person-card           浮层卡片组件(不会单独使用)/packages/ok-person-cell        人员头像组件，基本都在这个/packages/ok-person-group       人员头像多个展示/packages/ok-tooltip            超出显示tooltip组件```### 附件和图片上传公共逻辑要点：- ajax上传的方法  /ok-accessory/ajax.ts- 附件上传的主要逻辑   /attachment.common.hook.ts- 图片上传的主要逻辑   /image.common.hook.ts### ok-upload-drag 拖拽上传附件逻辑：- 组件向外暴露了两个方法(handleClick, handleRemoveAllFileList),获取到元素可以直接调用- 组件有默认的删除，预览和下载接口方法，可以传入属性方法自定义(审批组件使用的自定义)要点：- 入口文件  /ok-accessory/ok-upload-drag/ok-upload-drag.ce.vue- 已上传附件的展示  /ok-accessory/ok-upload-drag/ok-file-list.ce.vue### ok-upload-image 图片上传要点：- 入口文件 /ok-accessory/ok-upload-image/ok-upload-image.ce.vue### ok-upload-table 列表形式上传附件和图片要点：- 入口文件 /ok-accessory/ok-upload-table/ok-upload-table.ce.vue### ok-upload-subtable-file 明细表上传附件要点：- 入口文件 /ok-accessory/ok-upload-subtable/ok-upload-subtable-file.ce.vue### ok-upload-subtable-image 明细表上传图片要点：- 入口文件 /ok-accessory/ok-upload-subtable/ok-upload-subtable-image.ce.vue### ok-file-icon  附件类型icon要点：- 入口文件 /ok-accessory/ok-file-icon.ce.vue### ok-progress 上传进度条(现在只有内部使用，外部无使用)要点：- 入口文件 /ok-accessory/ok-progress.ce.vue### ok-avatar 头像数据逻辑：- 显示头像还是数字：未传入count属性展示数字，否则正常显示头像要点：- 入口文件 /ok-avatar### ok-department  部门组件要点：- 入口文件 /ok-department-select### ok-employee-select  人员选择要点：- 入口文件 /ok-employee-select### ok-person-cell 人员卡片要点：- 入口文件 /ok-person-cell### ok-person-group  多人员展示要点：- 入口文件 /ok-person-group/index.ce.vue### ok-tooltip tooltip组件支持插槽和title属性使用要点：- 入口文件 /ok-tooltip