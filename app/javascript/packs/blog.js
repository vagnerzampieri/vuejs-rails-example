import Vue from 'vue/dist/vue.esm';
import BlogForm from './components/BlogForm.vue';

const el = document.getElementById('blog-form-vue');

new Vue({
  el,
  render: h => h(BlogForm)
})
