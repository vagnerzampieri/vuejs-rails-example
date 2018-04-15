<script>

export default {
  el: '#blog-form-vue',
  data() {
    return {
      blog: {},
      titleError: 'Title has to be at least 5 characters',
      bodyError: 'Body has to be at least 10 characters'
    };
  }
}

</script>
