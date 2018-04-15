/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import Vue from 'vue/dist/vue.esm';

const el = document.getElementById('blog-form-vue');
const blog = JSON.parse(el.dataset.blog);
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const app = new Vue({
  el,
  data() {
    return {
      blog,
      csrfToken,
      titleError: 'Title has to be at least 5 characters',
      bodyError: 'Body has to be at least 10 characters'
    };
  },

  computed: {
    valid(){
      return (this.blog.title.length > 5) && (this.blog.body.length > 10);
    }
  },

  methods: {
    buildRequest(){
      const headers = new Headers();

      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('X-CSRF-TOKEN', this.csrfToken);
      headers.append('Content-Type', 'application/json');

      return new Request('/blogs', {
        headers,
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          "blog": {
            title: this.blog.title,
            body: this.blog.body
          }
        })
      });
    },

    submit(){
      return window.fetch(this.buildRequest())
      .then(function(data) {
        if (data.status === 201) {
          return window.location.href = '/blogs';
        }
      });
    }
  }

})
