<template>
  <div class="markdown-editor">
    <textarea></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import marked from 'marked'

export default {
  name: 'markdown-editor',
  props: {
    value: String,
    name: String,
    previewClass: String,
    autoinit: {
      type: Boolean,
      default () {
        return true
      }
    },
    highlight: {
      type: Boolean,
      default () {
        return false
      }
    },
    sanitize: {
      type: Boolean,
      default () {
        return false
      }
    },
    configs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    if (this.autoinit) this.initialize()
  },
  activated () {
    const editor = this.simplemde
    if (!editor) return
    const isActive = editor.isSideBySideActive() || editor.isPreviewActive()
    if (isActive) editor.toggleFullScreen()
  },
  methods: {
    initialize () {
      const configs = Object.assign({
        element: this.$el.firstElementChild,
        initialValue: this.value,
        autosave: {
          enabled: true,
          uniqueId: this.name
        },
        renderingConfig: {}
      }, this.configs)

      // 同步 value 和 initialValue 的值
      if (configs.initialValue) {
        this.$emit('input', configs.initialValue)
      }

      // 判断是否开启代码高亮
      if (this.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = true
      }

      // 设置是否渲染输入的html
      marked.setOptions({ sanitize: this.sanitize })

      // 实例化编辑器
      this.simplemde = new SimpleMDE(configs)

      // 添加自定义 previewClass
      const className = this.previewClass || ''
      this.addPreviewClass(className)

      // 绑定事件
      this.bindingEvents()
    },
    bindingEvents () {
      this.simplemde.codemirror.on('change', () => {
        this.$emit('input', this.simplemde.value())
      })
      this.simplemde.codemirror.on('paste', (editor, e) => { // 粘贴图片的触发函数
        if (!(e.clipboardData && e.clipboardData.items)) {
          // 弹窗说明，此浏览器不支持此操作
          return
        }
        try {
          let data = e.clipboardData.items[0]
          console.log(data)
          if (data.kind === 'file' && data.getAsFile().type.indexOf('image') !== -1) {
            this.uploadImage(this.simplemde.codemirror, data.getAsFile())
          }
        } catch (e) {
          this.$message({
            type: 'error',
            message: '粘贴图片格式错误'
          })
        }
      })
    },
    addPreviewClass (className) {
      const wrapper = this.simplemde.codemirror.getWrapperElement()
      const preview = document.createElement('div')
      wrapper.nextSibling.className += ` ${className}`
      preview.className = `editor-preview ${className}`
      wrapper.appendChild(preview)
    },
    getFileExtension (str) {
      return str.split('.').pop()
    },
    async uploadImage (simplemde, file) {
      let param = new FormData()
      param.append('file', file, file.name)
      return this.$axios.post('/articles/upload', param)
        .then(response => {
          // todo: error
          let url = `![](${response.data.url})`  // 拼接成markdown语法
          let content = simplemde.getValue()
          simplemde.setValue(content + '\n' + url)  // 和编辑框之前的内容进行拼接
        })
        .catch(e => {
          this.$message({
            type: 'warning',
            message: e.data.message
          })
        })
        // 服务端返回的格式是{state: Boolean, data: String}
        // state为false时，data就是返回的错误信息
        // state为true时，data是图片上传后url地址，这个地址是针对网站的绝对路径。如下：
        // /static/upload/2cfd6a50-3d30-11e8-b351-0d25ce9162a3.png
    }
  },
  destroyed () {
    this.simplemde = null
  },
  watch: {
    value (val) {
      if (val === this.simplemde.value()) return
      this.simplemde.value(val)
    }
  }
}
</script>

<style>
.markdown-editor .markdown-body {
  padding: 0.5em
}

.markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
  display: block;
}
</style>
