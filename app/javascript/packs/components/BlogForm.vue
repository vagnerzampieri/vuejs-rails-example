<template>
  <form @submit.prevent="submit">
    <label for="title">Title</label>
    <input v-model="blog.title" id="title">

    <div class="error" v-if="blog.title.length <= 5">
      The title needs to be at least 5 characters.
    </div>

    <label for="blog-body">Body</label>
    <input id="blog-body" v-model="blog.body">

    <div class="error" v-if="blog.body.length <= 10">
      The body needs to be at least 10 characters.
    </div>

    <input type="submit" value="Create blog" :disabled="!valid">
  </form>
</template>

<script>

const el = document.getElementById('blog-form-vue');
const blog = JSON.parse(el.dataset.blog);
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export default {
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
}
</script>
