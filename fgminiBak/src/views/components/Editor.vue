<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="form.content"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {baseURL} from '@/config/config.js'
export default {
  name: "editor",
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          content: "aa",
        };
      },
    },
  },
  data() {
    return {
      editor: null,
      // html: "",
      toolbarConfig: {},
      editorConfig: { 
        placeholder: "请输入内容..." ,
         MENU_CONF: {
          uploadImage:{
            server:`${baseURL}/mini/uploadfile`,
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName:'fileName'
          }
         }
      },
      mode: "simple", // or 'simple'
    };
  },
  
  components: { Editor, Toolbar },
  // created(){
  //   console.log('------',this.form);
  // },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    onChange(editor) {
      // console.log("onChange", editor.children);
    },
  },
  mounted() {
    // console.log(this.editorConfig);
    // 模拟 ajax 请求，异步染渲编辑器
    // setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>