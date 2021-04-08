/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-01-26 16:06:27
 * @LastEditors: 付静
 * @LastEditTime: 2021-03-30 10:20:01
 * @FilePath: /packages/ok-accessory/ok-upload-drag/ok-file-list.ts
 */

import { styleMap } from 'lit-html/directives/style-map'
import { defineComponent, html, PropType } from 'ok-lit'

import CDN_PATH from '../../path.config'
import okUploadListCss from '../style/ok-file-list.less'
import type { ListType, UploadFile } from '../upload.type'
import { getFileType } from '../utils'
defineComponent(
  'ok-file-list',
  {
    fileList: {
      type: (Array as unknown) as PropType<UploadFile[]>,
      default: () => [] as UploadFile[],
    },
    listType: {
      type: (String as unknown) as PropType<ListType>,
      default: 'text',
    },
    disabled: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showProgress: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showPreview: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showDownload: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    showRemove: {
      type: (Boolean as unknown) as PropType<boolean>,
    },
    maxHeight: {
      type: (String as unknown) as PropType<string>,
    },
  },
  (props, context) => {
    /**
     * 点击删除文件
     * @param file 要删除的文件
     */
    const handleDelete = (file: UploadFile) => {
      context.emit('delete', file)
    }

    const handlePreview = (file: UploadFile) => {
      context.emit('preview', file)
    }

    const handleDownload = (file: UploadFile) => {
      context.emit('download', file)
    }

    // 终止上传
    const handleAbort = (file: UploadFile) => {
      context.emit('abort', file)
    }

    // 从上传列表移除
    const removeFileList = (file: UploadFile) => {
      context.emit('remove', file)
    }

    // 上传中： 展示上传进度百分比及终止上传按钮
    const renderUploading = (item: UploadFile) => {
      if (item.status === 'uploading') {
        let p = item.percentage || 0
        const percentage = `${parseInt(p.toFixed(), 10)}%`
        return html`
          <div class="uploading-info">
            <span class="percentage-text">${percentage}</span>
            <span class="abort-btn" @click=${() => handleAbort(item)}>
              <svg
                t="1616573273136"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="27041"
                width="12"
                height="12"
              >
                <path
                  d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
                  p-id="27042"
                  fill="#5283F7"
                ></path>
              </svg>
            </span>
          </div>
        `
      } else if (item.status === 'fail') {
        return html`
          <span class="abort-btn" @click=${() => removeFileList(item)}>
            <svg
              t="1616573273136"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="27041"
              width="12"
              height="12"
            >
              <path
                d="M512 451.669333L813.696 149.952l60.352 60.352L572.330667 512l301.717333 301.696-60.352 60.352L512 572.330667 210.304 874.048l-60.352-60.352L451.669333 512 149.952 210.304l60.352-60.352L512 451.669333z"
                p-id="27042"
                fill="#5283F7"
              ></path>
            </svg>
          </span>
        `
      }
    }

    /**
     * 根据上传状态判断是否展示进度条
     * @param item 当前文件
     */
    const renderProgress = (item: UploadFile) => {
      if (item.status === 'uploading' || item.status === 'fail') {
        return html`
          <ok-progress
            class="file-list-progress"
            .percentage=${item.percentage}
            .status=${item.status}
          ></ok-progress>
        `
      }
    }

    const renderPrveiew = (item: UploadFile) => {
      if (props.showPreview)
        return html`
          <i class="file-icon-operate" @click=${() => handlePreview(item)}>
            <svg
              t="1615028632085"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24342"
              width="16"
              height="16"
            >
              <path
                d="M511.381333 768c130.474667 0 251.306667-81.109333 363.285334-256.512C765.546667 336.725333 645.013333 256 511.381333 256 377.813333 256 257.706667 336.682667 149.333333 511.488 260.586667 686.912 380.949333 768 511.381333 768zM511.36 170.666667C687.189333 170.666667 836.736 284.458667 960 512.064 833.344 739.584 683.797333 853.333333 511.338667 853.333333S189.76 739.584 64 512.064C186.368 284.458667 335.488 170.666667 511.338667 170.666667zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z m0 85.333334a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
                fill="#5283F7"
                p-id="24343"
              ></path>
            </svg>
          </i>
        `
    }

    const renderDownload = (item: UploadFile) => {
      if (props.showDownload) {
        const response: any = item.response
        const download_url =
          response && response.data ? response.data[0].download_url : ''
        return html`
          <a
            @click=${() => handleDownload(item)}
            class="file-icon-operate"
            .href=${download_url}
            download
            class="el-upload-list__item-download"
          >
            <svg
              t="1615028599608"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="24216"
              width="16"
              height="16"
            >
              <path
                d="M917.312 682.688V896a42.688 42.688 0 0 1-42.624 42.688H149.312A42.688 42.688 0 0 1 106.688 896v-213.312H192v170.624h640v-170.624h85.312z m-362.624-83.84l203.84-203.84 60.352 60.288-301.696 301.76-301.696-301.76 60.352-60.288 193.472 193.472V85.312h85.376v513.536z"
                p-id="24217"
                fill="#5283F7"
              ></path>
            </svg>
          </a>
        `
      }
    }

    const renderRemove = (item: UploadFile) => {
      if (props.showRemove)
        return html` <i
          class="file-icon-operate"
          @click=${() => handleDelete(item)}
        >
          <svg
            t="1615028657246"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="24468"
            width="16"
            height="16"
          >
            <path
              d="M235.63571416 340.55v532.41428584h552.53571417V340.55h66.66428583v535.75714248a64.28571416 64.28571416 0 0 1-64.28571416 64.28571504H233.45a64.28571416 64.28571416 0 0 1-64.28571416-64.28571504V340.55H235.57142832z m225.9 85.75714248V769.14285752H394.87142832V426.30714248h66.66428584z m164.63571416 0V769.14285752H564.07142832V426.30714248h62.16428584zM640.57142832 83.40714248v85.75714336h257.14285752V238.78571416H126.28571416V169.16428584h257.14285752V83.40714248h257.14285665z"
              p-id="24469"
              fill="#5283F7"
            ></path>
          </svg>
        </i>`
    }

    /**
     * 根据上传状态判断是否展示删除按钮
     * @param item 当前文件
     */
    const renderOperations = (item: UploadFile) => {
      if (item.status === 'success') {
        return html`
          <div class="item-operation">
            ${renderPrveiew(item)} ${renderDownload(item)} ${renderRemove(item)}
          </div>
        `
      }
    }

    const renderListItem = (item: UploadFile) => {
      const suffix = getFileType(item.name)
      return html`
        <div class="item-detail">
          <ok-file-icon .type=${suffix}></ok-file-icon>

          <div class="ok-file-list__item_name">
            <div class="file_name_wraper">
              <span class="ok-file-list__item_file_name">${item.name}</span>
              ${renderUploading(item)} ${renderOperations(item)}
            </div>
            ${renderProgress(item)}
          </div>
        </div>
      `
    }

    return () => html`
      <style>
        ${okUploadListCss}
      </style>
      <link rel="stylesheet" .href="${CDN_PATH}common.css" />
      <ul
        class="ok-file-list ok-file-list--${props.listType} ${props.disabled
          ? 'is-disabled'
          : ''}"
        style=${styleMap({
          overflow: 'auto',
          'max-height': `${props.maxHeight && props.maxHeight}`,
        })}
      >
        ${props.fileList.map(
          item => html` <li class="ok-file-list__item">
            ${renderListItem(item)}
          </li>`
        )}
      </ul>
    `
  }
)