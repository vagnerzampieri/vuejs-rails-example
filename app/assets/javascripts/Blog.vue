<script>
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