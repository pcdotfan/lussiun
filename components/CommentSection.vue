<template>
<section id="comments">
    <div class="comments">
        <div class="comments_wrapper">
        <div class="comments_block_title">发表评论</div>
        <div class="new_comment_form_container">
            <div id="new_comment_form">
                <div class="comment_trigger" v-show="!isTriggered">
                    <div class="avatar">
                        <img src="~assets/images/visitor.png">
                    </div>
                    <div class="trigger_title">撰写评论</div>
                </div>
                <div class="new_comment">
                    <textarea name="content" rows="2" class="textarea_box" v-model="comment.content"  @focus="triggerContent"></textarea>
                    <span class="comment_error"></span>
                </div>
                <div class="comment_triggered" v-show="isTriggered" :class="{ 'fade-in': isTriggered }">
                    <div class="input_body">
                        <ul class="ident">
                            <li>
                                <input type="text" v-model="comment.name" name="nickname" placeholder="昵称">
                            </li>
                            <li>
                                <input type="email" v-model="comment.email" name="email" placeholder="邮箱">
                            </li>
                            <li>
                                <input type="text" v-model="comment.website" name="site" placeholder="网站">
                            </li>
                        </ul>
                        <input @click="submitComment" value="提交评论" class="comment_submit_button c_button">
                    </div>
                </div>
            </div>
        </div>
        <ul class="comments">
        </ul>
        </div>
    </div>
</section>
</template>

<style scoped>
.fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>

<script>
export default {
  name: 'CommentSection',
  props: ['article', 'parent'],
  data () {
    return {
      comment: {
        articleId: this.article,
        parentId: this.parent || undefined,
        name: '',
        email: '',
        website: '',
        content: ''
      },
      isTriggered: false
    }
  },
  methods: {
    triggerContent () {
      this.isTriggered = true
    },
    async submitComment () {
      return this.$axios.post('/comments', this.comment).then(response => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style>

</style>
