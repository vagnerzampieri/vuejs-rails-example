/*
 * Place all the behaviors and hooks related to the matching controller here.
 * All this logic will automatically be available in application.js.
 * You can use CoffeeScript in this file: http://coffeescript.org/
 */

document.addEventListener('DOMContentLoaded', function() {
  const el = document.getElementById('blog-form-vue');
  const blog = JSON.parse(el.dataset.blog);
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  return new Vue({
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

  });
});
